import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {allTexts, colors, window} from '../../common';

const ServiceCard = ({uri, name, navigation}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(allTexts.screenNames.eachServicelist,{name:name})} style={styles.eachServiceCon}>
      <View style={styles.imageBg}>
        <Image source={uri} height={50} width={50} />
      </View> 
      <Text style={styles.textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  eachServiceCon: {
    alignItems: 'center',
    marginHorizontal: '2.5%',
    marginVertical: '4%',
    height: window.height * 0.08,
    width: window.width * 0.18,
    justifyContent: 'center',
  },
  imageBg:{
    backgroundColor:colors.gray3,
    paddingVertical:'15%',
    paddingHorizontal:'15%',
    borderRadius:10,
    alignItems:'center',
  },
  textStyle:{
    color:colors.black,
    fontSize:14,
    fontWeight:'500',
    textAlign: 'center'
  }
});
