import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import {colors, window } from '../../common';
import {
  DefaultTopBarOne,
  SnackbarComponent,
} from '../../common/customFunctions';
import { DefaultApartmentComp, PrimaryButton } from '../../components';
import { useAddApartmentServicePartnerMutation } from '../../redux/services/nivaasServicesService';
import { useSelector } from 'react-redux';
import { Entypo } from '../../common/icons';

const AddService = ({ navigation }) => {
  const { selectedApartment } = useSelector((state) => state.cityData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [providerName, setProviderName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [addApartmentServicePartner] = useAddApartmentServicePartnerMutation();
  const isReadOnly = (selectedApartment?.admin && selectedApartment?.approved) ? false : true;

  const nivaasTrustedPartners = [
    {
        id: 1,
        name: 'Electrician',
        uri: require('../../utils/assets/images/electrician_One.png'),
    },
    {
        id: 2,
        name: 'Plumbing',
        uri: require('../../utils/assets/images/plumber_One.png'),
    },
    {
        id: 3,
        name: 'Carpenter',
        uri: require('../../utils/assets/images/carpenter_One.png'),
    },
    {
        id: 4,
        name: 'Cleaning',
        uri: require('../../utils/assets/images/cleaner_one.png'),
    },
    {
        id: 5,
        name: 'Painting',
        uri: require('../../utils/assets/images/painter_two.png'),
    },
    {
        id: 6,
        name: 'Lift Service',
        uri: require('../../utils/assets/images/liftService.png'),
      },
];

  const handleServicePress = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    const errors = {};
    if (!mobileNumber) {
      errors.mobileNumber = 'Mobile number is required';
    }else if (mobileNumber?.length < 10){
      errors.mobileNumber = 'Enter Proper Mobile Number';
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoader(true);
    const payload = {
      apartmentId: selectedApartment?.id,
      categoryId: selectedService?.id,
      primaryContact: mobileNumber,
      name:providerName, 
    };
    console.log('Payload:', payload);
    addApartmentServicePartner(payload)
      .unwrap()
      .then((response) => {
        SnackbarComponent({
          text:'Added Successfully',
          backgroundColor: colors.green5,
        });
        setLoader(false);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        SnackbarComponent({
          text: error?.message || 'Partner Not Added',
          backgroundColor: colors.red3,
        });
        setLoader(false);
      });
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedService(null);
    setErrors(null);
    setProviderName(null);
    setMobileNumber(null);
  }

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 70, 'Add Service Provider', true)}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <FlatList
        data={nivaasTrustedPartners}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleServicePress(item)}
            style={styles.eachServiceCon}
          >
            <View style={[styles.imageBg, selectedService?.id === item.id && { borderColor: colors.primaryColor, borderWidth: 2 }]}>
              <Image source={item.uri} style={{ height: 50, width: 50 }} />
            </View>
            <Text style={styles.textStyle}>{item.name}</Text>
          </Pressable>
        )}
        numColumns={4}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>{selectedService?.name}</Text>
            <Entypo name='cross' color={colors.black} size={25} onPress={handleCloseModal} style={{position:'absolute',top:20,right:15}}/>
            <TextInput
              placeholder="Service Provider Name (Optional)"
              style={styles.input}
              value={providerName}
              onChangeText={setProviderName}
            />
            <TextInput
              placeholder="Service Provider Mobile Number"
              style={[styles.input, errors?.mobileNumber && styles?.errorInput]}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors?.mobileNumber && (
              <Text style={styles.errorText}>{errors?.mobileNumber}</Text>
            )}
            <View style={{marginTop:'5%'}}>
            <PrimaryButton
              text={'ADD'}
              bgColor={isReadOnly ? colors.gray : colors.primaryColor}
              onPress={isReadOnly ? ()=>SnackbarComponent({
                text: 'Accessed Only for Apartment Admins',
                backgroundColor: colors.yellowColor,
              }) : handleSubmit}
              loading={loader}
            />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddService;

const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  eachServiceCon: {
    alignItems: 'center',
    marginHorizontal: '3%',
    marginVertical: '4%',
    height: window.height * 0.08,
    width: window.width * 0.18,
    justifyContent: 'center',
  },
  imageBg: {
    backgroundColor: colors.gray3,
    paddingVertical: '15%',
    paddingHorizontal: '15%',
    borderRadius: 10,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 13,
    color: colors.black,
    fontWeight:'500',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom:'30%'
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.black,
  },
  input: {
    height: 45,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 16,
    marginTop: '5%',
  },
  errorInput: {
    borderColor: colors.red3,
  },
  errorText: {
    color: colors.red3,
    fontSize: 12,
    marginTop: 5,
  },
});