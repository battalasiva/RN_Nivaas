import React, {useRef} from 'react';
import {View, Image, TouchableOpacity, PanResponder, Animated, StyleSheet, Dimensions} from 'react-native';
import { allTexts, colors } from '../../common';

const FaqButton = ({navigation,faq}) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false})(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        const finalX = Math.max(0, Math.min(gestureState.moveX, windowWidth - 70)); 
        const finalY = Math.max(0, Math.min(gestureState.moveY, windowHeight - 70));

        Animated.spring(pan, {
          toValue: {x: finalX - 35, y: finalY - 35}, 
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.floatingButtonContainer,
        {
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
      ]}
      {...panResponder.panHandlers}>
      <TouchableOpacity
        onPress={() => navigation.navigate(allTexts.screenNames.faqScreen,{faq:faq})}
        style={styles.button}>
        <Image
          source={require('../../utils/assets/images/faq.png')}
          style={styles.floatingImage}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 60, 
    left: 20,
  },
  button: {
    backgroundColor:colors.white,
    borderRadius: 50,
    padding: 10,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  floatingImage: {
    width: 50,
    height: 50,
  },
});
export default FaqButton;
