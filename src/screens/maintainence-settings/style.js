import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../common';
import { statusBarHeight } from '../../utils/config/config';

export const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: '100%',
  },
  topBar:{
    height:  70,
    marginTop: Platform.OS === 'ios' ? 0 : statusBarHeight
},
  flatlistCon: {
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
  buttonCon: {
    marginHorizontal: '4%',
    marginVertical: '5%',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.red3,
    fontWeight: '500',
  },
  selectDropdown: {
    height: 40,
    width: '100%',
  },
  errorText: {
    color: colors.red3,
    fontSize: 12,
    marginLeft:5
  },
  checkboxContainer: {
    marginHorizontal: '2%',
  },
  textDropDownCon: {
    flexDirection: 'row',
    marginVertical: '3%',
    marginTop:'5%',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    // alignItems:'center'
  },
  textInputCon: {
    // width: '45%',
    borderWidth: 1,
    borderColor: colors.gray3,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.gray4,
  },
  input: {
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    width: '100%',
    paddingLeft:10
  },
  dropdownButtonStyle: {
    height: 50,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.white,
    marginHorizontal: '15%',
  },
  dropdownMenuStyle: {
    backgroundColor: colors.gray3,
    borderRadius: 5,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.red3,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  validation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:"20%",
    marginLeft:"7%",
    alignItems:'center'
  },
 
});

