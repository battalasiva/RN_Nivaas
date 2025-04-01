import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Image, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, allTexts} from './../../common/index';
import { Community, Home,  Services} from '..';
import {CompleteProfileModal, Loader, PrimaryButton} from '../../components';
import {styles} from './style';
import Apartments from '../Apartments';
import {requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomerOnboardRequestsData, setPremium, setprofilePic} from '../../redux/slices/currentCustomerSlice';
import { useLazyGetCustomerOnboardRequestsQuery } from '../../redux/services/cityServices';
import { clearKeys } from '../../utils/preferences/localStorage';
import { logoutAction } from '../../redux/slices/authSlice';
import { setApprovedApartments, setDefaultApartment } from '../../redux/slices/citiesdataSlice';
import { getNewAuthToken } from '../../common/customFunctions';
import messaging from '@react-native-firebase/messaging';
import { AntDesign ,FontAwesome,Entypo} from '../../common/icons';

const Tab = createBottomTabNavigator();

export default BottomTabBase = ({navigation}) => {
  const dispatch = useDispatch();
  const {premium} = useSelector(state => state.currentCustomer);
  const [loader, setLoader] = useState(false);
  const [premiumOption, setPremiumOption] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);
  
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [customeronboardReq] = useLazyGetCustomerOnboardRequestsQuery();
  
  const checkToken = async () => {
    try {
      await messaging()?.requestPermission();
      const token = await messaging()?.getToken();
      setFcmToken(token);
      // console.log('Device Token:', token);
    } catch (error) {
      console.log('ERROR IN FCM TOKEN', error);
    }
  };

  const handlelogout = async () => {
    await clearKeys();
    dispatch(logoutAction());
    dispatch(setDefaultApartment(null));
    navigation.navigate(allTexts.screenNames.signin);
  };

  let retryCount = 0;
  const MAX_RETRIES = 2;

  const handleTokenRefresh = async () => {
    try {
      const result = await getNewAuthToken(dispatch);
      if (result?.status === 500 || result?.error) {
        retryCount += 1;
        if (retryCount >= MAX_RETRIES) {
          handlelogout();
        } else {
          console.log('Retrying token refresh...');
          await handleTokenRefresh();
        }
      } else {
        console.log('Auth token changed successfully');
        retryCount = 0;
      }
    } catch (error) {
      console.error('An error occurred while refreshing the token:', error);
    }
  };

  const requestPermissions = () => {
    requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS]).then(statuses => {
      if (statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS] === RESULTS.GRANTED) {
        console.log('Notification permission granted.');
      }
    });
  };

  const handleRefresh = () => {
    setRefresh(false);
    handleCurrentCustomerData();
  };
  const handleSave = (name, email) => {
    console.log('Saving user data:', {name, email});
    setModalVisible(false);
    handleCurrentCustomerData();
  };

  const handleCurrentCustomerData = () => {        
    setLoader(true);
    customeronboardReq()
      .unwrap()
      .then(response => {
        // console.log('CURRENT_CUSOMER RESPONCE',response);
        setLoader(false);
        setCurrentCustomerData(response);
        dispatch(setCustomerOnboardRequestsData(response));
        dispatch(setprofilePic(response?.user?.profilePicture));
        setModalVisible(response?.user?.newUser === true); 
        const approvedApartments = response?.apartments
          ?.filter(apartment =>
            apartment?.approved ||
            (!apartment?.admin && apartment?.flats?.some(flat => flat?.approved))
          )
          ?.map(apartment => ({
            id: apartment?.id?.toString(),
            name: apartment?.name,
            admin: apartment?.admin,
            approved: apartment?.approved,
            subscriptionType:apartment?.subscriptionType,
            flats: apartment?.flats,
            startDate:apartment?.startDate,
            endDate:apartment?.endDate,
          }));          
        dispatch(setApprovedApartments(approvedApartments));          
        
        if (response?.apartments?.some(apartment => apartment?.admin && apartment?.approved) &&
          !response?.user?.roles?.includes('ROLE_APARTMENT_ADMIN')) {
          handleTokenRefresh();
        }
      })
      .catch(error => {
        console.log('ERROR IN CURRENT CUSTOMER',error);
        if (error?.data?.status === 401) {
          handleTokenRefresh();
        }
      });
  };

  const handlePremiumOption = () => {
    dispatch(setPremium(premiumOption));
  };

  useEffect(() => {
    handleCurrentCustomerData();
    requestPermissions();
    checkToken();
    // handlePremiumOption();
  }, []); 
  useEffect(() => {
    let timer = null;
    if (loader) {
      timer = setTimeout(() => {
        setRefresh(true);
        setLoader(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [loader]);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {loader || refresh ? (
          <View>
            {loader && (
              <Loader
                color={colors.primaryColor}
                size={'large'}
              />
            )}
            {refresh && (
            <View style={{alignItems:'center',justifyContent:'center',marginTop:'50%',marginHorizontal:'20%'}}>
              <Image
                source={require('../../utils/assets/images/nodata.png')}
                style={{height: 300, width: 300}}
              />
              {/* <PrimaryButton fontsize={18} loading={loader} text={' REFRESH '} bgColor={colors.primaryColor} onPress={handleRefresh}/> */}
              <Pressable onPress={handleRefresh} style={styles.refreshView}>
                <Text style={styles.refreshText}>{'REFRESH'}</Text>
              </Pressable>
            </View>
            )}
          </View>
      ) : (
        <Tab.Navigator
          backBehavior={'history'}
          screenOptions={{
            tabBarHideOnKeyboard: true,
            lazy: true,
            tabBarActiveTintColor: colors.primaryColor,
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 80,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              position: 'absolute',
              overflow: 'hidden',
              backgroundColor: colors.white,
              borderTopWidth: 0,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 5,
            },
          }}
          initialRouteName={allTexts.tabNames.home}>
          <Tab.Screen
            name={allTexts.tabNames.home}
            component={Home}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size, focused}) => (
                <View style={styles.iconTextCon}>
                  <AntDesign
                    name="home"
                    size={30}
                    style={focused ? styles.imageFocused : styles.imageNormal}
                  />
                  <Text
                    style={focused ? styles.textFocused : styles.textNormal}>
                    {allTexts.tabNames.home}
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name={allTexts.tabNames.apartments}
            component={Apartments}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size, focused}) => (
                <View style={styles.iconTextCon}>
                  <FontAwesome
                    name="building-o"
                    size={27}
                    style={focused ? styles.imageFocused : styles.imageNormal}
                  />
                  <Text
                    style={focused ? styles.textFocused : styles.textNormal}>
                    Apartments
                  </Text>
                </View>
              ),
            }}
          />
          {premium && (
            <Tab.Screen
              name={allTexts.tabNames.services}
              component={Services}
              options={{
                tabBarStyle: {
                  height: 80,
                },
                headerShown: false,
                tabBarIcon: ({color, size, focused}) => (
                  <View style={styles.iconTextCon}>
                    <Entypo
                      name="tools"
                      size={27}
                      style={focused ? styles.imageFocused : styles.imageNormal}
                    />
                    <Text
                      style={focused ? styles.textFocused : styles.textNormal}>
                      {allTexts.tabNames.services}
                    </Text>
                  </View>
                ),
              }}
            />
          )}
        </Tab.Navigator>
      )}
      <CompleteProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={handleSave}
        id={currentCustomerData?.user?.id}
        fcmToken={fcmToken}
        handleCurrentCustomerData={handleCurrentCustomerData}
      />
    </SafeAreaView>
  );
};
