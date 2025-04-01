//* eslint-disable no-undef */
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useContext, useState, useEffect, useRef} from 'react';
import RNRestart from 'react-native-restart';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {styles} from './styles.js';
import { NivaasIcon} from '../sign-up/index.js';
import NetInfo from '@react-native-community/netinfo';
import {useNivaastriggerotpMutation} from '../../redux/services/authService.tsx';
import {removeSpaces, SnackbarComponent} from '../../common/customFunctions.js';
import { getAuthTokenDetails, getRefreshToken } from '../../utils/preferences/localStorage.js';
import PhoneInput from 'react-native-international-phone-number';

const Signin = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(' ');
  const [mobNum, setMobNum] = useState(null);
  // console.log(mobNum,';;;MOBNUM');
  
  const [loader, setloader] = useState(false);
  const [timer, setTimer] = useState('00');
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const Ref = useRef(null);

  // Set India as the default country
  const [selectedCountry, setSelectedCountry] = useState({
    name: { en: 'India' },
    cca2: 'IN', // Country code for India
    callingCode: '+91', // India's calling code
  });
  // console.log(selectedCountry,";;;;;;;;;;;;CONTRyyyyyyyyyyy");
  

  const [nivaasTriggerOtp] = useNivaastriggerotpMutation();
  var secLeft = 30;

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = e => {
    let {total, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    }
  };

  const startTime = e => {
    if (Ref.current) {
      clearInterval(Ref.current);
    }
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + secLeft);
    return deadline;
  };
  function handleInputValue(phoneNumber) {
    const Number = removeSpaces(phoneNumber);
    setMobNum(Number);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }

  let otpInput = useRef(null);

  const setText = () => {
    otpInput?.current?.setValue('');
  };

  useEffect(() => {
    startTime(getDeadTime());
    setText();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const OtpTrigger = async () => {
    let otpPayload = {
      otpType: 'SIGNIN',
      primaryContact: mobNum,
    };
    console.log(otpPayload,'PAYLOAD');
    
    if (mobNum?.length === 0) {
      SnackbarComponent({
        text: 'Please Enter Mobile Number',
        backgroundColor: colors.red3,
      });
    } else if (mobNum?.length !== 10) {
      SnackbarComponent({
        text: 'Please Enter Valid Mobile Number',
        backgroundColor: colors.red3,
      });
    } else if (mobNum?.length === 10) {
      setloader(true);
      nivaasTriggerOtp(otpPayload)
        .unwrap()
        .then(response => {
          setloader(false);
          if (response) {
            navigation.navigate(allTexts.screenNames.otpScreen, {
              mobNum: mobNum,
              otp: response?.otp,
            });
          }
        })
        .catch(error => {
          setloader(false);
          SnackbarComponent({
            text: 'Servers Are Busy Try Again Later',
            backgroundColor: colors.red3,
          });
        });
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyboardStyle}
        contentContainerStyle={styles.contentStyle}>
        <NivaasIcon />
        <View style={styles.inputContainer}>
          {/* <PhoneInput
            value={mobNum}
            onChangePhoneNumber={handleInputValue}
            selectedCountry={selectedCountry}
            onChangeSelectedCountry={handleSelectedCountry}
            defaultCountry='IN'
            placeholder='Enter Mobile Numer...'
            placeholderTextColor={colors.gray}
          /> */}
           <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              placeholderTextColor={colors.gray}
              onChangeText={setMobNum}
              value={mobNum}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => OtpTrigger()}>
            {loader ? (
              <ActivityIndicator size={'small'} color={colors.white} style={{padding:2.5}}/>
            ) : (
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 18,
                  letterSpacing: 1.3,
                }}>
                Send OTP
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default Signin;
