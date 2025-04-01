import { Platform, StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      backgroundColor: colors.white,
      height: '100%',
    },
    container2: {
      marginHorizontal: '5%',
      marginBottom:'10%'
    },
    modalContent: {
      paddingVertical: '10%',
      padding: '5%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: '5%',
      backgroundColor: colors.gray3,
      paddingHorizontal: '5%',
      borderRadius: 5,
      marginTop:'5%'
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      color: colors.black,
      fontSize: 15,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Platform.OS === 'ios' ? 10 : null,
      paddingRight: '17%',
      paddingLeft: '10%',
      backgroundColor:colors.secondaryColor,
      marginTop:'2%',
      borderRadius:5,
      alignItems:'center'
    },
    cell: {
      color: colors.black,
      fontSize: 15,
      fontWeight:'600'
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.gray,
      padding: 10,
      borderRadius: 5,
    },
    updateButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    noDataText:{
      fontSize:16,
      marginTop:'5%',
      color:colors.red3,
      fontWeight:'500',
      textAlign:'center',
    }
  });