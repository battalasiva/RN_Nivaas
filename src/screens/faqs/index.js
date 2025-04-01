import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DefaultTopBarOne } from '../../common/customFunctions';
import FaqComp from '../../components/faq';

const FaqScreen = ({navigation,route}) => {
  const {faq} = route.params || {}  
  return (
    <View>
      {DefaultTopBarOne(navigation, 0, "Faq's", true)}
      <FaqComp faq={faq}/>
    </View>
  )
}

export default FaqScreen;

const styles = StyleSheet.create({})