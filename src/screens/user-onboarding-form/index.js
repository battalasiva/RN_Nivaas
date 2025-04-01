import {Alert, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from './style';
import {PrimaryButton, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors, window} from '../../common';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useUserOnBoardingMutation} from '../../redux/services/cityServices';
import RadioGroup from 'react-native-radio-buttons-group';
import { SnackbarComponent } from '../../common/customFunctions';

const UserOnBoardingForm = ({navigation, route}) => {
  const userData = route?.params || {};
  const [Loader, setLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOnboarding] = useUserOnBoardingMutation();
  const handleOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
  const handleOnBoarding = userData => {
    if (!selectedOption) {
      SnackbarComponent({text:'Please Select above Option',backgroundColor:colors.red3});
    } else {
      const payload = {
        flatId: userData?.flatId,
        type:"FLAT"
      };
      setLoader(true);
      userOnboarding(payload)
        .unwrap()
        .then(response => {
          console.log(response,'onboarding response');
          setLoader(false);
          SnackbarComponent({text: response?.message || 'Flat Onboarded Successfully',backgroundColor:colors.green});
          navigation.navigate(allTexts.screenNames.home,{city:userData?.cityValue,apartment:userData?.apartmentValue,flat:userData?.flatValue,flatId: userData?.flatId});
        })
        .catch(error => {
          console.log('error in OnBoarding request', error);
          SnackbarComponent({text:'Failed To Onboard Flat',backgroundColor:colors.red3});
        });
    }
  };
  const radioButtons = useMemo(
    () => [
      {
        id: 'Renting',
        label: 'Renting/Tenant',
        value: 'Renting',
      },
      // {
      //   id: 'FlatOwner',
      //   label: 'Flat Owner',
      //   value: 'FlatOwner',
      // },
    ],
    [],
  );
  return (
    <View style={styles.mainContainer}>
      <View style={{height:70,marginTop: statusBarHeight }}>
        <TopBarCard2 back={true} txt={'Home Details'} navigation={navigation} />
      </View>
      <View style={styles.detailsCon}>
        <Text style={{color: colors.black, fontSize: 16, fontWeight: '500'}}>
          Home Details
        </Text>
        <View style={styles.eachDetailsCon}>
          <SimpleLineIcons name="location-pin" size={18} color={colors.black} />
          <Text style={styles.detailText}>{userData.cityValue}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <MaterialCommunityIcons name="office-building-outline" size={18} color={colors.black} />
          <Text style={styles.detailText}>{userData.apartmentValue}</Text>
        </View>
        <View style={styles.eachDetailsCon}>
          <MaterialCommunityIcons name="home-outline" size={24} color={colors.black} />
          <Text style={styles.detailText}>Flat No : {userData.flatValue}</Text>
        </View>
      </View>
      <View style={styles.mainButtonCon}>
        <View style={styles.radioButtonCon}>
          <Text style={styles.youAreText}>You Are</Text>
          <View style={styles.buttonView}>
            {radioButtons.map(button => (
              <View key={button.id} style={styles.radioButtonContainer}>
                <RadioGroup
                  radioButtons={[button]}
                  onPress={handleOptionSelect}
                  selectedId={selectedOption}
                  layout="row"
                />
              </View>
            ))}
          </View>
        </View>
        <View>
          <PrimaryButton
            onPress={() => handleOnBoarding(userData)}
            bgColor={colors.primaryColor}
            radius={30}
            text={'On Board'}
            shadow={true}
            textColor={colors.white}
          />
        </View>
      </View>
    </View>
  );
};

export default UserOnBoardingForm;
