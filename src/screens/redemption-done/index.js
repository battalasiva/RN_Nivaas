import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { FontAwesome, MaterialIcons } from '../../common/icons';
import { allTexts, colors } from '../../common';
import { PrimaryButton } from '../../components';
const RedemptionDone = ({ navigation, route }) => {
  const { coinsRedeemed , months,selectedApartment} = route?.params || {};
  const message = `Successfully subscribed to a ${months}-month plan for your apartment ${selectedApartment?.name?.toUpperCase()}.`
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.successIcon}>
          <MaterialIcons name="check" size={50} color="white" />
        </View>
      </View>
      <Text style={styles.successText}>Redemption successful</Text>
      {/* <Text style={styles.detailsText}>{message}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' ,marginBottom:'80%'}}>
        <FontAwesome name='rupee' size={28} color={colors.black} />
        <Text style={styles.amountText}>{coinsRedeemed || 0}</Text>
      </View> */}
      <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Plan Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Apartment Name</Text>
            <Text style={styles.billValue}>{selectedApartment?.name}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Selected Plan</Text>
            <Text style={styles.billValue}>{selectedApartment?.subscriptionType}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Duration of Plan</Text>
            <Text style={styles.billValue}>{months} Month(s)</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Amount</Text>
            <Text style={styles.billValue}>{coinsRedeemed}</Text>
          </View>
        </View>
      <PrimaryButton bgColor={colors.primaryColor} text={'DONE'} onPress={() => navigation.navigate(allTexts.screenNames.home)} />
    </View>
  );
};

export default RedemptionDone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: '5%'
  },
  iconContainer: {
    marginBottom: 20,
    marginTop:'40%',
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
    marginLeft: '2%'
  },
  offerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAFBF5',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    marginTop:'50%'
  },
  detailsText: {
    fontSize: 15,
    color: colors.black,
    // marginBottom: '5%',
    // marginTop:'70%',
    fontWeight:'500',
    textAlign:'center'
  },
  doneButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  doneButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
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
    marginHorizontal:'5%',
    width:'100%',
    marginBottom:'60%'
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
    fontSize: 14,
    color: colors.black,
  },
  billValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
});
