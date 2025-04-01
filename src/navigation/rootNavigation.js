import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
import {allTexts} from '../common';
import {
  SignUp,
  Signin,
  BottomTabBase,
  OTPScreen,
  NewApartmentOnBoard,
  MyAccount,
  PrepaidMeter,
  MaintainenceSettings,
  SocietyDues,
  AddPrepaidMeter,
  UserOnBoardingForm,
  FlatsOnboarding,
  Notification,
  Expences,
  AddNewExpances,
  CoAdmin,
  AddNotice,
  RequestSummary,
  SlidesPage,
  EditProfile,
  ManageFlats,
  AddYourHome,
  TermsAndConditions,
  AddConsumptionUnits,
  AddService,
  EachServicelist,
  SlotBookingService,
  RaiseRequest,
  FaqScreen,
  AnnouncementsScreen,
  ComplaintsList,
  Coins,
  Subscription,
  RedemptionDone,
  RentSale,
  ServiceProviders,
} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import ApplicationContext from '../utils/context-api/Context';
import {useAppSelector, useAppDispatch} from '../redux/reduxHooks';
import AdminSociety from '../screens/admin-society';
import {createNavigationContainerRef} from '@react-navigation/native';
import { getSeenStatus } from '../utils/preferences/localStorage';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const rootNavigation = () => {
  const {
    screenNames: {
      signin,
      otpScreen,
      signup,
      bottomTab,
      userOnBoardingForm,
      newApartmentOnBoard,
      myAccount,
      addYourHome,
      adminSociety,
      maintainenceSettings,
      prepaidMeter,
      addPrepaidMeter,
      societyDues,
      flatsOnboarding,
      notification,
      manageFlats,
      expences,
      addNewExpances,
      coAdmin,
      addNotice,
      requestSummary,
      slidesPage,
      editProfile,
      termsAndConditions,
      addConsumptionUnits,
      addService,
      eachServicelist,
      slotBookingService,
      raiseRequest,
      faqScreen,
      announcementsScreen,
      complaintsList,
      coins,
      subscription,
      redemptionDone,
      rentSale,
      serviceProviders,
    },
  } = allTexts;

  const dispatch = useAppDispatch();

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        {!seenValue ? (
          <Stack.Screen
            name={slidesPage}
            component={SlidesPage}
            options={{
              headerShown: false,
            }}
          />
        ) : null}
        <Stack.Screen
          name={signin}
          component={Signin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={signup}
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={otpScreen}
          component={OTPScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };
  const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName={bottomTab}>
        <Stack.Screen
          name={bottomTab}
          component={BottomTabBase}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={userOnBoardingForm}
          component={UserOnBoardingForm}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={newApartmentOnBoard}
          component={NewApartmentOnBoard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={myAccount}
          component={MyAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addYourHome}
          component={AddYourHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={adminSociety}
          component={AdminSociety}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={prepaidMeter}
          component={PrepaidMeter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={maintainenceSettings}
          component={MaintainenceSettings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={societyDues}
          component={SocietyDues}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addPrepaidMeter}
          component={AddPrepaidMeter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={flatsOnboarding}
          component={FlatsOnboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={notification}
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={manageFlats}
          component={ManageFlats}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={expences}
          component={Expences}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addNewExpances}
          component={AddNewExpances}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={coAdmin}
          component={CoAdmin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addNotice}
          component={AddNotice}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={requestSummary}
          component={RequestSummary}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={editProfile}
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={termsAndConditions}
          component={TermsAndConditions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addConsumptionUnits}
          component={AddConsumptionUnits}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={addService}
          component={AddService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={eachServicelist}
          component={EachServicelist}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={slotBookingService}
          component={SlotBookingService}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={raiseRequest}
          component={RaiseRequest}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={faqScreen}
          component={FaqScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={announcementsScreen}
          component={AnnouncementsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={complaintsList}
          component={ComplaintsList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={coins}
          component={Coins}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={subscription}
          component={Subscription}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={redemptionDone}
          component={RedemptionDone}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={rentSale}
          component={RentSale}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={serviceProviders}
          component={ServiceProviders}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    async function prepare() {
      console.log('splash');
      try {
        new Promise(resolve => setTimeout(resolve, 10));
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    }
    prepare();
  }, []);

  const Stack = createStackNavigator();
  const [loginDetails, setLoginDetails] = useState(null);
  const [defaultApartment, setdefaultApartment] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [seenValue, setSeenValue] = useState();  
  const authState = useAppSelector(state => state.auth);

  const getLoginDetails = () => {
    setLoginDetails(authState.token || null);
    handleseenstatus();
  };

  const handleseenstatus = async () => {
    try {
      const seenVal = await getSeenStatus(); 
      setSeenValue(seenVal); 
    } catch (error) {
      console.error('Error fetching seen status:', error);
      setSeenValue(false); 
    }
  };
  useEffect(() => {
    getLoginDetails();
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        loginDetails,
        setLoginDetails,
        userDetails,
        setUserDetails,
        setdefaultApartment,
        defaultApartment,
      }}>
      {loginDetails === null || loginDetails === '' ? (
        <AuthStack />
      ) : (
        <HomeStack />
      )}
    </ApplicationContext.Provider>
  );
};

export default rootNavigation;