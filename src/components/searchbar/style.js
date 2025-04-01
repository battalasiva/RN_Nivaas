import {StyleSheet} from 'react-native';
import {colors, fontFamily} from '../../common';
export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 10, 
    borderWidth:1,
  },

  field: {
    color: colors.black,
    // fontFamily: fontFamily.popinRegular,
    fontSize: 16,
    height: 40,
    borderRadius:20,
    textAlign:'center',
    backgroundColor:'#F6F6F6',
  },
  iconContainer: {
    flexDirection: 'row',
  },
});
