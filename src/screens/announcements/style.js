import { StyleSheet } from "react-native";
import { colors, window } from "../../common";
 
export const styles = StyleSheet.create({
    mainCon: {
        height:'100%',
     
      backgroundColor: colors.white,
      borderRadius: 5,
      marginBottom: '30%',
    },
    bodyCon:{
       width: '100%',
      padding: 10,
    },
    announcementTextCon: {
      alignItems: 'center',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    announcementText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.black,
    },
    eachcard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 5,
      elevation: 2,
      backgroundColor: colors.secondaryColor,
      marginVertical: '2%',
      marginHorizontal:'4%',
      paddingVertical: 10,  
      paddingHorizontal: 10,
    },
    eachTitle: {
      color: colors.black,
      fontSize: 16,
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryColor,
    },
    topBar:{
      marginTop: Platform.OS === 'ios' ? 60: 'auto',
      height: 70,
    },
    container: {
      backgroundColor: colors.white,
      height: '100%',
      width: '100%',
    },
    CrossIcon: {
      position: 'absolute',
      top: 25,
      left: 10,
    },
    messageText: {
      marginTop: '5%',
      marginHorizontal: '5%',
      color: colors.black,
      fontSize: 16,
    },
    titleText: {
      marginTop: '5%',
      marginHorizontal: '5%',
      color: colors.black,
      fontSize: 16,
      fontWeight: '500',
    },
    input: {
      marginTop: '5%',
      marginHorizontal: '5%',
      borderRadius: 5,
      fontSize: 16,
      color: colors.black,
      borderColor: colors.black,
      borderWidth: 1,
      padding: 10,
    },
    noDataText: {
      alignItems: 'center',
    },
  });