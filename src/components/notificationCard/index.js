/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { colors } from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const NotificationCard = ({ title,message }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.contatainer}>
      <View style={styles.cardView}>
        <View style={styles.imgView}>
          <Ionicons
            name="notifications"
            size={30}
            style={styles.icons}
          />
        </View>
        <View style={{ width: '90%', marginLeft: '5%' }}>
          <Text style={{
            color: colors.black,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>{title || 'Nivaas'}</Text>
          <Text style={{...styles.description, color: isDarkMode ? 'black' : 'black'}}>{message || 'Due Amount'} </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contatainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.gray2,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  icons:{
    color:colors.white,
},
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgView: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    backgroundColor:colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  type: { 
    color: colors.primaryColor, 
    textTransform: 'capitalize',
    color: 'white'
  },
  typeView: {
    width: 60,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    borderRadius: 10
  },
  description: {
    fontSize: 16,
    marginRight: '15%'
  },
  date: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: '17%',
  },
});
