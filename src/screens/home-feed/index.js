import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {allTexts, colors} from '../../common';
import {
  CompleteProfileModal,
  HomeComponent,
  HomeTopbar,
  Loader,
} from '../../components';
import {
  setCustomerOnboardRequestsData,
  setprofilePic,
} from '../../redux/slices/currentCustomerSlice';
import {styles} from './styles';
import {
  setApprovedApartments,
  setDefaultApartment,
} from '../../redux/slices/citiesdataSlice';
import {
  useLazyGetCurrentuserApartmentsQuery,
  useLazyGetCustomerOnboardRequestsQuery,
} from '../../redux/services/cityServices';
import {getNewAuthToken, NetworkInfo} from '../../common/customFunctions';
import messaging from '@react-native-firebase/messaging';
import {useUserDetailsMutation} from '../../redux/services/authService';
import {logoutAction} from '../../redux/slices/authSlice';
import ApplicationContext from '../../utils/context-api/Context';
import {
  clearKeys,
  getAuthTokenDetails,
  getSeenStatus,
} from '../../utils/preferences/localStorage';
//New
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {userDetails, setLoginDetails} = useContext(ApplicationContext);
  const {approvedApartments} = useSelector(state => state.cityData);    
  const customerDetails = useSelector(state => state.currentCustomer);  
  const [loder, setLoder] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentCustomerData, setCurrentCustomerData] = useState(null);
  const [currentApartment, setCurrentApartment] = useState(null);  
  const [fcmToken, setFcmToken] = useState(null);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const [customeronboardReq] = useLazyGetCustomerOnboardRequestsQuery();
  const [currentUserApartments] = useLazyGetCurrentuserApartmentsQuery();
  const [postUserDetails] = useUserDetailsMutation();  

  const handlelogout = async () => {
    await clearKeys();
    setLoginDetails(null);
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

  const handleCurrentCustomerData = () => {    
    setLoder(true);
    customeronboardReq()
      .unwrap()
      .then(response => {
        // console.log('CURRENT CUSTOMER RESPONCE',response);
        setLoder(false);
        setCurrentCustomerData(response);
        dispatch(setCustomerOnboardRequestsData(response));
        dispatch(setprofilePic(response?.user?.profilePicture));
        const approvedApartments = response?.apartments
          ?.filter(
            apartment =>
              apartment?.approved ||
              (!apartment?.admin &&
                apartment?.flats?.some(flat => flat?.approved)),
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
        handlecurrentApartment(approvedApartments);
        if (
          response?.apartments?.some(
            apartment => apartment?.admin && apartment?.approved,
          ) &&
          !response?.user?.roles?.includes('ROLE_APARTMENT_ADMIN')
        ) {
          // refreshAttempts++;
          handleTokenRefresh();
        }
      })
      .catch(error => {
        console.log('error in Customer Onboard Req Data===>', error);
        if (error?.data?.status === 401) {
          // refreshAttempts++;
          handleTokenRefresh();
        }
      });
  };
  const handlecurrentApartment = (approvedApartments) => {
    currentUserApartments()
      .unwrap()
      .then(response => {
        // console.log('response OF CURRENT USER APARTMENT',response);
        if (response?.currentApartment?.approved) {
          const firstApartmentInfo = response?.currentApartment;
          const result = firstApartmentInfo
            ? {
                id: firstApartmentInfo?.id,
                name: firstApartmentInfo?.name,
                admin: firstApartmentInfo?.admin,
                approved: firstApartmentInfo?.approved,
                subscriptionType:firstApartmentInfo?.subscriptionType,
                flats: firstApartmentInfo?.flats,
                startDate:firstApartmentInfo?.startDate,
                endDate:firstApartmentInfo?.endDate,
              }
            : {};
          setCurrentApartment(result || approvedApartments[0]);
          dispatch(setDefaultApartment(result || approvedApartments[0]));
        } else {
          setCurrentApartment(approvedApartments[0]);
          dispatch(setDefaultApartment(approvedApartments[0]));
        }
      })
      .catch(error => {
        console.log('ERROR IN CURRENT USER APARTMENT', error);
        setCurrentApartment(approvedApartments[0]);
        dispatch(setDefaultApartment(approvedApartments[0]));
      });
  };
  const handlefcmCall = () => {
    const payload = {
      id: currentCustomerData?.user?.id,
      fullName: currentCustomerData?.user?.name || 'User',
      email: currentCustomerData?.user?.email || null,
      fcmToken: fcmToken,
    };
    postUserDetails(payload)
      .unwrap()
      .then(response => {
        // console.log('postUserDetails response ======>', response);
      })
      .catch(error => {
        console.log('ERROR In POSTING USERDETAILS===>', error);
      });
  };
  const checkToken = async () => {
    await messaging()?.requestPermission();
    const token = await messaging()?.getToken();
    setFcmToken(token);
    // console.log('Device Token:', token);
  };
  checkToken();

  const handleRefresh = () => {
    setRefresh(false);
    handleCurrentCustomerData();
    handlecurrentApartment();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleCurrentCustomerData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // getAuthTokenDetails();
    // getRefreshToken();
    handlecurrentApartment(approvedApartments);
    const unsubscribe = NetworkInfo();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentCustomerData?.user?.newUser === false) {
      handlefcmCall();
    } else {
      setIsInitialRender(false);
    }
  }, [fcmToken, isInitialRender]);

  useEffect(() => {
    let timer = null;
    if (loder) {
      timer = setTimeout(() => {
        setRefresh(true);
        setLoder(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [loder]);
  return (
    <SafeAreaView style={styles.mainCon}>
      <HomeTopbar
        handlecurrentApartment={handlecurrentApartment}
        currentCustomerData={customerDetails?.customerOnboardReqData}
        navigation={navigation}
        dispatch={dispatch}
        currentApartment={currentApartment}
        approvedApartments={approvedApartments}
        setCurrentApartment={setCurrentApartment}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewCon}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primaryColor]}
          />
        }>
        {loder || refresh ? (
          <View>
            {loder && (
              <Loader
                color={colors.primaryColor}
                size={'large'}
                marginTop={'80%'}
              />
            )}
            {refresh && (
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={handleRefresh}>
                <FontAwesome
                  name="refresh"
                  size={20}
                  color={colors.primaryColor}
                />
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <HomeComponent
            currentCustomerData={customerDetails?.customerOnboardReqData}
            navigation={navigation}
            dispatch={dispatch}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
