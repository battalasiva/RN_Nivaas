import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: window.height,
      width: window.width,
      backgroundColor: colors.white,
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: '5%',
      marginHorizontal: '5%',
      backgroundColor: colors.gray3,
      borderRadius: 5,
      padding: 5,
    },
    tabButton: {
      flex: 1,
      paddingVertical: '2%',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: colors.gray3,
    },
    selectedTabButton: {
      backgroundColor: colors.primaryColor,
    },
    tabText: {
      color: colors.black,
      fontWeight: 'bold',
    },
    selectedTabText: {
      color: colors.white,
    },
    servicesCon: {
      marginHorizontal: window.width * 0.04,
    },
    eachServiceCon: {
        alignItems: 'center',
        marginHorizontal: '2.5%',
        marginVertical: '4%',
        height: window.height * 0.08,
        width: window.width * 0.18,
        justifyContent: 'center',
      },
      imageBg:{
        backgroundColor:colors.gray3,
        paddingVertical:'15%',
        paddingHorizontal:'15%',
        borderRadius:10,
        alignItems:'center',
      },
      textStyle:{
        color:colors.black,
        fontSize:14,
        fontWeight:'500',
        textAlign: 'center'
      },
  });
  