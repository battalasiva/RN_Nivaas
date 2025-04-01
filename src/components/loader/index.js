import React from 'react';
import {View} from 'react-native';
import {colors} from './../../common/index';
import {styles} from './styles';
import {
  // BallIndicator,
  // BarIndicator,
  // DotIndicator,
  SkypeIndicator,
  // UIActivityIndicator,
  // MaterialIndicator,
  // PacmanIndicator,
  // PulseIndicator,
  // WaveIndicator,
} from 'react-native-indicators';

export const Loader = ({color, size, dynmicStyle, marginTop}) => {
  return (
    <View style={[styles.container, dynmicStyle ,{marginTop: marginTop ? marginTop : "100%"}]}>
      {/* <ActivityIndicator size={size || 'large'} color={color || colors.primaryColor} /> */}
      <SkypeIndicator size={50} color={colors.primaryColor}/>
    </View>
  );
};