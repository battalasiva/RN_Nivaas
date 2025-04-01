import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
import { Linking, Share, View} from 'react-native';
import {colors} from './theme';
import { getAuthTokenDetails, getRefreshToken, removeLoginSessionDetails, saveLoginSessionDetails, saveRefreshTokenDetails } from '../utils/preferences/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopBarCard2 } from '../components';
import { statusBarHeight } from '../utils/config/config';
import { BASE_URL_USER } from '../api/api';
import { endpoints } from '../api';
import { loginAction, logoutAction } from '../redux/slices/authSlice';
import { setDefaultApartment } from '../redux/slices/citiesdataSlice';
import { allTexts } from './all-texts';

export const SnackbarComponent = ({text, backgroundColor, height}) => {
  return Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: backgroundColor,
    height: height,
  });
};

export const addLeadingZero=(value) =>{
  return value < 10 ? `0${value}` : value;
}

export const DefaultTopBarOne = (navigation,height,title,back) => {
  return(
    <View style={{height:height || 70, marginTop: statusBarHeight || 0 ,backgroundColor:colors.secondaryColor}}>
        <TopBarCard2 back={true} txt={title} navigation={navigation} />
    </View>
  )
}
export const removeSpaces=(phoneNumber)=> {
  return phoneNumber.replace(/\s+/g, '');
}

export const getNewAuthToken = async(dispatch) =>{
  try {
    const refreshToken = await getRefreshToken();
    const accessToken = await getAuthTokenDetails();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", accessToken);

    const raw = JSON.stringify({
      "refreshToken": refreshToken
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const response = await fetch(`${BASE_URL_USER}${endpoints.REFRESH_TOKEN}`, requestOptions);
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
      if (response?.status === 500) {
        return { status: 500, error: "error" };
      }
    }
    const result = await response.json();
    dispatch(loginAction({token:result?.token,tokenType: result?.type}));
    saveLoginSessionDetails(result?.type, result?.token);
    saveRefreshTokenDetails('RefreshToken', result?.refreshToken);
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}
export const ApprovedApartments = ({
  customerDetails,
  setApartmentData,
  setSelectedApartment,
}) => {
  if (customerDetails?.apartmentDTOs) {
    const approvedApartments = customerDetails?.apartmentDTOs
      .filter(apartment => apartment?.adminApproved)
      .map(apartment => ({
        id: apartment?.apartmentDTO?.id,
        name: apartment?.apartmentDTO?.name,
      }));
    setApartmentData(approvedApartments);
    // if (approvedApartments.length === 1) {
    setSelectedApartment(approvedApartments[0]);
    // }
  }
};

export const getSelectedApartment = async ({setSelectedApartment}) => {
  try {
    const savedApartment = await AsyncStorage?.getItem('selectedApartment');
    if (savedApartment !== null) {
      setSelectedApartment(JSON.parse(savedApartment));
    }
  } catch (error) {
    console.error('Failed to load selected apartment:', error);
  }
};

export const NetworkInfo = () => {
  let isConnected = true;

  const handleConnectivityChange = (state) => {
    if (state.isConnected !== isConnected) {
      isConnected = state.isConnected;
      
      if (isConnected) {
        SnackbarComponent({ text: 'Back to Online', backgroundColor: colors.green5 });
      } else {
        SnackbarComponent({ text: 'You are in Offline.Please check your internet connection', backgroundColor: colors.red3 });
      }
    }
  };
  const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
  return () => {
    unsubscribe();
  };
};

export const truncateString = str => {
  if (str.length > 5) {
    return str.substring(0, 5) + '...';
  }
  return str;
};

export const handleshare = async () => {
  const androidUrl = 'https://play.google.com/store/apps/details?id=com.nivaas&hl=en';
  const iosUrl = 'https://apps.apple.com/in/app/nivaas/id6639611241';
  // const logoUri = require('../utils/assets/images/Nivaas-logo.png');
  try {
    const result = await Share.share({
      // url: logoUri, 
      title: 'Check this out!',
      message: `Hi! We've been using the Nivaas App in our apartment, and it's been really helpful. Highly recommend it for your apartment! \n\nAndroid: ${androidUrl} \n\niOS: ${iosUrl}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type:', result.activityType);
      } else {
        console.log('Shared successfully');
        // SnackbarComponent({text: 'Shared successfully', backgroundColor: colors.green})
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    SnackbarComponent({text: 'Error sharing', backgroundColor: colors.red3});
  }
};


export const sendSupportEmail = () => {
  const email = 'nivaas.connect@gmail.com';
  const subject = 'Nivaas';
  const body = 'Describe Your Issue Here :';
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  try {
    Linking.openURL(mailtoUrl);
  } catch (error) {
    console.log(error);
  }
};

export const NotificationCount = ({FilteredData, setNotificationsCount}) => {
  if (FilteredData?.length > 1000) {
    setNotificationsCount('999+');
  } else if (FilteredData?.length > 100) {
    setNotificationsCount('99+');
  } else if (FilteredData?.length > 10) {
    setNotificationsCount('9+');
  } else {
    setNotificationsCount(FilteredData?.length);
  }
};

export const CreateNumber=(response) => {
  const {user} = response || '';
  const { mobileNumber, id } = user || '';
  const lastThreeDigits = mobileNumber?.slice(-3);
  const combinedNumber = lastThreeDigits + id;
  return combinedNumber;
}

export const formatDate = (timestamp, showDate = true, showTime = true) => {
  const date = new Date(timestamp);

  const year = date?.getFullYear();
  const month = String(date?.getMonth() + 1)?.padStart(2, '0');
  const day = String(date?.getDate())?.padStart(2, '0');

  const hours = String(date?.getHours())?.padStart(2, '0');
  const minutes = String(date?.getMinutes())?.padStart(2, '0');
  const seconds = String(date?.getSeconds())?.padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  if (showDate && showTime) {
    return `${formattedDate} ${formattedTime}`;
  } else if (showDate) {
    return formattedDate;
  } else if (showTime) {
    return formattedTime;
  } else {
    return '';
  }
};

export const handleStatusColor = status => {
  switch (status) {
    case 'OPEN':
      return {
        color: colors.green5,
      };
    case 'IN_PROGRESS':
      return {
        color: colors.yellowColor,
      };
    case 'RESOLVED':
      return {
        color: colors.green5,
      };
    case 'CLOSED':
      return {
        color: colors.red3,
      };
    default:
      return {
        color: colors.red3,
      };
  }
};

export const mergeArrays = (arr1 = [], arr2 = [] ) => {
  // Ensure arrays are not empty before merging
  if (arr1?.length === 0) return [...new Set(arr2)];
  if (arr2?.length === 0) return [...new Set(arr1)];
  
  return [...new Set([...arr1, ...arr2])];
};

export const getResidentTypeLabel = (residentType) => {
  switch (residentType) {
    case 'FLAT_OWNER':
      return 'Flat Owner';
    case 'FLAT_OWNER_FAMILY_MEMBER':
      return 'Family Member';
    case 'TENANT':
      return 'Tenant';
    default:
      return residentType; 
  }
};

export const errorcode = ({errorCode,errormessage}) =>{
  if (errorCode === 1000) {
    SnackbarComponent({text: errormessage || 'Deleted Successfully',backgroundColor: colors.red3});
  } 
}