import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState, useContext } from 'react';
import { allTexts, colors } from '../../common';
import OTPTextInput from 'react-native-otp-textinput';
import { styles } from './style';
import { PrimaryButton, TopBarcard } from '../../components';
import ApplicationContext from '../../utils/context-api/Context';
import { statusBarHeight } from '../../utils/config/config';
import { saveLoginSessionDetails, saveRefreshTokenDetails } from '../../utils/preferences/localStorage';
import { useNivaasSigninMutation, useNivaastriggerotpMutation } from '../../redux/services/authService';
import { useAppDispatch } from '../../redux/reduxHooks';
import { TopBarCard2 } from '../../components/topBar1/topBarCard';
import { loginAction } from '../../redux/slices/authSlice.ts';
import { SnackbarComponent } from '../../common/customFunctions.js';

const OTPScreen = ({ navigation, route }) => {
  const [timer, setTimer] = useState('00:30');
  const [loading, setLoading] = useState(false);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [nivvasLogin] = useNivaasSigninMutation();
  const [nivaasTriggerOtp] = useNivaastriggerotpMutation();
  const dispatch = useAppDispatch();
  const Ref = useRef(null);

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
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    } else {
      setIsTimerExpired(true);
      SnackbarComponent({ text: 'OTP TIME has expired. Please request a new one.', backgroundColor: colors.red3 });
      clearInterval(Ref.current);
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

  let otpInput = useRef(null);
  const { params: { mobNum, otp } } = route || {};
  
  const setText = () => {
    otpInput?.current?.setValue('');
  };

  const { setLoginDetails } = useContext(ApplicationContext);

  const signinHandler = async otpOutPut => {
    if (isTimerExpired) {
      SnackbarComponent({ text: 'Time expired. Please request a new OTP.', backgroundColor: colors.red3 });
      return; 
    }

    if (otpOutPut?.length !== 6) {
      SnackbarComponent({ text: 'OTP Mismatched', backgroundColor: colors.red3 });
    } else {
      let signInPayload = {
        primaryContact: mobNum,
        otp: otpOutPut,
      };
      try {
        setLoading(true);
        nivvasLogin(signInPayload)
          .unwrap()
          .then(response => {
            setLoading(false);
            console.log('res of nivaas otp', response);
            dispatch(loginAction({ token: response?.token, tokenType: response?.tokenType }));
            setLoginDetails(response.token);
            saveLoginSessionDetails(response?.type, response?.token);
            saveRefreshTokenDetails('RefreshToken', response?.refreshToken);
            SnackbarComponent({ text: 'Login Successful', backgroundColor: colors.green5 });
            clearInterval(Ref.current);
            setTimer('00:30');
            setIsTimerExpired(false);
          })
          .catch(error => {
            console.log('error--->', error?.data?.message);
            setLoading(false);
            SnackbarComponent({ text: 'OTP is not matched', backgroundColor: colors.red3 });
          });
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = () => {
    let otpPayload = {
      otpType: 'SIGNIN',
      primaryContact: mobNum,
    };
    setLoading(true);
    nivaasTriggerOtp(otpPayload)
      .unwrap()
      .then(response => {
        console.log('otpRes--->', response);
        setLoading(false);
        if (response) {
          setIsTimerExpired(false);
          setTimer('00:30');
          startTime(getDeadTime());
          SnackbarComponent({ text: 'OTP has been resent', backgroundColor: colors.green5 });
          if (otpInput.current) {
            otpInput.current.setValue('');
          }
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error in trigger otp', error);
        SnackbarComponent({ text: 'Servers Are Busy Try Again Later', backgroundColor: colors.red3 });
      });
  };

  useEffect(() => {
    startTime(getDeadTime());
    setText();
    
    if (otpInput.current) {
      otpInput.current.setValue(''); 
    }
    return () => clearInterval(Ref.current);
  }, []);

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={colors.white} />
      <View style={{ height: 70, marginTop: statusBarHeight }}>
        <TopBarCard2
          back={true}
          txt={'Confirm OTP'}
          navigation={navigation}
          onPress={() => navigation.navigate(allTexts.screenNames.signup)}
        />
      </View>
      <View style={styles.otpInputAndButtonCon}>
        <View style={styles.topContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>{allTexts.headings.verfiyPhone}</Text>
            <Text style={styles.detail}>Enter OTP sent to {mobNum}</Text>
          </View>
        </View>
        <View style={styles.otpCon}>
          <Text>{otp}</Text>
          <OTPTextInput
            ref={otpInput}
            inputCount={6}
            tintColor={colors.primaryColor}
            textInputStyle={styles.textInput}
            containerStyle={{
              marginTop: 1,
            }}
            autoFocus
            keyboardType="numeric"
          />
        </View>
        <View style={styles.btnContainer}>
          {isTimerExpired ? (
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleResendOtp}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.expectOtp}>
              Expect OTP in
              <Text style={styles.black}>{` ${timer} seconds`}</Text>
            </Text>
          )}
          <View style={{ marginHorizontal: '7%' }}>
            <PrimaryButton
              text={'Continue'}
              loading={loading}
              bgColor={colors.primaryColor}
              onPress={() => {
                let otpOutPut = otpInput?.current?.state?.otpText
                  ?.toString()
                  .replace(/,/g, '');
                if (otpOutPut !== '') {
                  signinHandler(otpOutPut);
                } else {
                  SnackbarComponent({ text: 'Please fill OTP', backgroundColor: colors.red3 });
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;