import {StyleSheet} from 'react-native';
import {colors} from '../../common';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
  },
  nonEditableContainer: {
    marginVertical: 20,
  },
  label: {
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 3,
    marginTop: '5%',
  },
  nonEditableText: {
    padding: 10,
    borderRadius: 5,
    color: colors.black,
    borderColor: colors.gray2,
    borderWidth: 1,
  },
  boldText:{color:colors.black,fontsize:16,fontWeight:'500'},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 5,
    backgroundColor: colors.gray3,
    borderRadius: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedTabButton: {
    backgroundColor: colors.primaryColor,
  },
  assignToCon: {
    marginVertical: '3%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  selectedTabText: {
    color: colors.white,
  },
  textInput: {
    borderWidth: 1,
    fontSize: 15,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
    color:colors.black
  },
});
