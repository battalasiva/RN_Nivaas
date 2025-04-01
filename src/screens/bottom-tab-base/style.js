import {View, StyleSheet, Platform} from 'react-native';
import {colors} from '../../common';

export const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 5,
  },
  mainContainer: {
    // borderWidth:10
  },
  focusedContainer: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 20,
  },
  imageNormal: {
    color: colors.gray,
    marginBottom: 5,
  },
  imageFocused: {
    color: colors.primaryColor,
    marginBottom: 5,
  },
  iconTextCon: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? '10%' : ' ',
  },
  textNormal: {
    color: colors.gray,
  },
  textFocused: {
    color: colors.primaryColor,
  },
  imageContainer: {
    elevation: 2,
    shadowColor: colors.black,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '100%',
  },
  refreshText: {color: colors.white, fontsize: 20, fontWeight: 'bold',letterSpacing:1},
  refreshView: {
    alignItems: 'center',
    width: '100%',
    padding: '5%',
    backgroundColor: colors.primaryColor,
    borderRadius: 30,
  },
});
