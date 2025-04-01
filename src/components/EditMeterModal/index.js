import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../common';
import { PrimaryButton } from '../../components';
import { styles } from '../../screens/prepaid-meter/style';
import { SnackbarComponent } from '../../common/customFunctions';

const EditMeterModal = ({
  editModalVisible,
  setEditModalVisible,
  editedMeter,
  setEditedMeter,
  handleUpdatePrepaidMetersDetails,
  isReadOnly
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!editedMeter?.name) {
      errors.name = 'Meter Name is required';
      valid = false;
    }
    if (!editedMeter?.description) {
      errors.description = 'Description is required';
      valid = false;
    }
    if (!editedMeter?.costPerUnit) {
      errors.costPerUnit = 'Cost Per Unit is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSave = () => {
    if (validate()) {
      handleUpdatePrepaidMetersDetails();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}>
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setEditModalVisible(false)}>
        <Pressable style={styles.updateModalContainer} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Meter Details</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Icon name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Meter Name</Text>
            <TextInput
              placeholder='Enter Meter Name'
              style={styles.input}
              value={editedMeter?.name}
              onChangeText={text =>
                setEditedMeter({ ...editedMeter, name: text })
              }
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder='Enter Description'
              style={styles.input}
              value={editedMeter?.description}
              onChangeText={text =>
                setEditedMeter({ ...editedMeter, description: text })
              }
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
            <Text style={styles.label}>Cost Per Unit</Text>
            <TextInput
              placeholder='Enter Cost Per Unit'
              style={styles.input}
              value={editedMeter?.costPerUnit?.toString()}
              onChangeText={text =>
                setEditedMeter({ ...editedMeter, costPerUnit: text })
              }
              keyboardType="numeric"
              maxLength={4}
            />
            {errors.costPerUnit && <Text style={styles.errorText}>{errors.costPerUnit}</Text>}
          </View>
          <PrimaryButton
            text={'Save Changes'}
            bgColor={isReadOnly ? colors.gray : colors.primaryColor}
            onPress={isReadOnly ? ()=>SnackbarComponent({
              text: 'Accessed Only for Apartment Admins',
              backgroundColor: colors.yellowColor,
            }) : handleSave}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditMeterModal;
