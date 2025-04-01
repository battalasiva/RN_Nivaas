import React, { useState } from 'react';
import {
  Modal,
  TextInput,
  Text,
  View,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
} from 'react-native';
import { styles } from '../../screens/manage-flats/style';
import { colors } from '../../common';
import { AntDesign } from '../../common/icons';
import { PrimaryButton } from '../primary-button';
import { usePostAvailableFlatsForRentMutation, usePostAvailableflatsForSaleMutation, usePostFlatDetailsMutation } from '../../redux/services/cityServices';

const SaleAndRentModal = ({ modalVisible, setModalVisible, selectedFlatId }) => {
  const [noOfRooms, setNoOfRooms] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [parkingAvailable, setParkingAvailable] = useState('');
  const [floorNo, setFloorNo] = useState('');
  const [facing, setFacing] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [loader, setloader] = useState(false);

  const [postFlatDetails] = usePostFlatDetailsMutation();
  const [postAvailableFlatsForRent] = usePostAvailableFlatsForRentMutation();
  const [postAvailableflatsForSale] = usePostAvailableflatsForSaleMutation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };

  const handleSubmit = () => {
    setloader(true);
    if (selectedOption === 'RENT') {
      const flatRentPayload = {
        flatId: selectedFlatId,
        availableForRent: true,
        payload: {
          noOfRooms,
          sqFeet,
          parkingAvailable,
          floorNo,
          facing,
        },
      };
      console.log('Submitted RENT Data:', flatRentPayload);
      postAvailableFlatsForRent(flatRentPayload)
        .unwrap()
        .then((response) => {
          setloader(false);
          console.log(response);
          setModalVisible(false);
        })
        .catch((error) => {
          console.log(error);
          setloader(false);
        });
    } else if (selectedOption === 'SALE') {
      const flatSalePayload = {
        flatId: selectedFlatId,
        availableForSale: true,
        payload: {
          noOfRooms,
          sqFeet,
          parkingAvailable,
          floorNo,
          facing,
        },
      };
      console.log('Submitted SALE Data:', flatSalePayload);
      postAvailableflatsForSale(flatSalePayload)
        .unwrap()
        .then((response) => {
          console.log(response);
          setModalVisible(false);
          setloader(false);
        })
        .catch((error) => {
          console.log(error);
          setloader(false);
        });
    } else {
      const flatPayload = {
        flatId: selectedFlatId,
        payload: {
          noOfRooms,
          sqFeet,
          parkingAvailable,
          floorNo,
          facing,
        },
      };
      console.log(flatPayload, 'POST');
      postFlatDetails(flatPayload)
        .unwrap()
        .then((response) => {
          setloader(false);
          console.log(response);
        })
        .catch((error) => {
          setloader(false);
          console.log(error);
        });
    }
  };
  const getButtonText = () => {
    if (selectedOption === 'RENT') {
      return 'Post for Rent';
    } else if (selectedOption === 'SALE') {
      return 'Post for Sale';
    }
    return 'Add Flat Details';
  };

  return (
    <View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0 }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { height: '100%' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <AntDesign
                    name="arrowleft"
                    size={25}
                    color={colors.black}
                    onPress={() => setModalVisible(false)}
                    style={{ marginRight: '7%' }}
                  />
                  <View style={{ width: '75%', alignItems: 'center' }}>
                    <Text style={styles.modalTitle}>Flat Details</Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <TextInput
                    style={styles.input}
                    value={noOfRooms}
                    onChangeText={setNoOfRooms}
                    placeholder="Enter Number of Rooms"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={sqFeet}
                    onChangeText={setSqFeet}
                    placeholder="Enter Square Feet"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={parkingAvailable}
                    onChangeText={setParkingAvailable}
                    placeholder="Is Parking Available? (Yes/No)"
                  />
                  <TextInput
                    style={styles.input}
                    value={floorNo}
                    onChangeText={setFloorNo}
                    placeholder="Enter Floor Number"
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.input}
                    value={facing}
                    onChangeText={setFacing}
                    placeholder="Enter Facing Direction (e.g., East, West)"
                  />
                </View>
                <View style={styles.selectButtonCon}>
                  <Pressable
                    style={[styles.eachOption, { backgroundColor: selectedOption === 'RENT' ? colors.primaryColor : colors.white }]}
                    onPress={() => handleOptionSelect('RENT')}
                  >
                    <Text style={{
                      color: selectedOption === 'RENT' ? colors.white : colors.black,
                      fontWeight: 'bold'
                    }}>Rent</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.eachOption, { backgroundColor: selectedOption === 'SALE' ? colors.primaryColor : colors.white }]}
                    onPress={() => handleOptionSelect('SALE')}
                  >
                    <Text style={{
                      color: selectedOption === 'SALE' ? colors.white : colors.black,
                      fontWeight: 'bold'
                    }}>Sale</Text>
                  </Pressable>
                </View>
                <View>
                  <PrimaryButton
                    text={getButtonText()}
                    bgColor={colors.primaryColor}
                    onPress={handleSubmit}
                    loading={loader}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SaleAndRentModal;