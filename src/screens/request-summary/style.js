import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    apartmentDetailsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    horizontalScrollCon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '5%',
        justifyContent: 'space-between',
    },
    apartmentDetailsCons: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    flatItemCon: {
        padding: 10,
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    iconCon: {
        borderWidth: 1,
        borderColor: colors.gray2,
        borderRadius: 50,
        padding:'1%'
    },
    content: {
        padding: '5%',
    },
    apartmentInfo: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.black,
        marginTop: '3%'
    },
    moveinTxtCon:{
        backgroundColor:colors.gray3,
        // width:'80%',
        padding:10,
        paddingVertical:5,
        alignItems:'center',
        borderRadius:5
    },
    tenantTextView:{
        backgroundColor:colors.orangeColor,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
        marginTop:'3%',
        height:30
    },
    tenantText:{
        color:colors.white,
        fontSize:16,
        fontWeight:'500'
    },
    requestType: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.orangeColor,
        marginTop: '3%'
    },
    requestDate: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: '3%'
    },
    tabContainer: {
        flexDirection: 'row',
        borderTopColor: colors.gray3,
        borderTopWidth: 5,
    },
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
        fontWeight: 'bold'
    },
    statusSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '5%',
        // marginLeft:'5%'
    },
    UnderreviewCon: {
        padding: 10,
        flexDirection:'row',
        alignItems:'center',
    },
    UnderreviewText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.black,
        marginLeft:5
    },
    eachDetailCon:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:'3%'
    },
    mobileNOText:{
        fontSize:15,
        color:colors.black,
        marginLeft:5
    },
    approvelStatusCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'5%',
        paddingVertical:'3%',
        alignItems:'center',
        borderTopWidth:4,
        borderTopColor:colors.gray3,
        borderBottomWidth:4,
        borderBottomColor:colors.gray3
    },
    pendingCon:{
        alignItems:'center'
    },
    moveInCon:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:colors.gray3,
        paddingVertical:'3%',
        paddingHorizontal:'5%',
        paddingRight:'8%'
    },
    moveInTXT:{
        fontSize:15,
        color:colors.black,
        fontWeight:'500'
    }
});