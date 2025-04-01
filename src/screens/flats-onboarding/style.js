import { Platform, StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    topBar:{
      marginTop: Platform.OS === 'ios' ? 60: null,
      height: 70,
    },
    container: {
      paddingHorizontal: '6%',
      justifyContent: 'space-around',
    },
    fieldsCon: {
      marginTop: '8%',
      marginHorizontal:'5%'
    },
    dropdown: {
      width: '45%',
      marginTop:3
    },
    inputContainerOne: {
      width: '45%',
      // marginTop: 25,
      height:50,
    },
    inputContainer: {
      marginTop: 10,
    },
    inputOne:{
      borderWidth: 1,
      borderColor: colors.gray,
      padding: 8,
      borderRadius: 5,
      height:48
    },
    label: {
      fontSize: 16,
      color: colors.black,
      marginBottom: 10,
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: colors.gray,
      padding: 10,
      borderRadius: 5,
      marginTop: 15,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    summaryContainer: {
      marginTop: 20,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.black,
    },
    flatDetailsContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    summaryText: {
      fontSize: 14,
      color: colors.black,
    },
    toggleCon:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginBottom:20,
      marginTop:'3%'
    },
    toggleText:{
      fontSize:14,
      fontWeight:'500',
      color:colors.black
    },
    inactiveText:{
      color:colors.gray,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      width: '100%',
      height:'100%',
      backgroundColor:colors.white,
    },

    editButtonsCon:{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    headerRow: {
      flexDirection: 'row',
      backgroundColor: colors.gray3,
      marginTop: '10%',
      marginHorizontal:'5%',
    },
    headerCellContainer: {
      width: '33%',
      paddingVertical: 15,
      marginHorizontal: 1,
      overflow: 'hidden',
      justifyContent:'center',
      alignItems: 'center',
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginHorizontal:'5%',
    },
    cell: {
      textAlign: 'center',
      color: colors.black,
    },
    verticalLine: {
      width: 1,
      height: '100%',
      backgroundColor: colors.gray2,
    },
  });