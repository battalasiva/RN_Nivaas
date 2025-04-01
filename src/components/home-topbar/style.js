import {Platform, StyleSheet} from 'react-native';
import {colors, window} from '../../common';

export const styles = StyleSheet.create({
  marginHeader: {
    marginTop: Platform.OS === 'ios' ? 'auto' : '5%',
    backgroundColor: colors.secondaryColor,
  },
  headerCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: window.width * 0.08,
    paddingVertical: window.height * 0.035,
    backgroundColor: colors.primaryColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  username: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  iconsCon: {
    flexDirection: 'row',
  },
  icons: {
    color: colors.white,
    marginLeft: 10,
  },
  manageFlatsConAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryColor,
    paddingHorizontal: window.width * 0.06,
    elevation: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  manageFlatsConAddText: {
    fontSize: 16,
    // marginLeft: 7,
    color: colors.black,
    fontWeight: '500',
  },
  nameIconCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  apartmentText: {fontSize: 16, fontWeight: '500', color: colors.black},
  switchModalCon: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  buttonContainer: {
    marginTop: '5%',
  },
  switchModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
