import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
        height: '100%',
        backgroundColor: colors.white,
      },
      datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: '4%',
        marginTop: '5%',
      },
      addButton: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal: '5%',
        marginVertical: '5%',
      },
      currentbalCon:{
        backgroundColor: colors.secondaryColor,
        marginTop: '5%',
        marginHorizontal: '5%',
        paddingHorizontal: '5%',
        paddingBottom: '2%',
        borderRadius: 5,
      },
      verticalLine: {
        width: 1.5,
        backgroundColor: colors.white,
      },
      rowFront: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        alignItems: 'center',
        // justifyContent:'space-evenly',
        // paddingHorizontal: '10%',
        marginHorizontal: '2%',
        borderColor:colors.gray3,
        borderWidth:1,
        padding:'2%',
        borderRadius:5,
      },
      imageCon:{backgroundColor:colors.red3,borderRadius:5},
      expenceDataCon:{marginLeft:'5%',width:'80%'},
      eachtextCon:{flexDirection:'row',justifyContent:'space-between'},
      dataItemText:{color:colors.black,fontSize:16,fontWeight:'bold'},
      rupeeIconView:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
      SwipeText:{
        marginHorizontal:'5%',
        // marginTop:'5%',
      },
      sectionHeading:{
        marginVertical: '5%',
        marginLeft: '43%',
        color: colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine:'underline'
      },
      header: {
        flexDirection: 'row',
        backgroundColor: colors.gray3,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        marginHorizontal: '2%',
      },
      NoexpanceTextCon:{
        alignItems:'center'
      },
      NoexpanceText:{
        margin:'10%',
        fontSize:15,
        fontWeight:'500',
        color:colors.red3
      },
      DebitCreditCon:{marginHorizontal:'5%',marginVertical:'5%',borderRadius:5,marginBottom:'16%'},
      downloadButton:{
        marginHorizontal:'5%',
        marginVertical:'5%',
        flexDirection:'row',
        justifyContent:'center'
      },
      clickHereText:{
        fontWeight:'bold',
        color:colors.primaryColor,
        textDecorationLine:'underline'
      },
      downloadText:{
        marginLeft:5,
        color:colors.black
      },
      eachHeader: {
        width: '31%',
        height: 40,
        paddingVertical: 10,
        marginHorizontal: '1%',
        alignItems: 'center',
        overflow: 'hidden',
      },
      verticalLine: {
        width: 1.5,
        backgroundColor: colors.white,
      },
      headerCell: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
      },
      dataCell: {
        flex: 1,
        alignItems: 'flex-start',
        color: colors.black,
      },
      rowBack: {
        alignItems: 'center',
        // backgroundColor: colors.red3,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: '6%',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: '8%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: '5%',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
      },
      input: {
        height: 40,
        borderColor: colors.gray3,
        borderWidth: 1,
        width: window.width * 0.6,
        padding: 10,
        marginBottom: '5%',
        borderRadius: 5,
      },
      modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: window.width * 0.6,
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      errorText: {
        color: colors.red3,
        fontSize: 15,
        fontWeight:'500'
      },
      progressBarContainer:{
        marginHorizontal:'5%',
        alignItems:'center'
      },
      downloadingText:{
        color:colors.black,
        fontWeight:'bold'
      },
      apartmentServicesCon: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection:'row',
      },
      eachText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
        marginLeft: 10,
      },
      eachService: {
        flexDirection: 'row',
        height: 60,
        width: '50%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },

      //select Debit/Credit
      tabButton: {
        padding: 10,
        width: '50%',
        alignItems: 'center',
        borderBottomWidth: 5,
        borderBottomColor: colors.gray3,
    },
    tabButtonActive: {
        padding: 10,
        borderBottomColor: colors.primaryColor,
        borderBottomWidth: 4,
        width: '50%',
        alignItems: 'center',
        color: colors.black,
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color:colors.gray
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom:'5%'
    },
})