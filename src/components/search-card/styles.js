import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginVertical: 10,
    // marginRight: 7,
    // marginBottom: 7,
    borderRadius: 15,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  imgContainer: {
    width: 80,
    height: 80,
    borderWidth: 0,
  },
  img: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 15,
  },
  allTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  nameText: {
    // fontFamily: fontFamily.popinBold,
    color: colors.black,
    fontSize: 12,
  },
  followText: {
    // fontFamily: fontFamily.popinMedium,
    color: colors.green2,
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    left: -4,
  },
  locationText: {
    fontSize: 10,
    color: colors.black,
    // fontFamily: fontFamily.popinMedium,
    flex: 1,
  },
});
