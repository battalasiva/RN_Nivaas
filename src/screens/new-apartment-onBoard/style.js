import {Platform, StyleSheet} from 'react-native';
import {colors, window} from '../../common';

export const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: window.height,
  },
  container: {
    padding: 20,
  },
  eachFieledCon:{
    marginTop:window.height*0.03,
  },
  DropdownFieledCon:{
    marginTop: Platform.OS === 'ios' ? '3%' : window.height*0.005,
  },
  fieldName:{
    color:colors.black,
    fontSize:16,
    marginVertical:5,
    marginHorizontal:3
  },
  errorText: {
    color: colors.red3,
    marginBottom: 5,
  },
  container: {
    backgroundColor: colors.white,
    padding: 16,
    marginHorizontal:window.width*0.05
  },
  input: {
    height: 50,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    // marginBottom: 10,
    fontSize:16
  },
  inputErr:{
    height: 50,
    borderColor: colors.red3,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    // marginBottom: 10,
    fontSize:16
  },
  dropdownContainer: {
    position: 'relative',
  },
  radioButtonContainer: {
    marginBottom: 20,
},
  dropdown: {
    height: 40,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:colors.black
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  radioButtonCon:{
    marginVertical:'2%'
  },
  buttonView:{
    flexDirection:'row',
    marginVertical:13,
  },
  optionText:{
    color:colors.black,
    fontSize:16
},
radioButton: {
  marginRight: 20,
},
});
