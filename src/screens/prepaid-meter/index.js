import {Text, TouchableOpacity, View, FlatList, Platform} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DefaultApartmentComp, FaqButton, Loader, PrimaryButton} from '../../components';
import {allTexts, colors} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {
  useLazyGetAparmentPrepaidMetersQuery,
  useUpdatePrepaidMeterMutation,
} from '../../redux/services/prepaidMeterService';
import {useFocusEffect} from '@react-navigation/native';
import {
  DefaultTopBarOne,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import {styles} from './style';
import EditMeterModal from '../../components/EditMeterModal';
import MeterDetailsModal from '../../components/MeterDetailsModal';
import Feather from 'react-native-vector-icons/Feather';
import { MaterialIcons } from '../../common/icons';

const PrepaidMeter = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedApartment} = useSelector(state => state.cityData);
  const [loader, setLoader] = useState(false);
  const [prepaidMetersData, setprepaidMetersData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [editedMeter, setEditedMeter] = useState(null);
  const [device, setDevice] = useState();
  const isReadOnly = selectedApartment?.admin && selectedApartment?.approved ? false : true;
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();
  const [updatePrepaidMeterDetails] = useUpdatePrepaidMeterMutation();

  const handleprepaidmetersList = () => {
    setLoader(true);
    if (selectedApartment?.id) {
      const payload = {
        apartmentId: selectedApartment?.id,
        pageNo: 0,
        pageSize: 200,
      };
      // console.log(payload);
      getApartmentPrepaidMetersList(payload)
        .unwrap()
        .then(response => {
          setLoader(false);
          setprepaidMetersData(response?.data);
        })
        .catch(error => {
          console.log('error in Apartment PrepaidMetersList=====>', error);
          setLoader(false);
          if (error?.data?.status === 401) {
            getNewAuthToken(dispatch);
          } else if (error?.data?.errorCode === 1021) {
            SnackbarComponent({
              text:
                error?.data?.errorMessage ||
                'error in Apartment PrepaidMetersList',
              backgroundColor: colors.yellowColor,
            });
          } else {
            SnackbarComponent({
              text: 'error in Apartment PrepaidMetersList',
              backgroundColor: colors.red3,
            });
          }
        });
    }
  };
  const handleUpdatePrepaidMetersDetails = () => {
    const payload = {
      id: editedMeter?.id,
      apartmentId: selectedApartment?.id,
      description: editedMeter?.description,
      costPerUnit: editedMeter?.costPerUnit,
      name: editedMeter?.name,
    };
    // console.log(payload);
    updatePrepaidMeterDetails(payload)
      .unwrap()
      .then(response => {
        console.log('update prepaid meter response =====>', response);
        handleprepaidmetersList();
        setEditModalVisible(false);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('error in updating prepaid meter details:', error);
        if (error?.data?.errorCode === 1021) {
          SnackbarComponent({
            text:
              error?.data?.errorMessage ||
              'Error in updating prepaid meter details',
            backgroundColor: colors.red3,
          });
        } else if (error?.data?.errorCode === 1023) {
          SnackbarComponent({
            text:
              error?.data?.errorMessage ||
              'Error in updating prepaid meter details',
            backgroundColor: colors.red3,
          });
        } else if (error?.data?.errorCode === 1019) {
          SnackbarComponent({
            text:
              error?.data?.errorMessage ||
              'Error in updating prepaid meter details',
            backgroundColor: colors.red3,
          });
        } else if (error?.data?.errorCode === 1017) {
          SnackbarComponent({
            text:
              error?.data?.errorMessage ||
              'Error in updating prepaid meter details',
            backgroundColor: colors.red3,
          });
        } else {
          SnackbarComponent({
            text: 'Error in updating prepaid meter details',
            backgroundColor: colors.red3,
          });
        }
      });
  };

  const handleMeterPress = item => {    
    if (device === 'ios') {
      handleEditPress(item);
      setSelectedMeter(item);
      setEditModalVisible(true);
    } else {
      setSelectedMeter(item);
      setModalVisible(true);
    }
  };
  const handleEditPress = item => {
    setEditedMeter(item);
    setEditModalVisible(true);
  };
  const handleAddPress = item => {
    setSelectedMeter(item);
    navigation.navigate(allTexts.screenNames.addConsumptionUnits, {
      data: {item},
    });
  };

  const handleDevice = () => {
    if (Platform.OS === 'ios') {
      setDevice('ios');
    } else {
      setDevice('android');
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (selectedApartment?.id) {
        handleprepaidmetersList();
      }
    }, [selectedApartment]),
  );
  useEffect(() => {
    handleDevice();
  }, []);

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Prepaid Meters')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={styles.dropDownView}></View>
      {prepaidMetersData && <Text style={styles.headerText}>Meter Name</Text>}
      <View style={styles.container}>
        {loader ? (
          <View>
            <Loader
              color={colors.primaryColor}
              size={'large'}
              marginTop={'40%'}
            />
          </View>
        ) : (
          <FlatList
            data={prepaidMetersData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View>
                    <Text style={[styles.itemText]}>{item.name}</Text>
                  </View>
                </View>
                <View style={{marginVertical: 10}}>
                  <MaterialIcons  name={device === 'ios' ? 'edit-square' : 'arrow-forward-ios'} size={20} color={colors.primaryColor} onPress={() => handleMeterPress(item)}/>
                </View>
              </View>
            )}
          />
        )}
      </View>
      {loader ? (
        ''
      ) : prepaidMetersData?.length === 5 ? (
        ''
      ) : (
        <View style={styles.buttonCon}>
          <PrimaryButton
            text={'Add Prepaid Meter'}
            bgColor={isReadOnly ? colors.gray : colors.primaryColor}
            onPress={
              isReadOnly
                ? ()=>SnackbarComponent({
                  text: 'Accessed Only for Apartment Admins',
                  backgroundColor: colors.yellowColor,
                }) : ()=>navigation.navigate(allTexts.screenNames.addPrepaidMeter, {selectedApartmentId: selectedApartment?.id})
            }
          />
        </View>
      )}
      {/* <FaqButton faq={allTexts.faqs.prepaidMeterFaqs} navigation={navigation} /> */}
      {selectedMeter && device === 'android' && (
        <MeterDetailsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleEditPress={handleEditPress}
          selectedMeter={selectedMeter}
        />
      )}
      {editedMeter && (
        <EditMeterModal
          editModalVisible={editModalVisible}
          setEditModalVisible={setEditModalVisible}
          editedMeter={editedMeter}
          setEditedMeter={setEditedMeter}
          handleUpdatePrepaidMetersDetails={handleUpdatePrepaidMetersDetails}
          isReadOnly={isReadOnly}
        />
      )}
    </View>
  );
};

export default PrepaidMeter;
