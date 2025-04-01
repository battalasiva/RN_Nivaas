import { Platform, StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      padding: '5%',
      backgroundColor: colors.white,
      marginTop: Platform.OS === 'ios' ? 60 : '',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.black,
    },
    clearButton: {
      fontSize: 16,
      color: colors.black,
      fontWeight: '500',
    },
    filterContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    leftPanel: {
      width: '35%', 
      paddingRight: '2%',
      marginTop:'1.5%'
    },
    rightPanel: {
      width: '65%',
      paddingLeft: '2%',
    },
    categoryTextStyle:{color:colors.black,fontSize:15,fontWeight:'500'},
    categoryItem: {
      fontSize: 16,
      padding: 10,
      color: colors.black,
      fontWeight: '500',
    },
    selectedCategory: {
      fontSize: 16,
      padding: 10,
      backgroundColor: colors.gray2,
      borderRadius: 5,  
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: '5%',
    },
    selectedItemsText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.black,
    },
  });