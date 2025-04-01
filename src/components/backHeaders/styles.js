import {StyleSheet} from 'react-native';
import {colors} from '../../common';
export const styles = StyleSheet.create({
  header: {
    // borderWidth:2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    },
    backheader: {
      // backgroundColor: colors.primaryColor,
      borderRadius: 5,
      paddingVertical:8,
    },
  iconContainer: {
    padding:2,
    borderRadius: 100,
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor:colors.primaryColor,
  },
  notificationText:{
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 100,
    color:'black',
    justifyContent:'center',     
  },
});
