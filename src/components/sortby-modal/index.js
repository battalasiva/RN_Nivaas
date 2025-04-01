import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../common';

const SortModalComponent = ({ 
  sortbyModalVisible, 
  setSortbyModalVisible, 
  handleOnSort, 
  filteredData, 
  sortOptions = [] 
}) => {
  const [sortType, setSortType] = useState(null);

  const handleSort = (type, sortFunction) => {
    const sortedData = sortFunction([...filteredData]);  
    setSortType(type);
    handleOnSort(sortedData);  
    setSortbyModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      visible={sortbyModalVisible}
      animationType="fade"
      onRequestClose={() => setSortbyModalVisible(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setSortbyModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Sort By</Text>
          {sortOptions.map((option) => (
            <Pressable key={option.type} onPress={() => handleSort(option.type, option.sortFunction)} style={styles.sortOption}>
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  sortOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '500',
    color: colors.gray,
    marginLeft: '2%',
  },
});

export default SortModalComponent;
