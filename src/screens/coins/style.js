import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
        backgroundColor: colors.white,
    },
    currentbalCon: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: colors.secondaryColor,
        marginTop: '5%',
        marginHorizontal: '5%',
        padding: '5%',
        paddingHorizontal: '8%',
        borderRadius: 5,
    },
    balanceTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '2%',
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: '2%',
    },
    recentTransactionsTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
        marginLeft: '5%',
        marginTop: '5%',
    },
    eachItemCon: {
        backgroundColor: colors.secondaryColor,
        marginTop: '3%',
        marginHorizontal: '5%',
        padding: '5%',
        borderRadius: 5,
    },
    transactionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    transactionType: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginLeft: 4,
    },
    transactionTime: {
        fontSize: 12,
        color: colors.gray,
        marginTop: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        padding: '10%',
    },
    emptyImage: {
        height: 300,
        width: 300,
    },
});