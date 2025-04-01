import React from 'react';
import {View,Image, StyleSheet, Platform} from 'react-native';
import Swiper from 'react-native-swiper';
import { colors, window } from '../../common';
import{responsiveScreenWidth} from 'react-native-responsive-dimensions';

const carouselItems = [
  {
    key: 1,
    image: require('../../utils/assets/images/ImageOne.jpg'),
  },
  {
    key: 2,
    image: require('../../utils/assets/images/ImageTwo.png'),
  },
  {
    key: 3,
    image: require('../../utils/assets/images/ImageSlider.png'),
  },
];

const ImageSlider = () => {
  return (
      <Swiper
        style={styles.wrapper}
        autoplay
        autoplayTimeout={3}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}>
        {carouselItems.map(item => (
          <View key={item.key} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        ))}
      </Swiper>
  );
};
const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  image: {
    width: Platform.OS === 'ios' ? '100%' : '100%',
    height: 180,
    borderRadius:10,
    resizeMode:'cover'
  },
  dot: {
    backgroundColor:colors.white,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
  activeDot: {
    backgroundColor:colors.primaryColor,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default ImageSlider;
