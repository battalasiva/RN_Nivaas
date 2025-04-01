import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { CustomDropdown, PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { styles } from './style';
import { allTexts, colors, window } from '../../common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  useGetcityListBySearchMutation,
  useLazyGetCityListQuery,
  useNewApartmentOnboardingMutation,
} from '../../redux/services/cityServices';
import { onBoardNewApartmentSchema } from '../../common/schemas';
import { useDispatch, useSelector } from 'react-redux';
import {
  DefaultTopBarOne,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';

const NewApartmentOnBoard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [citiesData, setCitiesData] = useState([]);
  const [cityValue, setCityValue] = useState({ id: null, name: null });
  const [cityPage, setCityPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [postalCodesData, setPostalCodesData] = useState([]);
  const [postalCodeValue, setPostalCodeValue] = useState({ id: null, name: null });
  const [apartment, setApartment] = useState('');
  const [numBlocks, setNumBlocks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [postNewApartment] = useNewApartmentOnboardingMutation();
  const [getCityList] = useLazyGetCityListQuery();
  const [getCityListBySearch] = useGetcityListBySearchMutation();
  const fadeAnimRefs = useRef([1, 2, 3, 4, 5, 6, 7].map(() => new Animated.Value(0))).current;
  const handleCityChange = (id, name) => {
    setCityValue({ id, name }); 
    const selectedCity = citiesData?.find(city => city.id === id); 
    
    if (selectedCity?.postalCodes?.length > 0) {
      const codesData = selectedCity?.postalCodes?.map(code => ({
        id: code.id,
        name: code.code,
      }));
      setPostalCodesData(codesData);
    } else {
      setPostalCodesData([]);
    }
  };
  

  const handlePostalCodeChange = (id, name) => {
    setPostalCodeValue({ id, name });
  };

  const handleSubmit = () => {
    const payload = {
      name: apartment,
      code: null,
      description: null,
      totalFlats: numBlocks,
      apartmentType: null,
      builderName: null,
      line1: addressLine1,
      line2: addressLine2,
      line3: null,
      postalCode: postalCodeValue?.name,
      cityId: cityValue?.id,
    };
    console.log(payload,'NEW APARTMENT');
    
    const validationErrors = onBoardNewApartmentSchema(payload);
    if (Object.keys(validationErrors)?.length === 0) {
      setbuttonLoader(true);
      postNewApartment(payload)
        .unwrap()
        .then(response => {
          console.log('New Apartment onboarding', response);
          setbuttonLoader(false);
          SnackbarComponent({
            text: response?.message || 'OnBoarding Request Sent',
            backgroundColor: colors.green5,
          });
          navigation.navigate(allTexts.screenNames.home);
        })
        .catch(error => {
          setbuttonLoader(false)
          console.log('Error in New Apartment onboarding', error);
          if (error?.data?.errorCode === 1002) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Error in New Apartment onboarding', backgroundColor: colors.red3 });
          } else {
            SnackbarComponent({ text: 'Error in New Apartment onboarding', backgroundColor: colors.red3 });
          }
        });
    } else {
      setErrors(validationErrors);
    }
  };
  const handleCityData = async (query) => {
    const searchPayload = {
      pageNo: cityPage,
      pageSize: 5,
      payload: {
        fullText: query,
      },
    };
    console.log(searchPayload);
    setLoader(true);
    try {
      const response = await getCityListBySearch(searchPayload).unwrap();
      console.log(response?.content, 'RESPONSE');

      if (response?.content?.length > 0) {
        setCitiesData((prevCities) => {
          // Combine previous data and new response
          const combinedData = [...(prevCities || []), ...response?.content];

          // Remove duplicates based on the `id`
          const uniqueCities = combinedData.filter(
            (city, index, self) =>
              index === self.findIndex((c) => c.id === city.id)
          );

          return uniqueCities;
        });

        setHasMoreData(response?.content?.length === 5);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      console.log('Error fetching city data:', error);
    } finally {
      setLoader(false);
    }
  };
  const fetchMoreCities = () => {
    if (!loader && hasMoreData) {
      setCityPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    if (cityValue?.id) {
      const selectedCity = citiesData?.find(city => city?.id === cityValue?.id);
      if (selectedCity) {
        setState(selectedCity?.region);
      }
    }
  }, [cityValue, citiesData]);
  useEffect(() => {
    handleCityData('');
    const animations = fadeAnimRefs.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);
  useEffect(() => {
    if (cityPage > 0) {
      handleCityData('');
    }
  }, [cityPage]);
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Apartment OnBoarding', true)}
      <View style={styles.container}>
        <Animated.View style={[styles.eachFieledCon, { opacity: fadeAnimRefs[0] }]}>
          <TextInput
            style={styles.input}
            onChangeText={setApartment}
            value={apartment}
            placeholder="Enter Apartment Name"
            placeholderTextColor={colors.gray}
            selectionColor={colors.primaryColor}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </Animated.View>
        <Animated.View style={[styles.eachFieledCon, { opacity: fadeAnimRefs[1] }]}>
          <TextInput
            style={styles.input}
            onChangeText={setNumBlocks}
            value={numBlocks}
            placeholder="Enter Number Of Flats"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            selectionColor={colors.primaryColor}
          />
          {errors.totalFlats && (
            <Text style={styles.errorText}>{errors.totalFlats}</Text>
          )}
        </Animated.View>
        <Animated.View style={[styles.DropdownFieledCon, { opacity: fadeAnimRefs[2] }]}>
          <CustomDropdown
            label="City"
            data={citiesData}
            value={cityValue?.id}
            onChange={handleCityChange}
            labelField="name"
            valueField="id"
            fetchMoreData={fetchMoreCities}
            hasMoreData={hasMoreData}
          />
          {errors.cityId && (
            <Text style={styles.errorText}>{errors.cityId}</Text>
          )}
        </Animated.View>
        <Animated.View style={[styles.eachFieledCon, { opacity: fadeAnimRefs[3] }]}>
          <TextInput
            style={styles.input}
            onChangeText={setState}
            value={state}
            placeholder="Enter Your State"
            placeholderTextColor={colors.gray}
            editable={false}
            selectionColor={colors.primaryColor}
          />
        </Animated.View>
        {true && (
          <Animated.View style={{ opacity: fadeAnimRefs[4] }}>
            <CustomDropdown
              label="Postal Code"
              data={postalCodesData}
              value={postalCodeValue.id}
              onChange={handlePostalCodeChange}
              labelField="name"
              valueField="id"
            />
          </Animated.View>
        )}

        <Animated.View style={[styles.eachFieledCon, { opacity: fadeAnimRefs[5] }]}>
          <TextInput
            style={styles.input}
            onChangeText={setAddressLine1}
            value={addressLine1}
            placeholder="Enter Address Line 1"
            placeholderTextColor={colors.gray}
            selectionColor={colors.primaryColor}
          />
          {errors.line1 && (
            <Text style={styles.errorText}>{errors.line1}</Text>
          )}
        </Animated.View>
        <Animated.View style={[styles.eachFieledCon, { opacity: fadeAnimRefs[6] }]}>
          <TextInput
            style={styles.input}
            onChangeText={setAddressLine2}
            value={addressLine2}
            placeholder="Enter Address Line 2"
            placeholderTextColor={colors.gray}
            selectionColor={colors.primaryColor}
          />
          {errors.line2 && (
            <Text style={styles.errorText}>{errors.line2}</Text>
          )}
        </Animated.View>
        <Animated.View style={{ marginTop: window.height * 0.05, opacity: fadeAnimRefs[7] }}>
          <PrimaryButton
            onPress={handleSubmit}
            loading={buttonLoader}
            bgColor={colors.primaryColor}
            radius={5}
            text={'Send OnBoard Request'}
            shadow={true}
            textColor={colors.white}
          />
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default NewApartmentOnBoard;