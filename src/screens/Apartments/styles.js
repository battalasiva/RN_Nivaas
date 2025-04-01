import { Platform, StyleSheet } from "react-native";
import { colors, window } from "../../common";
import { statusBarHeight } from "../../utils/config/config";

export const styles = StyleSheet.create({
    mainCon:{
        height:'100%',
        backgroundColor:colors.white,
    },
    topBar:{
        height:  70,
        marginTop: Platform.OS === 'ios' ? 0 : statusBarHeight
    },
    topHeader:{
        marginVertical:window.height*0.04,
        marginTop:window.height*0.06,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:window.width*0.08,
        alignItems:'center'
    },
    apartmentName:{
        color:colors.black,
        fontSize:16,
        fontWeight:'500'
    },
    iconsCon:{
        flexDirection:'row',
    },
    icons:{
        color:colors.black,
        marginLeft:10
    },
    payText:{
        marginHorizontal:window.width*0.08,
        color:colors.black,
        fontSize:16,
        fontWeight:'500'
    },
    apartmentServicesCon:{
        marginHorizontal:window.width*0.05,
        marginVertical:window.height*0.03,
    },
    eachService:{
        elevation:2,
        width:'93%',
        backgroundColor:colors.secondaryColor,
        padding:10,
        borderRadius:10,
        marginHorizontal:window.width*0.03,
        marginVertical:'5%',
    },
    eachText:{
        fontSize:14,
        marginTop:5,
        color:colors.black
    }
})