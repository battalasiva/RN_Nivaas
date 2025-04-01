import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../../common';

const CustomDropdown = ({
  showLabel,
  label,
  data,
  value,
  onChange,
  labelField,
  valueField,
  errorMessage,
  fetchMoreData,
  hasMoreData,
  onSearch,
}) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleDropdownChange = (item) => {
    setSelectedValue(item[valueField]);
    onChange(item[valueField], item[labelField]);
  };

  const loadMoreItems = useCallback(async () => {
    if (!isLoading && hasMoreData) {
      setIsLoading(true);
      await fetchMoreData();
      setIsLoading(false);
    }
  }, [fetchMoreData, isLoading, hasMoreData]);

  const renderFooter = () => {
    return isLoading && hasMoreData ? (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    ) : null;
  };

  const handleSearch = (query) => {
    if (onSearch) {
      onSearch(query); 
    }
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{showLabel ? label : ''}</Text>
      <View style={styles.dropdown}>
        <Dropdown
          data={data && data?.length > 0 ? data : [{ [labelField]: errorMessage || 'No results found', [valueField]: null }]}
          labelField={labelField}
          valueField={valueField}
          value={selectedValue}
          onChange={handleDropdownChange}
          search
          maxHeight={300}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          placeholder={`Select ${label}`}
          searchPlaceholder="Search..."
          onChangeText={handleSearch} 
          containerStyle={styles.dropdown}
          flatListProps={{
            onEndReached: loadMoreItems,  
            onEndReachedThreshold: 0.9,
            ListFooterComponent: renderFooter,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {},
  placeholderStyle: {
    paddingLeft: 10,
  },
  selectedTextStyle: {
    paddingLeft: 10,
    color: colors.black,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
    color: colors.black,
  },
  dropdown: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 13 : 10,
  },
  loadingIndicator: {
    padding: 10,
    alignItems: 'center',
  },
});
export default CustomDropdown;