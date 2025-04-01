import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { allTexts, colors, window } from '../../common';

const IconNameCard = ({navigation,Icon,iconName,screenName,title}) => {
  return (
   <View>
     <Pressable
      onPress={() => navigation.navigate(screenName)}>
      <View style={styles.eachService}>
        <Icon
          name={iconName}
          size={25}
          color={colors.primaryColor}
        />
        <Text style={styles.eachText}>{title}</Text>
      </View>
    </Pressable>
   </View>
  );
};

export default IconNameCard;

const styles = StyleSheet.create({
    eachService:{
        flexDirection:'row',
        width:'93%',
        backgroundColor:colors.gray3,
        borderColor:colors.primaryColor,
        borderWidth:1,
        padding:10,
        borderRadius:5,
        marginHorizontal:window.width*0.03,
        marginVertical:'5%',
        alignItems:'center'
    },
    eachText:{
        fontSize:16,
        fontWeight:'500',
        color:colors.black,
        marginLeft:10
    }
});
