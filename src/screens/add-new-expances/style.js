import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.gray2,
      borderRadius: 5,
      padding: 10,
      backgroundColor: colors.gray4,
      color: colors.black,
      marginTop: '5%',
      fontSize: 16,
    },
    dateDropDownCon: {
      flexDirection: 'row',
      textAlign: 'center',
      justifyContent: 'space-between',
      marginHorizontal: '5%',
      marginTop: '5%',
    },
    dateModalIconCon: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.gray2,
      backgroundColor: colors.gray4,
      borderRadius: 5,
    },
    dateInput: {
      borderRadius: 5,
      padding: 10,
      color: colors.black,
      width:'80%',
      fontSize:15
    },
    selectDropdown: {
      height: 40,
      width: '100%',
    },
    textFieldsCon: {
      marginHorizontal: '5%',
    },
    button: {
      marginVertical: '5%',
    },
    errorText: {
      color: colors.red3,
      fontSize: 15,
    },
    addButton:{
      flexDirection:'row',
      marginHorizontal:'5%',
      marginVertical:'5%'
    }
  });
  