import React from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../../common';
import {styles} from '../../screens/prepaid-meter/style';

const MeterDetailsModal = ({
  modalVisible,
  setModalVisible,
  handleEditPress,
  selectedMeter,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <Pressable
        style={styles.modalOverlay}
        onPress={() => setModalVisible(false)}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedMeter?.name}
              {' Details '}
              <Feather
                name="edit"
                size={20}
                color={colors.primaryColor}
                onPress={() => handleEditPress(selectedMeter)}
              />
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.metersDetailsText}>
              Meter Name : {selectedMeter?.name}
            </Text>
            <Text style={styles.metersDetailsText}>
              Cost PerUnit : {selectedMeter?.costPerUnit}
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MeterDetailsModal;
