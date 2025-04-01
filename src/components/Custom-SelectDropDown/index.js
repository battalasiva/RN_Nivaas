import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { colors } from '../../common';

const CustomSelectDropdown = ({ data, onSelect, selectedItem, placeholder,fontsize,bgcolor }) => {
  return (
    <View style={styles.datePicker}>
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        defaultButtonText={placeholder}
        buttonTextAfterSelection={(selectedItem) => selectedItem?.name}
        rowTextForSelection={(item) => item?.name}
        defaultValue={selectedItem}
        renderButton={(selectedItem) => (
          <View style={[styles.dropdownButtonStyle,{backgroundColor:bgcolor || colors.primaryColor}]}>
            <Text style={[styles.dropdownButtonTxtStyle,{fontSize: fontsize ? fontsize : 16}]}>
              {(selectedItem && selectedItem.name) || placeholder}
            </Text>
            <FontAwesome name="caret-down" size={20} color={colors.white} style={styles.iconStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              backgroundColor: isSelected ? colors.primaryColor : colors.white,
            }}
          >
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                color: isSelected ? colors.white : colors.black,
              }}
            >
              {item?.name}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    flex: 1,//Man
    marginHorizontal: 5,
  },
  dropdownButtonStyle: {
    position: 'relative',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconStyle: {
    position: 'absolute', 
    right: 10, 
  },
  dropdownItemStyle: {
    padding: 10,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: colors.black,
  },
  dropdownMenuStyle: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});

export default CustomSelectDropdown;
