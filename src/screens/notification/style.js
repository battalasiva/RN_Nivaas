import { StyleSheet } from "react-native";
import { colors } from "../../common";
import { statusBarHeight } from "../../utils/config/config";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    topBar: {
      height: 70,
      marginTop: statusBarHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    icon: {
      position: 'absolute',
      right: '3%',
      bottom: '25%',
    },
    searchBar: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      // margin: 20,
      marginHorizontal: '4%',
      marginTop: statusBarHeight,
      padding: 5,
      borderWidth: 1,
      borderColor: colors.gray2,
      borderRadius: 5,
    },
    searchInput: {
      flex: 1,
      height: 40,
      padding: 10,
      color: colors.black,
    },
    contentContainer: {
      paddingBottom: '18%',
    },
    listEmptyView:{
      alignItems:'center',
      marginTop:'70%'
    },
    noDataText:{fontSize:16,color:colors.primaryColor,fontWeight:'500'},
    clearAllContainer:{
      position: 'absolute',
      bottom:0,
      right:0,
      flexDirection:'row',
      backgroundColor:colors.white,
      width:'100%',
      justifyContent:"flex-end",
      paddingVertical:'2%',
      paddingBottom:'7%',
      paddingRight:'7%'
    },
    clearAllCon:{
      // position:'absolute',
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:colors.primaryColor,
      paddingVertical:'2%',
      paddingHorizontal:'4%',
      borderRadius:5
    },
    clearAllText:{
      fontSize:16,
      color:colors.white,
      fontWeight:'500'
    }
  });
  