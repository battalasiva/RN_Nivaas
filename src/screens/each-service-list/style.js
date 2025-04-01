import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      height:'100%'
    },
    flatListContainer: {
      marginHorizontal: '6%',
    },
    serviceItem: {
      backgroundColor: colors.secondaryColor,
      padding: '5%',
      marginVertical: '2%',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      width: '100%',
    },
    serviceName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.black,
    },
    mobile: {
      fontSize: 16,
      color: colors.black,
      fontWeight: '500',
      marginLeft:5
    },
    optionsContainer: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: colors.gray2,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 4,
      zIndex: 1,
    },
    optionButton: {
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    optionText: {
      fontSize: 15,
      color: colors.black,
      fontWeight: 'bold',
    },
    addButton: {
      marginHorizontal: window.width * 0.04,
      position: 'absolute',
      bottom: 50,
      right: 20,
      backgroundColor: colors.primaryColor,
      width: 60,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.8, 
      shadowRadius: 2, 
    },
  });