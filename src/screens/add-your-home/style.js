import {StyleSheet} from 'react-native';
import {colors, window} from '../../common';

export const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    marginVertical: 20,
  },
  eachDropdownCon: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: '10%',
  },
  apartmentsErrorHandlerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 2,
  },
  selectButtonCon: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    borderRadius: 5,
    padding: 5,
    marginVertical: '5%',
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
  errorMessage: {
    fontSize: 13,
    color: colors.red3,
  },
  buttonText: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '500',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryColor,
  },
});