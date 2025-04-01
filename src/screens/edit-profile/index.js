import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { allTexts, colors } from '../../common';
import { statusBarHeight } from '../../utils/config/config';
import { PrimaryButton, TopBarCard2 } from '../../components';
import { useSelector } from 'react-redux';
import { SnackbarComponent } from '../../common/customFunctions';
import { useEditprofileMutation } from '../../redux/services/myAccountService';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditProfile = ({ navigation }) => {
  const custDetails = useSelector((state) => state.currentCustomer);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(''); 
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [editProfile] = useEditprofileMutation();

  const handlePostUserDetails = () => {
    let valid = true;

    if (name.trim() === '') {
      setNameError('Name cannot be empty');
      valid = false;
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email cannot be empty');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email format is invalid');
      valid = false;
    } else {
      setEmailError('');
    }
    
    if (valid){
      const payload = {
        id: custDetails?.customerOnboardReqData?.user?.id,
        fullName: name,
        email: email,
        gender: gender,
      };
      console.log(payload,'PAYLOAD');
      
      editProfile(payload)
        .unwrap()
        .then((response) => {
          console.log(response, 'details updated');
          SnackbarComponent({ text: 'User details updated', backgroundColor: colors.green });
          navigation.navigate(allTexts.screenNames.myAccount);
        })
        .catch((error) => {
          console.log(error);
          if (error?.data?.errorcode === 1001) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Email already in use', backgroundColor: colors.red3 });
          } else {
            SnackbarComponent({ text: 'Error in updating user details', backgroundColor: colors.red3 });
          }
        });
    }
  };

  const handleCustomerDetails = () => {
    setName(custDetails?.customerOnboardReqData?.user?.name || '');
    setEmail(custDetails?.customerOnboardReqData?.user?.email || '');
    setGender(custDetails?.customerOnboardReqData?.user?.gender || ''); 
  };

  useEffect(() => {
    handleCustomerDetails();
  }, []);

  const renderGenderIcon = (genderType, iconName) => {
    const isSelected = gender === genderType;
    return (
      <TouchableOpacity
        style={[
          styles.genderIcon,
          isSelected && { backgroundColor: colors.primaryColor }, 
        ]}
        onPress={() => setGender(genderType)} 
      >
        <Icon
          name={iconName}
          size={30}
          color={isSelected ? colors.white : colors.black} 
        />
        <Text style={[styles.genderText,{color: isSelected ? colors.white : colors.black}]}>{genderType}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: statusBarHeight, height: 70 }}>
        <TopBarCard2 back={true} txt={'Edit Profile'} navigation={navigation} />
      </View>
      <View style={styles.subContainer}>
        <View style={styles.eachFieldCon}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter your Name"
            selectionColor={colors.primaryColor}
            maxLength={40}
            autoFocus
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>
        <View style={styles.eachFieldCon}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter Your Email"
            keyboardType="email-address"
            selectionColor={colors.primaryColor}
            maxLength={40}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Gender Selection Section */}
        {/* <View style={styles.genderContainer}>
          {renderGenderIcon('Male', 'male')}
          {renderGenderIcon('Female', 'female')}
          {renderGenderIcon('Others', 'genderless')}
        </View> */}

        <View style={styles.button}>
          <PrimaryButton
            onPress={handlePostUserDetails}
            bgColor={colors.primaryColor}
            radius={5}
            text={'Save Changes'}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  eachFieldCon: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 5,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  genderIcon: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.gray3,
  },
  genderText: {
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    marginVertical: '5%',
  },
});

export default EditProfile;