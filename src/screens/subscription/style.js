import { StyleSheet } from "react-native";
import { colors, window } from "../../common";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    currentPlanContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '3%',
    },
    sectionTitle: {
        fontSize: window.width * 0.04,
        fontWeight: 'bold',
        marginBottom: '2%',
        color: '#333',
    },
    currentPlanBox: {
        backgroundColor: colors.secondaryColor,
        paddingVertical: '3%',
        borderRadius: 5,
        paddingLeft:'7%'
    },
    currentPlanText: {
        color: colors.primaryColor,
        fontSize: 16,
        fontWeight:'700'
    },
    planDatesText:{
        color:colors.black,
    },
    subscriptionPlansContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '3%',
    },
    plansRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    planCoins:{
        color:colors.black,
    },
    planBox: {
        width: '30%',
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingVertical: '5%',
        alignItems: 'center',
        borderColor: colors.gray2,
        borderWidth: 1,
    },
    selectedPlanBox: {
        backgroundColor: colors.secondaryColor,
        borderColor: colors.primaryColor,
    },
    planDuration: {
        fontSize: window.width * 0.035,
        fontWeight: 'bold',
        color: '#333',
    },
    billContainer: {
        backgroundColor: colors.white,
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
        marginHorizontal:'5%'
      },
      billTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 10,
      },
      billRow: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 8,
      },
      billLabel: {
        fontSize: 15,
        color: colors.black,
      },
      billValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.black,
      },
      errorText:{
        fontSize:15,
        color:colors.red3,
        fontWeight:'500'
      }
});