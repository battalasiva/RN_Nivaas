import {StyleSheet} from 'react-native';
import {colors, fontFamily, window} from '../../common';

export const styles = StyleSheet.create({
  wrapper: {
    // marginVertical: 5,
    // borderBottomWidth: 1,
    // marginBottom: 10,
  },
  title: {
    // fontFamily: fontFamily.popinMedium,
    color: colors.darkBrown,
    // textTransform: 'capitalize',
  },
  inputText: {
    paddingVertical: 0,
    margin: 0,
    paddingLeft: window.width/4,
    borderColor: colors.gray,
    fontSize: 17,
    color: colors.black,
    // fontFamily: fontFamily.popinRegular,
    width: '100%',
  },
  error: {
    color: colors.primaryColor,
    textTransform: 'capitalize',
    // fontFamily: fontFamily.popinRegular,
    fontSize: 12,
    marginTop: -8,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 3,
    color:colors.primaryColor
  },
  imgContainer: {
    width: 57,
    paddingVertical: 5,
    height: '95%',
    borderRadius: 5,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  code: {
    paddingLeft: 2,
    color: colors.black,
    // fontFamily: fontFamily.popinLight,
    fontSize: 15,
  },
});
