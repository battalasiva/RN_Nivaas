import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    householdSubCon:{
        flexDirection:'row',
        marginHorizontal:window.width*0.32,
        alignItems:'center',
    },
    householdCon:{
        flexDirection:'row',
        paddingLeft:window.width*0.13,
        marginVertical:window.height*0.03,
        paddingVertical:10,
        // borderColor:colors.gray2,
        // borderBottomWidth:2
    },
    householdSuperCon:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:window.width*0.25,
        justifyContent:'space-between',
        backgroundColor:colors.gray3,
        padding:10,
        marginRight:'6%'
        
    },
    householdSubCon:{
        flexDirection:'row',
        marginHorizontal:window.width*0.32,
        alignItems:'center',
    },
    iconNameCon:{
        alignItems:'center',
    },
    manageFlatsConAddText:{
        paddingLeft:window.width*0.07,
        fontSize:17,
        color:colors.gray
    },
    manageFlatsCon:{
        paddingHorizontal:window.width*0.13,
        borderTopWidth:2,
        borderTopColor:colors.gray2,
        marginTop:20,
        paddingVertical:20
    },
    manageFlatsConHome: {
        flexDirection: "row",
        alignItems:"center",
        marginVertical:8
    },
    headingText:{
        marginBottom: "2%",
        fontSize: 17,
        fontWeight:'500'
    },
})