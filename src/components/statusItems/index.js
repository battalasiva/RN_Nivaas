import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, window } from '../../common';
import StatusTracker from '../status-tracker';

const apartments = [
  {
    id: 95,
    name: 'Juvarya',
    totalFlats: 20,
    approved: false,
    admin: true
  },
  {
    id: 2,
    name: 'Juhi',
    totalFlats: 20,
    approved: true,
    admin: true
  }
];

const { width } = Dimensions.get('window');

const StatusItems = ({ apartments }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    const result = apartments?.reduce((acc, apartment) => {
      if (apartment?.admin && !apartment?.approved) {
        acc.push({ id: `${apartment?.name}-${Date.now()}`, name: apartment?.name, status: 'Pending', residentType: null, type: 'Apartment' });
      }
      apartment?.flats.forEach((flat) => {
        if (!flat.approved) {
          acc.push({
            id: `${flat?.id}-${flat?.accessType}-${Date.now()}`,
            name: flat?.flatNo,
            status: 'Pending',
            residentType: flat?.accessType,
            type: 'Flat',
          });
        }
      });

      return acc;
    }, []);

    setFilteredData(result);
  }, []);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
    setCurrentIndex(index);
  };

  const onNext = () => {
    if (currentIndex < filteredData.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const onPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={{color:colors.black,fontSize:15,fontWeight:'500'}}>{item?.name}</Text>
      <StatusTracker item={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        horizontal
        pagingEnabled={false} // Disable paging for smooth scroll
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        decelerationRate="fast"
        getItemLayout={(data, index) => ({ length: 290, offset: 290 * index, index })} // Adjusted width for smooth scroll
      />

      {filteredData.length > 1 && (
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={onPrev}
            disabled={currentIndex === 0}
            style={[styles.arrowButton, currentIndex === 0 ? styles.disabledArrow : {}]}
          >
            <Icon name="arrow-back-ios" size={24} color={currentIndex === 0 ? '#ccc' : '#000'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            disabled={currentIndex === filteredData.length - 1}
            style={[styles.arrowButton, currentIndex === filteredData.length - 1 ? styles.disabledArrow : {}]}
          >
            <Icon name="arrow-forward-ios" size={24} color={currentIndex === filteredData.length - 1 ? '#ccc' : '#000'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
    padding: 20,
    width: 290, // Adjusted width for item
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 15,
    width: width * 0.8,
  },
  arrowButton: {
    padding: 10,
  },
  disabledArrow: {
    opacity: 0.3,
  },
});

export default StatusItems;
