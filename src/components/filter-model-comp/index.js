import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { CheckBox } from 'react-native-elements';
import { colors } from '../../common';
import { styles } from '../../screens/manage-flats/style';
import { PrimaryButton } from '../primary-button';
import { Text } from 'react-native';

const FilterModelComp = ({
  filterModalVisible,
  setFilterModalVisible,
  selectedRoles,
  setSelectedRoles,
  filterOptions = [], 
  filterTitle = "Filter" 
}) => {

  const handleCheckboxPress = (role) => {
    const updatedRoles = selectedRoles?.includes(role)
      ? selectedRoles?.filter(item => item !== role)
      : [...selectedRoles, role];
    setSelectedRoles(updatedRoles);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={filterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent,{borderTopLeftRadius: 20,borderTopRightRadius: 20}]}>
              <View style={{alignItems:'center'}}>
              <Text style={{color:colors.black,fontSize:17,fontWeight:'bold'}}>By Status</Text>
              </View>
              {filterOptions?.map(option => (
                <CheckBox
                  key={option.value}
                  title={option.label}
                  checked={selectedRoles?.includes(option.value)}
                  checkedColor={colors.primaryColor}
                  onPress={() => handleCheckboxPress(option.value)}
                />
              ))}
              <View style={{ marginHorizontal: '3%', marginVertical: '5%' }}>
                <PrimaryButton
                  text={filterTitle}
                  bgColor={colors.primaryColor}
                  onPress={() => setFilterModalVisible(false)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModelComp;