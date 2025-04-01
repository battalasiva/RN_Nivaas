import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import {PrimaryButton} from '../../components';
import {colors, window} from '../../common';
import { useUserDetailsMutation } from '../../redux/services/authService';

const CompleteProfileModal = ({modalVisible, setModalVisible, onSave,id,fcmToken,handleCurrentCustomerData}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [postUserDetails] = useUserDetailsMutation();
  const handleSave = () => {
    if (name === '') {
      setNameError('Name is required');
    } else {
      setNameError('');
    }

    if (name !== '') {
      const payload = {
        id: id,
        fullName: name,
        email:email,
        fcmToken:fcmToken
      };
      // console.log(payload,'llllllllllllll');
      postUserDetails(payload)
        .unwrap()
        .then((response) => {
          console.log("postUserDetails response ======>",response);
          // onSave(name, email);
          setModalVisible(false);
          handleCurrentCustomerData();
        })
        .catch(error => {
          console.log('ERROR In POSTING USERDETAILS===>', error);
        });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Complete Your Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Name"
            placeholderTextColor={colors.gray}
            onChangeText={text => setName(text)}
            selectionColor={colors.primaryColor} 
          />
          {nameError !== '' && (
            <Text style={styles.errorText}>{nameError}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter Your Email (Optional)"
            placeholderTextColor={colors.gray}
            onChangeText={text => setEmail(text)}
            selectionColor={colors.primaryColor} 
          />
          {/* {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>} */}
          <View style={{marginTop:window.height*0.03,width:'100%'}}>
            <PrimaryButton
              onPress={handleSave}
              text="Save"
              bgColor={colors.primaryColor}
              radius={30}
              shadow={true}
              textColor={colors.white}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CompleteProfileModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    alignItems: 'left',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: colors.gray2,
    borderWidth: 1,
    marginTop: window.height*0.02,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
