import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { colors } from '../../common';

const SearchScreen = ({ query, setQuery ,suggestions,marginHorizontal}) => {

  const [placeholder, setPlaceholder] = useState(suggestions[0] || []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(prev => {
        const currentIndex = suggestions?.indexOf(prev);
        const nextIndex = (currentIndex + 1) % suggestions?.length;
        return suggestions[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container,{marginHorizontal:marginHorizontal || '2%'}]}>
      <SearchBar
        placeholder={placeholder}
        onChangeText={setQuery}
        value={query}
        onClearPress={() => setQuery('')}
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:'2%',
  },
  searchBar: {
    borderRadius: 5,
    backgroundColor: colors.gray3,
    elevation:2
  },
});

export default SearchScreen;