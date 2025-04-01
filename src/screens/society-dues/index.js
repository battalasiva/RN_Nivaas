import React, {useState, useEffect} from 'react';
import {FlatList, Text, View,Image} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {allTexts, colors} from '../../common';
import {
  CustomDropdown,
  PrimaryButton,
  Loader,
  DefaultApartmentComp,
  CustomSelectDropdown,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {styles} from './style';
import {
  useLazyGetAdminSocietyDuesQuery,
  useLazyGetUserSocietyDuesQuery,
  useUpdateStatusMutation,
} from '../../redux/services/maintainenceService';
import {
  DefaultTopBarOne,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import { MaterialCommunityIcons,Ionicons,FontAwesome, MaterialIcons} from '../../common/icons';
const SocietyDues = ({navigation}) => {
  const customerDetails = useSelector(state => state.currentCustomer);    
  const {selectedApartment} = useSelector(state => state.cityData); 
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [flatData, SetFlatData] = useState([]);    
  const [selectedFlat, setSelectedFlat] = useState({id: '', flatNo: ''});
  const [adminData, setAdminData] = useState();
  const [selectAll, setSelectAll] = useState(false);
  const [societyDuesData, setSocietyDuesData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);  
  const [selectedMonth, setSelectedMonth] = useState({name: '', index: null});  

  const userduedata = societyDuesData?.maintenanceDetails
    ? JSON.parse(societyDuesData?.maintenanceDetails)
    : null;
  const [getUserSocietyDues] = useLazyGetUserSocietyDuesQuery();
  const [getAdminSocietyDues] = useLazyGetAdminSocietyDuesQuery();
  const [updatePaidStatus] = useUpdateStatusMutation();

  const currentYear = new Date()?.getFullYear();
  const currentMonthIndex = new Date()?.getMonth();
  const years = [];
  for (let year = 2024; year <= currentYear; year++) {
    years.push({name: year});
  }
  const months = allTexts.months;

  const handleUserSocietydues = id => {
    setLoader(true);
    const payload = {
      apartmentId: selectedApartment?.id,
      flatId: id,
      year: selectedYear,
      month: selectedMonth?.index,
    };
    // console.log(payload, 'payload');
    getUserSocietyDues(payload)
      .unwrap()
      .then(response => {
        setLoader(false);
        console.log('USER SOCIETY DUES=====>', response);
        (response?.length > 1) ? setSocietyDuesData(response[response?.length - 1]) : setSocietyDuesData(response[0]);
      })
      .catch(error => {
        console.log('ERROR IN USER SOCITY DUES', error);
        setLoader(false);
        SnackbarComponent({
          text: 'Failed to load data. Please try again later.',
          backgroundColor: colors.red3,
        });
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
      });
  };

  const handleAdminSocietyDues = (id) => {
    setLoader(true);
    const payload = {
      apartmentId: id,
      year: selectedYear,
      month: selectedMonth?.index,
      pageNo: 0,
      pageSize: 200,
    };
    console.log(payload,'payload');
    getAdminSocietyDues(payload)
      .unwrap()
      .then(response => {
        setLoader(false);
        // console.log('ADMIN SOCIETY DUES=====>', response);
        setAdminData(response);
      })
      .catch(error => {
        console.log('ERROR IN ADMIN SOCITY DUES', error);
        setLoader(false);
        if (error?.data?.status === 401 ) {
          getNewAuthToken(dispatch);
        }
      });
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setAdminData(prevState =>
      prevState?.map(flat => ({...flat, checked: newSelectAll})),
    );
  };

  const handleUpdate = () => {
    const selectedFlats = adminData?.filter(flat => flat?.checked);
    const societyDueIds = selectedFlats?.map(item => item?.id);
    const societyDueIdsObject = `${societyDueIds?.join(',')}`;
    // console.log(payload);
    if (societyDueIdsObject) {
      setLoader(true);
      const payload = {
        apartmentId: selectedApartment?.id,
        status: 'PAID',
        societyDueIds: societyDueIdsObject,
      };
      updatePaidStatus(payload)
        .unwrap()
        .then(response => {
          console.log('UPDATE STATUS response', response);
          setLoader(false);
          setSelectAll(false)
          SnackbarComponent({
            text: 'Dues Status Updated Successfully',
            backgroundColor: colors.green5,
          });
          handleAdminSocietyDues(selectedApartment?.id);
        })
        .catch(error => {
          console.log('ERROR IN UPDATE STATUS', error);
          setLoader(false);
          SnackbarComponent({
            text: 'Error In Dues Updation',
            backgroundColor: colors.red3,
          });
        });
    }
  };

  const handleCheckboxChange = flatId => {
    setAdminData(prevState =>
      prevState.map(flat =>
        flat?.flatId === flatId ? {...flat, checked: !flat?.checked} : flat,
      ),
    );
  };
  const handleFlatsdata = () =>{
    const defApartment = customerDetails?.customerOnboardReqData?.apartments?.find(
      apartment => apartment?.id?.toString() === selectedApartment?.id?.toString()
    );    
    if (defApartment && defApartment?.flats) {
      const uniqueFlats = defApartment?.flats?.reduce((acc, flat) => {
        if (flat.approved && !acc.some(item => item.flatNo === flat.flatNo)) {
          acc.push(flat); 
        }
        return acc;
      }, []);
      SetFlatData(uniqueFlats); 
    }
  }

  useEffect(() => {
    setSelectedYear(currentYear);
    setSelectedMonth(months[currentMonthIndex]);
  }, []);
  useEffect(() => {
    handleFlatsdata();
  }, [customerDetails, selectedApartment]);
  useEffect(() => {
    if (selectedFlat?.id && selectedMonth && selectedYear) {
      handleUserSocietydues(selectedFlat?.id);
    }
    if (
      selectedApartment?.admin && selectedApartment?.approved &&
      selectedApartment?.id && selectedMonth && selectedYear
    ) {
      handleAdminSocietyDues(selectedApartment?.id);
    }
  }, [selectedFlat, selectedApartment,selectedMonth,selectedYear]);
  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Society Dues', true)}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={styles.datePickerContainer}>
        <CustomSelectDropdown
          data={years}
          onSelect={selectedItem => setSelectedYear(selectedItem?.name)}
          selectedItem={{name: selectedYear}}
          placeholder="SELECT YEAR"
        />
        <CustomSelectDropdown
          data={months}
          onSelect={selectedItem => setSelectedMonth(selectedItem)}
          selectedItem={selectedMonth}
          placeholder="SELECT MONTH"
        />
      </View>
      {(selectedApartment?.admin && selectedApartment?.approved) ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dropdownContainer}></View>
          {loader ? (
            <View>
              <Loader
                color={colors.primaryColor}
                marginTop={'50%'}
                size={'large'}
              />
            </View>
          ) : (
            <View style={styles.container}>
              {adminData &&
                !adminData?.every(item => item?.status === 'PAID') && (
                  <View style={styles.selectAllContainer}>
                    <Text style={styles.selectAllText}>Select All</Text>
                    <CheckBox
                      checked={selectAll}
                      onPress={handleSelectAll}
                      checkedColor={colors.primaryColor}
                      containerStyle={styles.checkboxContainer}
                    />
                  </View>
                )}
              <FlatList
                data={adminData}
                keyExtractor={item => item?.id?.toString()}
                ListHeaderComponent={() => (
                  <View style={styles.header}>
                    <View style={styles.headercon}>
                      <Text style={styles.headerCell}>Flat No</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.headercon}>
                      <Text style={styles.headerCell}>Amount</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.headercon}>
                      <Text style={styles.headerCell}>Status</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.headercon}>
                      <Text style={styles.selectStyle}>Select</Text>
                    </View>
                  </View>
                )}
                renderItem={({item}) => (
                  <View style={styles.row}>
                    <View style={[styles.headercon, {alignItems: 'center'}]}>
                      <Text numberOfLines={1} style={styles?.cell}>
                        {item?.flatNo}
                      </Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={[styles.headercon, {alignItems: 'center'}]}>
                      <Text style={styles.cell}>{item?.cost}</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={[styles.headercon, {alignItems: 'center'}]}>
                      <Text style={styles.cell}>{item?.status}</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={[styles.headercon, {alignItems: 'center'}]}>
                      {item?.status === 'PAID' ? (
                        <Ionicons
                          name="checkmark-done-circle-sharp"
                          size={25}
                          color={colors.primaryColor}
                        />
                      ) : (
                        <CheckBox
                          checked={item.checked}
                          onPress={() => handleCheckboxChange(item?.flatId)}
                          checkedColor={colors.primaryColor}
                          containerStyle={styles.checkboxContainer}
                        />
                      )}
                    </View>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../utils/assets/images/dataNotFoundImage.png')}
                      style={{height: 300, width: 300}}
                    />
                  </View>
                )}
              />
              {adminData &&
                !adminData?.every(item => item?.status === 'PAID') && (
                  <View style={styles.button}>
                    <PrimaryButton
                      text={'Mark As Paid'}
                      bgColor={colors.primaryColor}
                      onPress={handleUpdate}
                      loading={loader}
                    />
                  </View>
                )}
            </View>
          )}
        </ScrollView>
      ) : (
        <ScrollView style={{marginBottom:'20%'}} showsVerticalScrollIndicator={false}>
          <View style={styles.dropdownContainer}>
              <View style={{width: '100%'}}>
                <CustomDropdown
                  label="Flat"
                  data={flatData}
                  value={selectedFlat?.id}
                  onChange={(id, flatNo) => setSelectedFlat({id, flatNo})}
                  labelField="flatNo"
                  valueField="id"
                />
            </View>
          </View>
          {loader ? (
            <View>
              <Loader
                color={colors.primaryColor}
                marginTop={'50%'}
                size={'large'}
              />
            </View>
          ) : (
            <View style={styles.userSocietyDuecontainer}>
              <Text style={styles.boldText}>Monthly Maintainence : {societyDuesData?.fixedCost || 0}</Text>
              <FlatList
                data={userduedata}
                keyExtractor={item => item?.id}
                renderItem={({item}) => (
                  <View style={styles.EachDueCon}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={styles.meterName}>{item?.name}</Text>
                      <MaterialCommunityIcons name='speedometer' size={25} color={colors.primaryColor}/>
                    </View>
                    <Text style={styles.eachDueText}>Units Consumed : {item?.unitsConsumed}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={styles.eachDueText}>Cost Per Unit : {item?.costPerUnit}</Text>
                    <Text style={styles.eachDueText}><MaterialCommunityIcons name='currency-rupee' size={25} color={colors.black}/> : {item?.unitsConsumed * item?.costPerUnit}</Text>
                    </View>
                  </View>
                )}
                ListEmptyComponent={() => (
                  societyDuesData?.fixedCost !== 0 ? null : 
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../utils/assets/images/dataNotFoundImage.png')}
                      style={{height: 300, width: 300}}
                    />
                  </View>
                )}
              />
              {userduedata && (
                <View
                  style={styles.userDueDataCon}>
                  <View style={styles.statusCon}>
                    <Text style={styles.statusText}>Status : </Text>
                    <Text
                      style={
                        societyDuesData?.status === 'UNPAID'
                          ? styles.unpaidText
                          : styles.paidText
                      }>
                      {societyDuesData?.status}
                    </Text>
                  </View>
                  <View style={styles.statusCon}>
                    <Text style={styles.statusText}>Total (<FontAwesome name='rupee' size={15} color={colors.black}/>) : </Text>
                    <Text style={styles.statusText}>
                      {societyDuesData?.cost}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}
      {
        (userduedata && !(selectedApartment?.admin && selectedApartment?.approved)) && (
          <View style={styles.authurizationCon}>
            <Image source={require('../../utils/assets/images/stamp.png')} style={{height:80,width:100}}/>
            <View>
            <Text style={[styles.boldText,{color:colors.black,textAlign:'center'}]}>Authorized By</Text>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.semiBoldText}>{selectedApartment?.name}</Text>
            <MaterialIcons name='verified-user' size={20} color={colors.black}/>
            </View>
            <Text style={styles.semiBoldText}>{societyDuesData?.dueDate}</Text>
            </View>
          </View>
        )
      }
    </View>
  );
};

export default SocietyDues;
