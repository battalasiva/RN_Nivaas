import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../common';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FaqComp = ({faq}) => {
  // const faqData = [
  //   {
  //     id: '1',
  //     question: 'How to book a service on Nivaas?',
  //     answer: 'Just click on the service required by you, see the prices and fill some basic contact details to schedule the service.',
  //   },
  //   {
  //     id: '2',
  //     question: 'Who is going to fulfill the service?',
  //     answer: 'We will assign a Nivaas Partner to complete your service at your preferred time slot.',
  //   },
  //   {
  //     id: '3',
  //     question: 'Who is a Nivaas Partner?',
  //     answer: 'A Nivaas Partner is a trusted service provider assigned to your selected task.',
  //   },
  //   {
  //     id: '4',
  //     question: 'What services are available on Nivaas?',
  //     answer: 'You can find a variety of services including cleaning, maintenance, and home rentals.',
  //   },
  // ];

  const [openItemId, setOpenItemId] = useState(null);
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleAnswer = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); 
    const isOpening = openItemId !== id;
    Animated.timing(rotation, {
      toValue: isOpening ? 1 : 0, 
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setOpenItemId((prevId) => (prevId === id ? null : id));
  };

  const rotateIcon = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={faq}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.faqItem}>
            <Pressable style={styles.questionRow} onPress={() => toggleAnswer(item.id)}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Animated.View style={{ transform: [{ rotate: openItemId === item.id ? rotateIcon : '0deg' }] }}>
                <AntDesign name="plus" size={24} color={colors.black} />
              </Animated.View>
            </Pressable>
            {openItemId === item.id && (
              <Text style={styles.answerText}>{item.answer}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginVertical: '5%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '5%',
    color: colors.black,
  },
  faqItem: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  answerText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.black,
  },
});

export default FaqComp;