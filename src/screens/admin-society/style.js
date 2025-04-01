import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
        height: '100%',
        backgroundColor: colors.white,
    },
    apartmentServicesCon: {
        marginHorizontal: '3%',
        marginVertical: window.height * 0.03,
    },
    eachService: {
        flexDirection: 'row',
        width: '93%',
        backgroundColor: colors.secondaryColor,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: window.width * 0.03,
        marginVertical: '3%',
        alignItems: 'center'
    },
    eachText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
        marginLeft: 10
    },
    subServicesCon: {
        paddingLeft: '6%',
    },
    subService: {
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    subServiceText: {
        fontSize: 15,
        color: colors.black,
        fontWeight: '500',
        marginLeft:'2.5%',
    },
})