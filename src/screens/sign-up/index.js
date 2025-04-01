/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Snackbar from 'react-native-snackbar';
import {InputField, PrimaryButton} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {allTexts, colors} from '../../common';
import {Formik} from 'formik';
import {RegisterValidationSchema} from '../../common/schemas';
import {styles} from './style';
// import {NewVerifyOTP, loginUser1} from '../../utils/api';
import {PasswordField} from '../../components/inputfield';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {Terms_And_Conditions} from '../../components';
export const NivaasIcon = () => (
  <View style={styles.imageContainer}>
    <Image
      resizeMode="contain"
      style={styles.templeLogo}
      source={require('../../utils/assets/images/Nivaas-logo.png')}
    />
  </View>
);
const Signup = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [tcModal, setTcModal] = useState(false);
  const [isConnected, setIsConnected] = useState(' ');
  console.log(isConnected);

  useEffect(() => {
    const unsubscribe = NetInfo?.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const netWorkChecking = () => {
    if (isConnected == false) {
      Snackbar.show({
        text: 'No Internet Connection',
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: colors.primaryColor,
        action: {
          text: 'Reload',
          textColor: 'White',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      });
    } else {
      Snackbar.show({
        text: 'Internet Connected',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
    }
  };

  useEffect(() => {
    netWorkChecking();
  });
  const {
    buttonTexts: {login, sigup},
    screenNames: {signin, otpScreen},
    paragraphs: {alreadyAccount},
    placeHolders: {
      fistNamePlace,
      lastNamePlace,
      emailPlace,
      confirmPasswordPlace,
      passwordPlace,
    },
    headings: {
      inputTitles: {
        fName,
        phoneNo,
        lastName,
        email,
        password,
        confirmPassword,
        username,
      },
    },
  } = allTexts;

  const UserRegisterHandler = async (data, action) => {
    let LogInPayload = {
      primaryContact: data?.phone,
      password: data?.password,
    };
    let LogInPayload2 = {
      email: data?.email,
      password: data?.password,
    };

    const otpPayload = {
      otpType: 'SIGNUP',
      primaryContact: data?.phone,
      emailAddress: data?.email,
    };
    // console.log('payload otp', otpPayload);
    let resOfMob = await loginUser1(LogInPayload);
    console.log('payloadmob=========>', resOfMob[0]?.Error);
    let resOfEmail = await loginUser1(LogInPayload2);
    console.log('payloademail=============>', resOfMob[0]?.Error);
    if (resOfMob?.status === 200) {
      alert('mobile number already registered');
      action.setSubmitting(false);
    } else if (resOfEmail?.status === 200) {
      alert('email already registered');
      action.setSubmitting(false);
    } else {
      // console.log('ajshbx,jhabs', resOfEmail?.status, resOfMob?.status)
      try {
        // let response = await NewVerifyOTP(otpPayload);
        console.log('response of otp', response?.data);
        const {
          data: {emailAddress, otp},
        } = response || {};
        if (response?.status === 200) {
          if (response && emailAddress) {
            let otpPayload = {
              data,
              primaryContact: data?.phone,
              password: data?.confirmPassword,
            };
            navigation.navigate(otpScreen, otpPayload);
          } else if (response?.status == 403) {
            alert(response?.data?.message);
          } else if (response) {
            console.log('error in signup', response?.data, response?.status);
            Alert.alert(
              'USER ALREADY REGISTERED',
              'Please check mobile number or email',
              [
                {
                  text: 'Ok',
                },
              ],
            );
          }
          action.setSubmitting(false);
        }
      } catch (error) {
        alert(error);
      }
    }
    // else if(resOfEmail?.status === 400 || resOfMob?.status === 400) {
    //   alert('please check your mobile number or email');
    //   action.setSubmitting(false);
    // } else {
    //   alert('please check the details you entered')
    // }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar backgroundColor={'white'} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.keyBoardStyle}
        contentContainerStyle={styles.scrollContainer}>
        {/* <Text style={styles.signupText}>{sigup}</Text> */}
        <KovelaIcon />
        <Formik
          onSubmit={(values, formikActions) => {
            UserRegisterHandler(values, formikActions);
          }}
          validationSchema={RegisterValidationSchema}
          initialValues={{
            firstName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
          }}>
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            values,
          }) => {
            return (
              <View style={styles.fieldContainer}>
                <InputField
                  title={fName}
                  placeholder={fistNamePlace}
                  error={touched.firstName && errors.firstName}
                  onBlur={handleBlur('firstName')}
                  setState={handleChange('firstName')}
                />
                <InputField
                  title={lastName}
                  placeholder={fistNamePlace}
                  error={touched.lastName && errors.lastName}
                  onBlur={handleBlur('lastName')}
                  setState={handleChange('lastName')}
                />

                <InputField
                  title={email}
                  placeholder={emailPlace}
                  error={touched.email && errors.email}
                  onBlur={handleBlur('email')}
                  setState={handleChange('email')}
                  autoCapitalize="none"
                />
                <InputField
                  title={phoneNo}
                  isFlag
                  keyboardType={'numeric'}
                  placeholder={lastNamePlace}
                  error={touched.phone && errors.phone}
                  onBlur={handleBlur('phone')}
                  setState={handleChange('phone')}
                  maxLength={10}
                />
                {/* <InputField
                  title={username}
                  placeholder={'user Name'}
                  error={touched.userName && errors.userName}
                  onBlur={handleBlur('userName')}
                  setState={handleChange('userName')}
                /> */}
                <PasswordField
                  value={values.password}
                  title={password}
                  placeholder={passwordPlace}
                  error={touched.password && errors.password}
                  onBlur={handleBlur('password')}
                  setState={handleChange('password')}
                />
                <PasswordField
                  value={values.confirmPassword}
                  title={confirmPassword}
                  placeholder={confirmPasswordPlace}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  setState={handleChange('confirmPassword')}
                />
                <TouchableOpacity
                  onPress={() => setTcModal(true)}
                  style={styles.checkView}>
                  <Ionicons
                    name={isChecked ? 'checkbox' : 'square-outline'}
                    size={30}
                    style={{
                      ...styles.checkIcon,
                      color: isChecked ? colors.primaryColor : '#7a98fa',
                    }}
                  />
                  <Text
                    style={{
                      ...styles.tc,
                      color: isChecked ? colors.primaryColor : '#7a98fa',
                    }}>
                    Terms & Conditions{' '}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                  {isChecked ? (
                    <PrimaryButton
                      bgColor={colors.primaryColor}
                      loading={isSubmitting}
                      onPress={handleSubmit}
                      text={sigup}
                      radius={25}
                    />
                  ) : (
                    <PrimaryButton
                      bgColor={'gray'}
                      loading={isSubmitting}
                      onPress={() =>
                        alert('Accept terms and conditions to continue..')
                      }
                      text={sigup}
                      radius={25}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.alreadyAcc}
                  onPress={() => {
                    navigation.navigate(signin);
                  }}>
                  <Text style={styles.alreadyTextContainer}>
                    {alreadyAccount}
                    <Text style={styles.isLogin}>{login}</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
        {/* {tcModal && (
          <Terms_And_Conditions
            isModal={tcModal}
            onPress={() => {
              setTcModal(false), setIsChecked(true);
            }}
          />
        )} */}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;
