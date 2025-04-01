import { Platform, StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: colors.white,
    },
    textInputCon: {
      marginHorizontal: '5%',
      marginVertical: '5%',
    },
    inputIconCon: {
      borderColor: colors.black,
      borderWidth: 1,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: Platform.OS === 'ios' ? 10 :'',
      marginTop: '5%',
    },
    input: {
      fontSize: 16,
      marginRight: 15,
      color: colors.black,
      width: '95%',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 2,
    },
    lengthText: {
      fontSize: 13,
      color: colors.black,
    },
    error: {
      fontSize:13,
      color: colors.red3,
      marginTop: 5,
    },
    singleApartmentCon:{
      marginBottom:'3%'
    }
  });
  