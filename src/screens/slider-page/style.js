import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    image: {
      width: window.width * 1,
      height: window.height * 0.7,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
      color:colors.black,
      marginTop:'10%'
    },
    text: {
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 20,
      color:colors.black,
      marginTop:"5%"
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.primaryColor,
      paddingVertical: 10,
      marginHorizontal: 100,
      borderRadius: 5,
      alignItems: "center"
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    dot: {
      backgroundColor: 'rgba(0, 0, 0, .2)',
    },
    activeDot: {
      backgroundColor: colors.primaryColor,
    },
    terms: {
      marginTop: 20,
      fontSize: 12,
      color: 'gray',
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    termsAndConditions: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginHorizontal: '30%',
      // backgroundColor: colors.gray4,
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden'
    },
    termsAndConditionsText: {
      fontSize: 15,
      color: colors.black,
      marginBottom : 20
    },
  });