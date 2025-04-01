/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { style } from '../profilecomp/styles';
import { colors } from 'react-native-elements';

export const BackHeaderNew = ({
  onPress,
  txt,
  isPlus,
  onPlusPress,
}) => {
  return (
    <View style={styles.header}>
        <TouchableOpacity style={styles.backheader}  onPress={onPress}>
          {/* <Fontisto
            name="arrow-left"
           color={'black'}
            size={17}
          /> */}
          <AntDesign name='arrowleft' size={25} color={colors.black}/>
        </TouchableOpacity>
        {txt ? (
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginHorizontal: 10,
              color:'black',
            }}>
            {txt}
          </Text>
        ) : (
          <></>
        )}

      {isPlus && (
        <TouchableOpacity onPress={onPlusPress}>
          <AntDesign
            name="plus"
            size={24}
            color={'black'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
