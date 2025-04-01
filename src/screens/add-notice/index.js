import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {TextInput} from 'react-native';
import {allTexts, colors} from '../../common';
import {CustomDropdown, DefaultApartmentComp, PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ApprovedApartments, DefaultTopBarOne, getSelectedApartment, SnackbarComponent } from '../../common/customFunctions';
import { useSelector } from 'react-redux';
import { usePostNoticeMutation } from '../../redux/services/notificationService';
import { styles } from './style';

const AddNotice = ({navigation}) => {
  const {selectedApartment} = useSelector(state => state.cityData);
  const customerDetails = useSelector(state => state.currentCustomer);
  const isReadOnly = (selectedApartment?.admin && selectedApartment?.approved || customerDetails?.customerOnboardReqData?.user?.roles?.includes(allTexts.roles.flatOwner)) ? false : true;
  const [addNoticeForm, setAddNoticeForm] = useState({title: '', message: ''});
  const [errors, setErrors] = useState({title: '', message: ''});
  const [loader, setloader] = useState(false);
  const [postNotice] = usePostNoticeMutation();
  const handleTextChange = (field, value, maxLength) => {
    if (value.length <= maxLength) {
      setAddNoticeForm(prevForm => ({
        ...prevForm,
        [field]: value,
      }));
    }
    if (value?.length === maxLength) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: `Max limit of ${maxLength} characters reached`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };

  const {title, message} = addNoticeForm;
  const {title: titleError, message: messageError} = errors;

  const handleSubmit = () => {
    let valid = true;
    if (!addNoticeForm.title.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        title: 'Title is required',
      }));
      valid = false;
    }
    if (!addNoticeForm.message.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        message: 'Message is required',
      }));
      valid = false;
    }
    if (addNoticeForm?.message?.length < 10) {
      setErrors(prevErrors => ({
        ...prevErrors,
        message: 'Minimum 10 characters required',
      }));
      valid = false;
    }
    if (valid) {
      setloader(true);
      const payload = {
          title: title,
          body: message,
          apartmentId:selectedApartment?.id
      }
      postNotice(payload)
        .unwrap()
        .then((response)=>{
          console.log("POST NOTICE response",response);
          setloader(false);
          SnackbarComponent({ text: 'Posted Successfully', backgroundColor: colors.green5 });
          navigation.goBack();
        }).catch((error)=>{
          console.log('ERROR IN POSTING NOTICE',error);
          setloader(false);
          SnackbarComponent({ text: 'Error In Posting Notice', backgroundColor: colors.red3 });
        })
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {DefaultTopBarOne(navigation,0,'Add Notice',true)}
      <DefaultApartmentComp selectedApartment={selectedApartment}/>
      <View style={styles.textInputCon}>
        <View style={styles.inputIconCon}>
          <MaterialCommunityIcons
            name="subtitles-outline"
            size={25}
            color={colors.primaryColor}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Title"
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={value => handleTextChange('title', value, 50)}
            maxLength={50}
            multiline={true}
            autoFocus
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.error}>{titleError}</Text>
          <Text style={styles.lengthText}>{title.length}/50</Text>
        </View>
        <View style={styles.inputIconCon}>
          <MaterialCommunityIcons
            name="message-text-outline"
            size={22}
            color={colors.primaryColor}
            style={{position: 'absolute', top: 15, left: 7}}
          />
          <TextInput
            placeholder="Enter Message"
             placeholderTextColor={colors.gray}
            value={message}
            style={[styles.input, {marginLeft: 25}]}
            onChangeText={value => handleTextChange('message', value, 1000)}
            multiline={true}
            maxLength={1000}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.error}>{messageError}</Text>
          <Text style={styles.lengthText}>{message.length}/1000</Text>
        </View>
        <View style={{marginTop: '5%'}}>
          <PrimaryButton
            text={'POST'}
            bgColor={isReadOnly ? colors.gray : colors.primaryColor}
            onPress={isReadOnly ? ()=>SnackbarComponent({
              text: 'Apartment Admins and Flat Owners only can post Notices',
              backgroundColor: colors.yellowColor,
            }) : handleSubmit}
            loading={loader}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNotice;
