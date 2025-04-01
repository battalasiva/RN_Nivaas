import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../common';
import { statusBarHeight } from '../../utils/config/config';

export const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
    zIndex: 1,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2, // Ensure the blur is on top of the content
  },
  apartmentServicesCon: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    backgroundColor: colors.primaryColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eachService: {
    // padding: 10,
    alignItems: 'center',
    justifyContent:'center'
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
  mainCardCon: {
    alignContent: 'center',
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: colors.secondaryColor,
    padding: 20,
    borderRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  flatText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
    // marginBottom: 5,
  },
  subCon:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  eachCon:{flexDirection:'row',alignItems:'center',marginTop:10},
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  noDataText: {
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.black,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: '4%',
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.black,
  },
  saveButton: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtons: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  saveButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize:15,
    fontWeight:'600'
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
  cardButtons:{
    backgroundColor: colors.primaryColor,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonsText:{color: colors.white, fontWeight: '500'},
  errorText: {
    color: colors.red3,
    fontSize: 13,
    fontWeight: '500',
  },
  radioButtonContainer:{
    alignItems:'flex-start'
  },
  selectButtonCon: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    borderRadius: 5,
    padding: 5,
    marginBottom: '5%',
    justifyContent: 'center',
  },
  eachOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  youAreText: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 17,
    marginVertical: 13,
  },
  optionText: {
    color: colors.black,
    fontSize: 16,
  },
  buttonView: {
    marginVertical: '5%',
    // justifyContent:'center',
  },
  eachOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
