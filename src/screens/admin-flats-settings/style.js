import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
      height: '100%',
      backgroundColor: colors.white,
    },
    apartmentServicesCon: {
      // marginHorizontal: '3%',
      // marginVertical: window.height * 0.03,
    },
    eachService: {
      flexDirection: 'row',
      height: 60,
      width: '100%',
      backgroundColor: colors.primaryColor,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    eachText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.white,
      marginLeft: 10,
    },
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    headerRow: {
      flexDirection: 'row',
      backgroundColor: colors.gray3,
      marginTop: '10%',
      marginHorizontal:'5%',
    },
    headerCellContainer: {
      width: '19%',
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
      marginHorizontal:'5%'
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
    checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
    },



    
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:colors.black
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color:colors.black
  },
  saveButton: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal:5,
  },
  saveButtons: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width:'45%'
  },
  saveButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: colors.black,
    textAlign: 'center',
  },
  });