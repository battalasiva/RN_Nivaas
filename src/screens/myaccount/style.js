import {StyleSheet} from 'react-native';
import {colors, window} from '../../common';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profie: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: window.height * 0.02,
    marginHorizontal: window.width * 0.04,
  },
  profieText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  apartmentNameText:{
    fontSize: 17,
    color: colors.black,
    marginLeft: '5%'
  },
  statusactiveText: {
    color: colors.green5,
    fontsize: 17,
    fontWeight: '500',
  },
  statusPendingText: {
    color: colors.red3,
    fontsize: 17,
    fontWeight: '500',
  },
  nivaasID: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    padding: 5,
  },
  manageFlatsCon: {
    marginVertical: window.height * 0.01,
    paddingHorizontal: window.width * 0.12,
    paddingTop: '3%',
    borderTopColor: colors.gray3,
    borderTopWidth: 7,
  },
  manageFlatsConText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  manageFlatsSubCon: {
    marginTop: 10,
  },
  manageFlatsConHome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  flatItemCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  flatText: {
    fontSize: 16,
    marginLeft: 18,
    color: colors.black,
  },
  apartmentText: {
    fontSize: 16,
    marginLeft: 13,
    color: colors.black,
  },
  apartmentModalText: {
    fontSize: 17,
    color: colors.black,
    width:'55%',
  },
  flatModalCon:{
    width:'67%',
    flexDirection:'row',
    overflow:'hidden'
  },
  flatModalText:{
    fontSize: 17,
    color: colors.black,
  },
  renderCon: {
    flexDirection: 'row',
    marginLeft:'4%',
    marginTop:2
  },
  statusactiveText: {
    color: colors.green5,
    fontsize: 17,
    fontWeight: '500',
  },
  statusPendingText: {
    color: colors.red3,
    fontsize: 17,
    fontWeight: '500',
  },
  manageFlatsConAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  manageFlatsConAddText: {
    fontSize: 16,
    marginLeft: 13,
    color: colors.black,
  },
  setting: {
    marginVertical: window.height * 0.01,
    paddingVertical:10,
    paddingHorizontal: window.width * 0.13,
    borderTopColor: colors.gray3,
    borderTopWidth: 7,
    borderBottomColor: colors.gray3,
    borderBottomWidth: 7,
  },
  settingHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    // marginVertical: 10,
  },
  settingsubConOne: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  generalSettingsOptionText: {
    fontSize: 16,
    marginLeft: 15,
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nivaas: {
    alignItems: 'center',
  },
  nivaasLogo:{
    height:55,
    width:'50%'
  },
  termsAndConditions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: '30%',
    backgroundColor:colors.gray4,
    padding:5,
    borderRadius:5,
    overflow:'hidden'
  },
  termsAndConditionsText: {
    fontSize: 15,
    color: colors.black,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  SwitchmodalContent: {
    width: '100%',
    // maxHeight: height * 0.8,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  modalCloseIcon: {
    alignSelf: 'flex-end',
  },
  VersionCon:{
    marginVertical:'1%',
    alignItems:'center'
  },
  VersionText:{
    fontsize:16,
    fontWeight:'500',
    color:colors.black
  }
});
