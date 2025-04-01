import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../common';

const DefaultApartmentComp = ({selectedApartment}) => {
  return (
    <View>
        <View style={styles.manageFlatsConAdd}>
          <MaterialIcons
            name="apartment"
            size={25}
            color={colors.primaryColor}
          />
          <Text numberOfLines={1} style={styles.manageFlatsConAddText}>
            {selectedApartment?.name}
          </Text>
        </View>
    </View>
  );
};

export default DefaultApartmentComp;

const styles = StyleSheet.create({
  manageFlatsConAdd: {
    width:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryColor,
    elevation: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  manageFlatsConAddText: {
    fontSize: 16,
    // marginLeft: 7,
    color: colors.black,
    fontWeight: '500',
    padding: 10,
  },
});
