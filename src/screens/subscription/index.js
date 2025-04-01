import { Text, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DefaultTopBarOne, getNewAuthToken, SnackbarComponent } from '../../common/customFunctions';
import { allTexts, colors } from '../../common';
import { DefaultApartmentComp, Loader, PrimaryButton } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAddSubscriptionMutation,
  useLazyGetcoinsByApartmentQuery,
  useLazyGetSubscriptionPlansQuery,
} from '../../redux/services/coinsAndPaymentsService';
import { styles } from './style';
import { FontAwesome } from '../../common/icons';
import moment from 'moment';

const Subscription = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedApartment } = useSelector(state => state.cityData);  
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [currentPlans, setCurrentPlans] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false)
  const [subscriptionPlan] = useAddSubscriptionMutation();
  const [getSubscriptionPlans] = useLazyGetSubscriptionPlansQuery();
  const [getCoinsBalance] = useLazyGetcoinsByApartmentQuery();

  const selectPlan = planId => {
    setSelectedPlanId(planId);
  };

  const handleSubscription = async () => {
    const selectedPlan = currentPlans.find(plan => plan.months === selectedPlanId);
    console.log(selectedPlan);
    
    if (!selectedPlan) return;

    const payload = {
      apartmentId: selectedApartment?.id,
      months: selectedPlan.months,
    };

    setbuttonLoader(true);
    try {
      const response = await subscriptionPlan(payload).unwrap();     
      // console.log('Subscription response:', response);
      navigation.replace(allTexts.screenNames.redemptionDone,{coinsRedeemed:selectedPlan?.totalPlanCost,months:selectedPlan?.months,selectedApartment:selectedApartment});
      SnackbarComponent({
        text: response?.message || 'Subscribed successfully',
        backgroundColor: colors.green5,
      });
    } catch (error) {
      console.log('Subscription error:', error);
      SnackbarComponent({
        text: error?.data?.errorMessage || 'Error in subscription',
        backgroundColor: colors.red3,
      });
    } finally {
      setbuttonLoader(false);
    }
  };

  const fetchSubscriptionPlans = async () => {
    try {
      setLoader(true)
      const response = await getSubscriptionPlans({ apartmentId: selectedApartment?.id }).unwrap();
      setLoader(false);
      setCurrentPlans(response);
      console.log('Subscription plans:', response);
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }else if(error?.data?.status === 403){
        SnackbarComponent({
          text: 'Only Admins Have Access',
          backgroundColor: colors.yellowColor,
        });
      }
      setLoader(false);
      console.log('Error fetching subscription plans:', error);
    }
  };

  const fetchCurrentBalance = async () => {
    try {
      const response = await getCoinsBalance({ apartmentId: selectedApartment?.id }).unwrap();
      setCurrentBalance(response);
      console.log('Current balance:', response);
    } catch (error) {
      console.log('Error fetching current balance:', error);
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
    fetchCurrentBalance();
  }, []);

  const selectedPlan = currentPlans.find(plan => plan.months === selectedPlanId);

  return (
    <View style={styles.container}>
      {DefaultTopBarOne(navigation, 0, 'Subscription')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      {/* Current Plan */}
      <View style={styles.currentPlanContainer}>
        <Text style={styles.sectionTitle}>Current Plan</Text>
        <View style={styles.currentPlanBox}>
          <Text style={styles.currentPlanText}>
            {selectedApartment?.subscriptionType || 'Not Subscribed To Any Plan'}
          </Text>
          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Text>Start date : </Text>
          <Text style={styles.planDatesText}>
          {moment(selectedApartment?.startDate).format('DD-MM-YYYY hh:mm A')}
          </Text>
          </View>
          <View style={{alignItems:'center',flexDirection:'row'}}>
          <Text>End date : </Text>
          <Text style={styles.planDatesText}>
          {moment(selectedApartment?.endDate).format('DD-MM-YYYY hh:mm A')}
          </Text>
          </View>
        </View>
      </View>

      {/* Subscription Plans */}
      <View style={styles.subscriptionPlansContainer}>
        <Text style={styles.sectionTitle}>Subscription Plans</Text>
        {
            loader ? (
                <View>
                <Loader
                  color={colors.primaryColor}
                  size={'large'}
                  marginTop={'15%'}
                />
              </View>
            ) : (
                <View style={styles.plansRow}>
                {currentPlans.map(plan => (
                  <Pressable
                    key={plan.months}
                    style={[
                      styles.planBox,
                      selectedPlanId === plan.months && styles.selectedPlanBox,
                    ]}
                    onPress={() => selectPlan(plan.months)}
                  >
                    <Text style={styles.planDuration}>
                      {plan.months} {plan.months === 1 ? 'Month' : 'Months'}
                    </Text>
                    <Text style={styles.planCoins}>{<FontAwesome name='rupee' size={15} color={colors.black} />}{` ${plan.totalPlanCost}`}</Text>
                    <Text style={styles.planCoins}>{<FontAwesome name='rupee' size={14} color={colors.black} />}{plan.perFlatCost}/flat</Text>
                  </Pressable>
                ))}
              </View>
            )
        }
      </View>
      {selectedPlan && (
        <View style={styles.billContainer}>
          <Text style={styles.billTitle}>Plan Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Selected Plan</Text>
            <Text style={styles.billValue}>{selectedApartment?.subscriptionType}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Duration of Plan</Text>
            <Text style={styles.billValue}>{selectedPlan.months} Month(s)</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Required Coins</Text>
            <Text style={styles.billValue}>{selectedPlan.totalPlanCost}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Current Balance</Text>
            <Text style={styles.billValue}>{currentBalance}</Text>
          </View>
        </View>
      )}
      {selectedPlan && (
        <View style={{ marginHorizontal: '5%' }}>
          {currentBalance >= selectedPlan.totalPlanCost ? (
            <PrimaryButton
              loading={buttonLoader}
              text={'Subscribe'}
              bgColor={colors.primaryColor}
              onPress={handleSubscription}
            />
          ) : (
            <View style={{alignItems:'center'}}>
              <Text style={styles.errorText}>
                Insufficient balance to subscribe to this plan.
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Subscription;