import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    datePickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '4%',
      marginTop: '5%',
    },
    dropdownContainer: {
      marginHorizontal: '5%',
      marginVertical: '2%',
    },
    selectAllContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '1%', 
      marginLeft: '76%',
      height: 'auto',
    },
    selectAllText: {
      color: colors.black,
      fontWeight: '500',
    },
    boldText:{fontSize:16,fontWeight:'500',color:colors.black,marginLeft:5},
    semiBoldText:{color:colors.black,textAlign:'center',fontSize:15,fontWeight:'500'},
    textCon: {
      fontSize: 17,
      fontWeight: '500',
      color: colors.black,
      marginTop: '1%',
      marginHorizontal:'1%'
    },
    statusCon:{
      flexDirection:'row',
      // marginHorizontal:'6%',
      // marginBottom:'5%'
    },
    statusText:{
      color:colors.black,
      fontSize:16,
      fontWeight:'500'
    },
    unpaidText:{
      color:colors.red3,
      fontSize:16,
      fontWeight:'500'
    },
    paidText:{
      color:colors.green5,
      fontSize:16,
      fontWeight:'500'
    },
    container: {
      marginHorizontal: '5%',
      marginBottom: '5%',
    },
    userSocietyDuecontainer:{
      marginHorizontal: '5%',
      marginVertical: '5%',
    },
    EachDueCon:{alignContent:'center',width:'100%',backgroundColor:colors.secondaryColor,padding:20,borderRadius:5,elevation:3,marginVertical:10},
    meterName:{fontSize:19,fontWeight:'500',color:colors.black,marginBottom:5},
    eachDueText:{fontSize:17,fontWeight:'500',color:colors.black,marginBottom:5},
    userDueDataCon:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: '2%',
      marginVertical: '5%',
    },
    header: {
      height:40,
      alignItems:'center',
      flexDirection: 'row',
      backgroundColor: colors.gray4,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    verticalLine: {
      width: 1,
      height: '100%',
      backgroundColor: colors.gray2,
    },
    eachHeader: {
      width: '23%',
      height: 40,
      paddingVertical: 10,
      marginHorizontal: '1%',
      alignItems: 'center',
      overflow: 'hidden',
    },
    headercon:{
      width:'24.5%',
      justifyContent:'center',
      marginHorizontal:1,
      overflow:'hidden',
      height:40
    },
    headerCell: {
      // flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
    },
    selectStyle: {
      // flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.black,
      // marginRight: 5,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.gray2,
    },
    cell: {
      color: colors.black,
      paddingLeft:5
    },
    checkbox: {
      height:40,
      backgroundColor:'red'
    },
    checkboxContainer: {
      margin: 0,
      padding: 0,
    },
    noDataText: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color:colors.red3,
      fontWeight:'500'
    },
    button: {
      marginTop: 20,
    },
    authurizationCon:{
      position: 'absolute',
      bottom:0,
      right:'5%',
      borderRadius:5,
      padding:10,
      flexDirection:'row',
      backgroundColor:colors.white,
      width:'100%',
      justifyContent:"flex-end"
    }
  });
  