import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { allTexts, colors, window } from '../../common';
import { TermsAndConditionsModal } from '../../components';
import { styles } from './style';
import { PreferencesKeys } from '../../utils/preferences/preferencesKeys';
import { setSeenStatus } from '../../utils/preferences/localStorage';

const slides = [
  {
    key: '1',
    title: 'Welcome to Nivaas',
    text: 'Effortlessly manage apartment living with Nivaas, your all-in-one solution for streamlined community and visitor management',
    image: require('../../utils/assets/images/VisitorOne.png'),
  },
  {
    key: '2',
    title: 'Maintenance Management',
    text: 'Stay Involved keeps you connected and engaged with your community through seamless event tracking, updates, and participation tools.',
    image: require('../../utils/assets/images/Money.jpg'), 
  },
  {
    key: '3',
    title: 'Stay Involved',
    text: 'Stay close to your community with the Nivaas App',
    image: require('../../utils/assets/images/StayInvolved.jpg'), 
  },
];

const SlidesPage = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const termsAndConditionsModal = () => {
    setModalVisible(prevState => !prevState);
  };
  const handleNavigation = () =>{
    setSeenStatus(PreferencesKeys.hasSeenSlides,'true');
    navigation.navigate(allTexts.screenNames.signin);
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={{height:'60%'}}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={{height:'50%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          {item.key === slides[slides.length - 1].key && (
            <>
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleNavigation}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>              
              <Text style={styles.terms}>By clicking Get Started, you agree to the</Text>
              <TouchableOpacity onPress={termsAndConditionsModal} style={styles.termsAndConditions}>
                <Text style={[styles.termsAndConditionsText, { textDecorationLine: 'underline' }]}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1,backgroundColor : colors.white}}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        showNextButton={true}
        showDoneButton={false}
      />
      <TermsAndConditionsModal 
        isVisible={isModalVisible} 
        onClose={termsAndConditionsModal} 
      />
    </View>
  );
};

export default  SlidesPage;