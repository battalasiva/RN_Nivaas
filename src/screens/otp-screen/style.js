import {StyleSheet} from 'react-native';
import {colors, fontFamily, window} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 20,
  },
  otpInputAndButtonCon:{
    height:'100%',
    marginVertical:'50%'
  },
  heading: {
    color: colors.black,
    fontSize: 20,
    textTransform: 'capitalize',
  },
  detail: {
    color: colors.primaryColor,
    fontSize: 12,
    textAlign: 'center',
  },
  otpCon:{
    marginHorizontal: '5%'
  },
  textContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
  backIcon: {
    alignSelf: 'flex-start',
    top: 22,
    marginRight: '10%',
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: colors.gray,
    borderRadius: 4,
    height: 38,
    width: 36,
    fontSize: 14,
    margin: 12,
    borderBottomWidth: 1.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  btnContainer: {
    justifyContent: 'center',
  },
  expectOtp: {
    color: colors.primaryColor,
    fontSize: 13,
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight:'500'
  },
  resendText:{
    alignItems:'center',
    color:colors.primaryColor,
    fontWeight:'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  black: {
    color: colors.black,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
