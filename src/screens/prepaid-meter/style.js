import { StyleSheet } from "react-native";
import { colors} from "../../common";
import { statusBarHeight } from "../../utils/config/config";
import { Platform } from "react-native";
export const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  topBar:{
    height:  70,
    marginTop: Platform.OS === 'ios' ? '' : statusBarHeight
},
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '5%',
  },
  noDataText: {
    textAlign: 'center',
    // marginTop: 20,
    fontSize: 16,
    color: colors.red3,
    fontWeight:'500'
  },
  dropDownView: {
    width: '100%',
    paddingHorizontal: '6%',
  },
  container2: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.black,
    fontSize:15
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
    marginTop:'5%',
    marginHorizontal:'7%'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor:colors.gray4,
    borderRadius:5,
    marginVertical:5,
  },
  itemText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '500',
  },
  buttonCon: {
    marginHorizontal: '6%',
  },
  updateButton: {
    marginTop: '5%',
  },
  modalOverlay:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    marginBottom: '70%',
    marginTop:'65%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop : Platform.OS === 'ios' ? 40 : ''
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  metersDetailsText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 5,
  },
  updateModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor:colors.white,
    padding: '5%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Platform.OS === 'ios' ? 10 : '',
    paddingRight: '15%',
    paddingLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    fontSize: 14,
    color: colors.black,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginTop:20,
    marginBottom: 5,
    fontWeight:'500'
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    fontSize:15,
    borderRadius: 5,
  },
  errorText:{
    color:colors.red3,
    fontSize:14
  }
});
  