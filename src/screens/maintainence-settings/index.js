import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, SafeAreaView} from 'react-native';
import {allTexts, colors} from '../../common';
import {
  CustomSelectDropdown,
  DefaultApartmentComp,
  FaqButton,
  Loader,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {useLazyGetAparmentPrepaidMetersQuery} from '../../redux/services/prepaidMeterService';
import {
  useLazyGetLastUpdatedMaintainenceDetailsQuery,
  useNotifyOnMutation,
} from '../../redux/services/maintainenceService';
import {
  addLeadingZero,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import {styles} from './style';

const MaintainenceSettings = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedApartment} = useSelector(state => state.cityData);
  const isReadOnly = (selectedApartment?.admin && selectedApartment?.approved) ? false : true;
  const [loader, setLoader] = useState(false);
  const [prepaidMetersData, setPrepaidMetersData] = useState([]);
  const [checkedMeters, setCheckedMeters] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});

  const [getApartmentPrepaidMetersList] =
    useLazyGetAparmentPrepaidMetersQuery();
  const [maintainenceSave] = useNotifyOnMutation();
  const [maintainenceLastUpdated] =
    useLazyGetLastUpdatedMaintainenceDetailsQuery();

  const handleCheckboxToggle = id => {
    const updatedData = prepaidMetersData?.map(item =>
      item.id === id ? {...item, checked: !item.checked} : item,
    );
    setPrepaidMetersData(updatedData);

    const updatedCheckedMeters = updatedData
      ?.filter(item => item.checked)
      ?.map(item => item.id);
    setCheckedMeters(updatedCheckedMeters);
  };

  const generateDates = (month, year) => {
    const date = new Date(year, month, 0).getDate();
    return Array.from({length: date}, (_, i) => ({
      name: (i + 1).toString().padStart(2, '0'),
    }));
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const dropDownData = generateDates(currentMonth, currentYear);

  const renderItem = ({item}) => (
    <View style={styles.checkboxContainer}>
      <CheckBox
        title={item?.name}
        checked={item?.checked}
        onPress={() => handleCheckboxToggle(item?.id)}
        checkedColor={colors.primaryColor}
        disabled={isReadOnly}
      />
    </View>
  );

  const handlePrepaidMetersList = async (apartmentId) => {
    const lastUpdatedPayload = {apartmentId};
    const lastUpdatedData = await maintainenceLastUpdated(lastUpdatedPayload).unwrap();
    setSelectedDate(lastUpdatedData?.notifyOn);
    setValue(lastUpdatedData?.cost?.toString());
    try {
      setLoader(true);
      const payload = {
        apartmentId,
        pageNo: 0,
        pageSize: 200,
      };

      const apartmentPrepaidMeters = await getApartmentPrepaidMetersList(
        payload,
      ).unwrap();
      const fetchedPrepaidMetersData = apartmentPrepaidMeters?.data?.map(
        meter => ({
          ...meter,
          checked: false,
        }),
      );
      const lastUpdatedPayload = {apartmentId};
      const lastUpdatedData = await maintainenceLastUpdated(
        lastUpdatedPayload,
      ).unwrap();
      // console.log(lastUpdatedData,'LAST UPDATED DATA');
      
      const combinedData = fetchedPrepaidMetersData.map(meter => {
        const isChecked = lastUpdatedData?.prepaidId?.includes(meter.id);
        return {
          ...meter,
          checked: isChecked || false,
        };
      });
      setPrepaidMetersData(combinedData);
      // Update checked meters if maintenance data exists
      const checkedMetersIds = combinedData
        .filter(item => item.checked)
        .map(item => item.id);
      setCheckedMeters(checkedMetersIds);

      if (lastUpdatedData) {
        const formattedDate = addLeadingZero(lastUpdatedData?.notifyOn);
        setSelectedDate(formattedDate);
        setValue(lastUpdatedData?.cost?.toString());
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log('Error in fetching data:', error);
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
    }
  };
  const validateFields = () => {
    let isValid = true;
    let errorsObj = {};
    if (!value || isNaN(value) || Number(value) <= 0) {
      errorsObj.value = 'Enter charge';
      isValid = false;
    }
    if (!selectedDate) {
      errorsObj.selectedDate = 'Select date';
      isValid = false;
    }
    setErrors(errorsObj);
    return isValid;
  };

  const handleSave = () => {
    if (!validateFields()) return;
    const maintainencePayload = {
      notifyOn: selectedDate,
      cost: value,
      apartmentId: selectedApartment?.id,
      prepaidId: checkedMeters,
    };
    setLoader(true);
    maintainenceSave(maintainencePayload)
      .unwrap()
      .then(response => {
        setLoader(false);
        SnackbarComponent({
          text: response?.message || 'Saved Successfully',
          backgroundColor: colors.green5,
        });
        navigation.navigate(allTexts.screenNames.adminSociety);
      })
      .catch(error => {
        setLoader(false);
        SnackbarComponent({
          text: error?.data?.errorMessage || 'ERROR IN MAINTAINENCE SAVE',
          backgroundColor: colors.red3,
        });
      });
  };

  useEffect(() => {
    if (selectedApartment?.id) {
      handlePrepaidMetersList(selectedApartment?.id);
    }
  }, [selectedApartment]);

  return (
    <SafeAreaView style={styles.mainCon}>
      <View style={styles.topBar}>
        <TopBarCard2 back={true} txt={'Maintenance'} navigation={navigation} />
      </View>
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={styles.flatlistCon}>
        <View style={styles.textDropDownCon}>
          <View style={{width: '45%'}}>
            <View style={styles.textInputCon}>
              <FontAwesome name="rupee" size={20} color={colors.primaryColor} />
              <TextInput
                style={styles.input}
                placeholder="Enter Charge"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            {errors.value && (
              <Text style={styles.errorText}>{errors.value}</Text>
            )}
          </View>
          <View style={{width: '45%'}}>
            <View style={styles.selectDropdown}>
              <CustomSelectDropdown
                data={dropDownData}
                onSelect={selectedItem => setSelectedDate(selectedItem?.name)}
                selectedItem={{name: selectedDate}}
                placeholder={selectedDate || 'NOTIFY ON'}
              />
            </View>
            {errors.selectedDate && (
              <Text style={styles.errorText}>{errors.selectedDate}</Text>
            )}
          </View>
        </View>
        {loader ? (
          <Loader
            color={colors.primaryColor}
            size={'large'}
            marginTop={'40%'}
          />
        ) : (
          <FlatList
            data={prepaidMetersData}
            renderItem={renderItem}
            keyExtractor={item => item?.id?.toString()}
            contentContainerStyle={styles.container}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>
                {'No Prepaid Meters Configured'}
              </Text>
            )}
          />
        )}
        {!loader && (
          <View style={styles.buttonCon}>
            <PrimaryButton
              text={'SAVE'}
              bgColor={isReadOnly ? colors.gray : colors.primaryColor}
              onPress={isReadOnly ? ()=>SnackbarComponent({
                text: 'Accessed Only for Apartment Admins',
                backgroundColor: colors.yellowColor,
              }) : handleSave}
              loading={loader}
            />
          </View>
        )}
      </View>
      {/* <FaqButton faq={allTexts.faqs.maintainenceFaqs} navigation={navigation} /> */}
    </SafeAreaView>
  );
};
export default MaintainenceSettings;
