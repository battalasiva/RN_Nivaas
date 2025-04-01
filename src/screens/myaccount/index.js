import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Alert, Image} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {styles} from './style';
import {
  DpImage,
  ManageApartmentsModal,
  ManageflatsModal,
  PopupModal,
  TopBarCard2,
} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import ApplicationContext from '../../utils/context-api/Context';
import {allTexts, colors} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {CreateNumber, getNewAuthToken, handleshare, sendSupportEmail} from '../../common/customFunctions';
import {setCustomerOnboardRequestsData} from '../../redux/slices/currentCustomerSlice';
import {useLazyGetCustomerOnboardRequestsQuery} from '../../redux/services/cityServices';
import {logoutAction} from '../../redux/slices/authSlice';
import {useFocusEffect} from '@react-navigation/native';
import { setDefaultApartment } from '../../redux/slices/citiesdataSlice';
import { clearKeys } from '../../utils/preferences/localStorage';
import { AntDesign ,MaterialCommunityIcons} from '../../common/icons';

const MyAccount = ({navigation}) => {
  const dispatch = useDispatch();
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const [flatModalVisible, setFlatModalVisible] = useState(false);
  const [apartmentModalVisible, setApartmentModalVisible] = useState(false);
  const [customeronboardReq] = useLazyGetCustomerOnboardRequestsQuery();

  const [alertModel, setAlertmodal] = useState(false);

  const openModal = () => {
    setAlertmodal(true);
  };

  const closeModal = () => {
    setAlertmodal(false);
  };
  const handleLogout = async () => {
    closeModal();
    await clearKeys();
    setLoginDetails(null);
    dispatch(logoutAction());
    dispatch(setDefaultApartment(null));
    navigation.navigate(allTexts.screenNames.signin);
  };
  const handleCurrentCustomerData = () => {
    customeronboardReq()
      .unwrap()
      .then(response => {
        dispatch(setCustomerOnboardRequestsData(response));
      })
      .catch(error => {
        console.log('error in Customer Onboard Req Data===>', error);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
      });
  };
  useFocusEffect(
    useCallback(() => {
      handleCurrentCustomerData();
    }, []),
  );

  const custDetails = useSelector(state => state.currentCustomer);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
      <View style={{marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={'My Account'}
          navigation={navigation}
          profieEdit={true}
          onPress={()=>navigation.navigate(allTexts.screenNames.editProfile)}
        />
      </View>
      <View style={styles.profie}>
        <DpImage dispatch={dispatch} />
        <View style={{width: '80%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 20,
            }}>
            <Text style={styles.profieText}>
              {custDetails?.customerOnboardReqData?.user?.name || 'Nivaas User'}
            </Text>
          </View>
          {true && (
            <View
              style={{
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: colors.gray3,
                width: '50%',
              }}>
              {true && (
                <Text style={styles.nivaasID}>
                  Nivaas ID : {CreateNumber(custDetails?.customerOnboardReqData)}
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage flats</Text>
        <ManageflatsModal
          flatModalVisible={flatModalVisible}
          setFlatModalVisible={setFlatModalVisible}
          custDetails={custDetails?.customerOnboardReqData}
          navigation={navigation}
        />
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Manage Apartments</Text>
        <ManageApartmentsModal
          apartmentModalVisible={apartmentModalVisible}
          setApartmentModalVisible={setApartmentModalVisible}
          custDetails={custDetails?.customerOnboardReqData}
          navigation={navigation}
        />
      </View>
      {/* <View style={styles.manageFlatsCon}>
        <Text style={styles.manageFlatsConText}>Coins & Subscription</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.coins)
          }
          style={styles.manageFlatsConAdd}>
          <MaterialCommunityIcons name="hand-coin-outline" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>
            {'Coins'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.subscription)
          }
          style={styles.manageFlatsConAdd}>
          <MaterialCommunityIcons name="hand-coin-outline" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>
            {'Subscription'}
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.setting}>
        <Text style={styles.manageFlatsConText}>General settings</Text>
        <View style={styles.manageFlatsSubCon}>
          <TouchableOpacity
            onPress={sendSupportEmail}
            style={styles.settingsubConOne}>
            <AntDesign name="mail" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleshare}
            style={styles.settingsubConOne}>
            <AntDesign name="sharealt" size={25} color={colors.black} />
            <Text style={styles.generalSettingsOptionText}>
              Help your friend with Nivaas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <View style={styles.settingsubConOne}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={colors.black}
              />
              <Text style={styles.generalSettingsOptionText}>Logout</Text>
            </View>
            <PopupModal
              visible={alertModel}
              onClose={closeModal}
              title="Confirm Logout"
              buttons={[
                {text: 'Cancel', onPress: closeModal},
                {text: 'Ok', onPress: handleLogout},
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.nivaas}>
          <Image
            source={require('../../utils/assets/images/Nivaas-logo2.png')}
            style={styles.nivaasLogo}
          />
        </View>
        <View style={styles.VersionCon}>
          <Text style={styles.VersionText}>Version : 1.5.6</Text>
        </View>
        <TouchableOpacity
          onPress={()=>navigation.navigate(allTexts.screenNames.termsAndConditions)}
          style={styles.termsAndConditions}>
          <Text
            style={[
              styles.termsAndConditionsText,
              {textDecorationLine: 'underline'},
            ]}>
            Terms&Conditions
          </Text>
          {/* <Text style={styles.termsAndConditionsText}> | </Text>
        <Text style={[styles.termsAndConditionsText,{textDecorationLine:'underline'}]}>Privacy&policy</Text> */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyAccount;
