import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      flex: 1,
      backgroundColor: colors.white,
    },
    apartmentServicesCon: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      padding: 10,
      position: 'absolute',
      bottom: 0,
      zIndex: 10,
      backgroundColor: colors.primaryColor,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    eachService: {
      alignItems: 'center',
    },
    boldText:{color:colors.black,fontsize:16,fontWeight:'500'},
    eachText: {
      fontSize: 14,
      color: colors.white,
    },
    eachcard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: colors.secondaryColor,
      marginVertical: '3%',
      marginHorizontal: '5%',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 2,
    },
    eachTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.black,
    },
    eachDescription: {
      fontSize: 15,
      color: colors.black,
      marginTop:'1%'
    },
    readMoreText: {
      color: colors.primaryColor,
      fontSize: 15,
      fontWeight: '500',
    },
    creationDate: {
      color: colors.gray,
    },
    reassignCon:{padding:'2%',backgroundColor:colors.primaryColor,width:'50%',alignItems:'center',borderRadius:20,marginVertical:'1%'},
    reassignText:{color:colors.white,fontsize:15,fontWeight:'bold'},
    dotsIconStyle: {position: 'absolute', top: 10, right: 10},
    animatedView: {
      position: 'absolute',
      marginTop: '10%',
      right: '5.5%',
    },
    optionButton: {
      padding: 5,
      backgroundColor: colors.gray3,
      borderRadius: 5,
      alignItems: 'left',
    },
    optionText: {
      fontSize: 14,
      color: colors.black,
      fontWeight: '500',
      marginHorizontal: '3%',
    },
    verticalLine: {
      height: 1,
      width: '100%',
      backgroundColor: colors.gray2,
    },
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryColor,
    },
    topBar: {
      marginTop: Platform.OS === 'ios' ? 60 : '',
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
    textInput: {
      borderWidth: 1,
      fontSize: 15,
      borderColor: colors.gray,
      borderRadius: 5,
      padding: 7,
      color:colors.gray,
    },
  });