import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView,TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { colors } from '../../common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { PrimaryButton } from '../primary-button';
import { styles } from './style';

const FilterModal = ({ filterOptions, selectedFilters, onApply, onClear, setIsmodalVisible, onClose }) => {
  const [selectedMainCategory, setSelectedMainCategory] = useState('userCategory');
  const [selectedSubCategories, setSelectedSubCategories] = useState({
    userCategory: selectedFilters?.userCategory || [],
    status: selectedFilters?.status || [],
  });

  const selectedItemsCount = selectedSubCategories.userCategory.length + selectedSubCategories.status.length;

  useEffect(() => {
    setSelectedSubCategories({
      userCategory: selectedFilters?.userCategory || [],
      status: selectedFilters?.status || [],
    });
  }, [selectedFilters]);

  const handleCheckboxPress = (value, category) => {
    let updatedSelection;
    if (category === 'userCategory') {
      updatedSelection = selectedSubCategories.userCategory.includes(value)
        ? selectedSubCategories.userCategory.filter((item) => item !== value)
        : [...selectedSubCategories.userCategory, value];
      setSelectedSubCategories((prev) => ({ ...prev, userCategory: updatedSelection }));
    } else if (category === 'status') {
      updatedSelection = selectedSubCategories.status.includes(value)
        ? selectedSubCategories.status.filter((item) => item !== value)
        : [...selectedSubCategories.status, value];
      setSelectedSubCategories((prev) => ({ ...prev, status: updatedSelection }));
    }
  };

  const applyFilters = () => {
    onApply(selectedSubCategories);
  };

  const clearAll = () => {
    setSelectedSubCategories({ userCategory: [], status: [] });
    onClear();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign
            name="arrowleft"
            size={25}
            color={colors.black}
            onPress={() => setIsmodalVisible(false)}
            style={{ marginRight: '7%' }}
          />
          <Text style={styles.title}>Filters</Text>
        </View>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {/* Main Categories */}
        <ScrollView style={styles.leftPanel}>
          <TouchableOpacity style={
                selectedMainCategory === 'userCategory'
                  ? styles.selectedCategory
                  : styles.categoryItem
              } onPress={() => setSelectedMainCategory('userCategory')}>
            <Text style={{color:colors.black,fontSize:15,fontWeight:'500'}}>
              User Category
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={
                selectedMainCategory === 'status'
                  ? styles.selectedCategory
                  : styles.categoryItem
              } onPress={() => setSelectedMainCategory('status')}>
            <Text style={{color:colors.black,fontSize:15,fontWeight:'500'}}>
              Status
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Sub Categories */}
        <ScrollView style={styles.rightPanel}>
          {selectedMainCategory === 'userCategory' &&
            filterOptions.userCategory.map((option) => (
              <CheckBox
                key={option.value}
                title={option.label}
                checked={selectedSubCategories.userCategory.includes(option.value)}
                checkedColor={colors.primaryColor}
                onPress={() => handleCheckboxPress(option.value, 'userCategory')}
              />
            ))}

          {selectedMainCategory === 'status' &&
            filterOptions.status.map((option) => (
              <CheckBox
                key={option.value}
                title={option.label}
                checked={selectedSubCategories.status.includes(option.value)}
                checkedColor={colors.primaryColor}
                onPress={() => handleCheckboxPress(option.value, 'status')}
              />
            ))}
        </ScrollView>
      </View>

      {/* Footer with Apply Filters button and Selected Items Count */}
      <View style={styles.footer}>
        <Text style={styles.selectedItemsText}>Selected Items: {selectedItemsCount}</Text>
        <View style={{width:'40%'}}>
        <PrimaryButton text={'Apply Filters'} bgColor={colors.primaryColor} onPress={applyFilters}/>
        </View>
      </View>
    </View>
  );
};

export default FilterModal;