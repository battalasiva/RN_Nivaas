import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Pressable, Text } from 'react-native';
import { CustomDropdown, PrimaryButton } from '../../components';
import { allTexts, colors } from '../../common';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFlatownerOnboardingMutation, useGetapartmentsBySearchMutation, useGetcityListBySearchMutation, useGetflatsBySearchMutation, useLazyGetApartmentListQuery, useLazyGetCityListQuery, useLazyGetFlatsListQuery, useUserOnBoardingMutation } from '../../redux/services/cityServices';
import { DefaultTopBarOne, getNewAuthToken, SnackbarComponent } from '../../common/customFunctions';
import { useDispatch } from 'react-redux';

const AddYourHome = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [cityValue, setCityValue] = useState({ id: null, name: null });  
  const [apartmentValue, setApartmentValue] = useState({ id: null, name: null });
  const [flatValue, setFlatValue] = useState({ id: null, name: null });
  
  const [citiesData, setCitiesData] = useState([]);    
  const [apartmentData, setapartmentsData] = useState();
  const [flatdata, setflatdata] = useState();
  const [loader, setLoader] = useState(false);
  const [cityPage, setCityPage] = useState(0);
  const [apartmentsPage, setApartmentsPage] = useState(0);
  const [flatsPage, setflatsPage] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [tenantFlats, setTenantFlats] = useState();
  const [tenatsFlatsPage, setTenatsFlatsPage] = useState(0);

  const [getCityList] = useLazyGetCityListQuery();
  const [getCityListBySearch] = useGetcityListBySearchMutation();
  const [getApartmentsList] = useLazyGetApartmentListQuery();
  const [getApartmentsBySearch] = useGetapartmentsBySearchMutation();
  const [getflatdata] = useLazyGetFlatsListQuery();
  const [getFlatsBySearch] = useGetflatsBySearchMutation();
  const [userOnboarding] = useUserOnBoardingMutation();
  const [flatownerOnboarding] = useFlatownerOnboardingMutation();

  const cityPosition = useRef(new Animated.Value(-1000)).current;
  const apartmentPosition = useRef(new Animated.Value(-1000)).current;
  const flatPosition = useRef(new Animated.Value(-1000)).current;
  const buttonPosition = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.timing(cityPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCityData = async (query) => {
    const searchPayload = {
      pageNo: cityPage,
      pageSize: 5,
      payload: {
        fullText: query,
      },
    };
    // console.log(searchPayload);
    setLoader(true);
    try {
      const response = await getCityListBySearch(searchPayload).unwrap();
      // console.log(response?.content, 'RESPONSE');
      if (response?.content?.length > 0) {
        setCitiesData((prevCities) => {
          const combinedData = [...(prevCities || []), ...response?.content];
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
  const handleApartmentData = async (query) => {
    const apartmentPayload = {
      cityId: cityValue?.id,
      pageNo: apartmentsPage,
      pageSize: 5,
      payload: {
        fullText: query,
      },
    };
  
    // console.log(apartmentPayload);
  
    Animated.timing(apartmentPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  
    try {
      const response = await getApartmentsBySearch(apartmentPayload).unwrap();
      // console.log(response?.content, 'APARTMENTS');
  
      if (response?.content?.length > 0) {
        setapartmentsData((prevApartments) => {
          const combinedData = [...(prevApartments || []), ...response?.content];
            const uniqueData = combinedData.filter(
            (apartment, index, self) =>
              index === self.findIndex((a) => a.id === apartment.id)
          );
  
          return uniqueData;
        });
  
        setHasMoreData(response?.content?.length === 5);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      console.log('Error fetching Apartment data:', error);
    } finally {
      setLoader(false);
    }
  };  
  const handleOptionSelect = option => {
    setSelectedOption(option);
    setflatdata(null);
    console.log('Selected option:', option);
    // if (selectedOption === 'FlatOwner') {
    //   handleFlatData('');
    // } else {
    //   handleFlatsforTenantsData('');
    // }
  };
  const handleFlatData = async (query) => {    
    Animated.timing(flatPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const flatOwnersListPayload = {
      apartmentId: apartmentValue?.id,
      pageNo: flatsPage,
      pageSize: 5,
      payload: {
        fullText:query,
      },
    };    
    // const flatTenantsListPayload = {
    //   apartmentId: apartmentValue?.id,
    //   pageNo: flatsPage,
    //   pageSize: 5,
    //   payload: {
    //     fullText:query,
    //     filters : [
    //       {
    //         field: "approved",
    //         value: true,
    //         operator: "EQUAL_TO",
    //       },
    //     ]
    //   },
    // };  
    // const payload = selectedOption === 'Tenant' ? flatTenantsListPayload : flatOwnersListPayload
    console.log(flatOwnersListPayload, selectedOption,'LLLlllLLLLLLLLLLLLL');
    try {
      const response = await getFlatsBySearch(flatOwnersListPayload).unwrap();
      console.log(response?.content, 'FLAT_DATA');
      if (response?.content?.length > 0) {
        setflatdata((prevFlats) => {
          const combinedData = [...prevFlats || [], ...response?.content];
          const uniqueData = combinedData.filter(
            (flat, index, self) =>
              index === self.findIndex(f => f.id === flat.id) 
          );
          return uniqueData;
        });
        setHasMoreData(response?.content?.length === 5);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      console.log('Error fetching flats data:', error);
    } finally {
      setLoader(false);
    }
  };
  const handleFlatsforTenantsData = async (query) => {
    // console.log('hello');
    
    Animated.timing(flatPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(); 
    const flatTenantsListPayload = {
      apartmentId: apartmentValue?.id,
      pageNo: tenatsFlatsPage,
      pageSize: 5,
      payload: {
        fullText:query,
        filters : [
          {
            field: "approved",
            value: true,
            operator: "EQUAL_TO",
          },
        ]
      },
    };  
    // console.log(flatTenantsListPayload, selectedOption,'kkkkkkkkkkkkkkkkkk');
    try {
      const response = await getFlatsBySearch(flatTenantsListPayload).unwrap();
      // console.log(response?.content, 'FLAT_DATA');
      if (response?.content?.length > 0) {
        setTenantFlats((prevFlats) => {
          const combinedData = [...prevFlats || [], ...response?.content];
          const uniqueData = combinedData.filter(
            (flat, index, self) =>
              index === self.findIndex(f => f.id === flat.id) 
          );
          return uniqueData;
        });
        setHasMoreData(response?.content?.length === 5);
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      console.log('Error fetching flats data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleOnBoarding = () => {
    if (!selectedOption) {
      SnackbarComponent({ text: 'Please Select above Option', backgroundColor: colors.red3 });
    } else if (selectedOption === 'Tenant' || selectedOption === 'FamilyMember') {
      setLoader(true)
      const payload = {
        flatId: flatValue?.id,
        relatedType: (selectedOption === 'Tenant') ? 'TENANT' : 'FLAT_OWNER_FAMILY_MEMBER',
      };
      // console.log(payload,'onboarding/flat/request');
      userOnboarding(payload)
        .unwrap()
        .then(response => {
          console.log(response, 'onboarding response');
          setLoader(false);
          SnackbarComponent({ text: response?.message || 'Flat Onboarded Successfully', backgroundColor: colors.green5 });
          navigation.replace(allTexts.screenNames.requestSummary, { data: { cityValue, apartmentValue, flatValue } });
        })
        .catch(error => {
          console.log('error in OnBoarding request', error);
          setLoader(false);
          if (error?.data?.errorCode === 1032) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else if (error?.data?.errorCode === 1029) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else if (error?.data?.errorCode === 1040) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else {
            SnackbarComponent({ text: 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          }
        });
    } else if (selectedOption === 'FlatOwner') {
      setLoader(true)
      const payload = {
        flatId: flatValue?.id,
        type: 'FLAT',
      };
      // console.log(payload,'onboarding/flat_owner/request');
      flatownerOnboarding(payload)
        .unwrap()
        .then(response => {
          console.log(response, 'flat onboarding response');
          setLoader(false);
          SnackbarComponent({ text: response?.message || 'Flat Onboarded Successfully', backgroundColor: colors.green5 });
          navigation.replace(allTexts.screenNames.requestSummary, { data: { cityValue, apartmentValue, flatValue } });
        })
        .catch(error => {
          console.log('error in OnBoarding request', error);
          setLoader(false);
          if (error?.data?.errorCode === 1029) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else if (error?.data?.errorCode === 1032) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else if (error?.data?.errorCode === 1039) {
            SnackbarComponent({ text: error?.data?.errorMessage || 'Failed To Onboard Flat', backgroundColor: colors.red3 });
          } else {
            SnackbarComponent({
              text: 'Failed To Onboard Flat', backgroundColor: colors.red3
            });
          }
        });
    }
  };

  useEffect(() => {
    handleCityData('');
  }, []);
  useEffect(() => {
    if (cityValue.id) {
      handleApartmentData('');
    }
  }, [cityValue.id]);
  useEffect(() => {
    if (selectedOption === 'FlatOwner') {
      handleFlatData('');
    }else{
      handleFlatsforTenantsData('');
    }
  }, [selectedOption]);

  const fetchMoreCities = () => {
    if (!loader && hasMoreData) {
      setCityPage((prevPage) => prevPage + 1);
    }
  };
  const fetchMoreApartments = () => {
    if (!loader && hasMoreData) {
      setApartmentsPage((prevPage) => prevPage + 1);
    }
  };
  const fetchMoreFlats = () => {
    if (!loader && hasMoreData) {
      setflatsPage((prevPage) => prevPage + 1);
    }
  };
  const fetchMoreTenantFlats = () => {
    if (!loader && hasMoreData) {
      setTenatsFlatsPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (cityPage > 0) {
      handleCityData('');
    }
  }, [cityPage]);
  useEffect(() => {
    if (apartmentsPage > 0) {
      handleApartmentData('');
    }
  }, [apartmentsPage]);
  useEffect(() => {
    if (flatsPage > 0) {
      handleFlatData('');
    }
  }, [flatsPage]);
  useEffect(() => {
    if (tenatsFlatsPage > 0) {
      handleFlatsforTenantsData('');
    }
  }, [tenatsFlatsPage]);
  useEffect(() => {
    if (flatValue.id && selectedOption) {
      Animated.timing(buttonPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [flatValue.id, selectedOption]);
  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 70, 'Add Your Home', true)}
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Animated.View style={{ ...styles.eachDropdownCon, transform: [{ translateX: cityPosition }] }}>
            <CustomDropdown
              label="City"
              showLabel={true}
              data={citiesData}
              value={cityValue.id}
              onChange={(id, name) => {
                setapartmentsData(null);
                setApartmentsPage(0);
                setCityValue({ id, name });
              }}
              labelField="name"
              valueField="id"
              fetchMoreData={fetchMoreCities}
              hasMoreData={hasMoreData}
              onSearch={handleCityData}
            />
          </Animated.View>
          {/* Apartment Dropdown */}
          {cityValue?.id && (
            <Animated.View style={{ ...styles.eachDropdownCon, transform: [{ translateX: apartmentPosition }] }}>
              <CustomDropdown
                label="Apartment"
                showLabel={true}
                data={apartmentData}
                value={apartmentValue.id}
                onChange={(id, name) => setApartmentValue({ id, name })}
                labelField="name"
                valueField="id"
                fetchMoreData={fetchMoreApartments}
                hasMoreData={hasMoreData}
                onSearch={handleApartmentData}
              />
            </Animated.View>
          )}
          {apartmentValue?.id && (
            <View style={styles.selectButtonCon}>
              <Pressable
                style={[styles.eachOption, { backgroundColor: selectedOption === 'FlatOwner' ? colors.primaryColor : colors.white }]}
                onPress={() => handleOptionSelect('FlatOwner')}
              >
                <Text style={{
                  color: selectedOption === 'FlatOwner' ? colors.white : colors.black,
                  fontWeight: 'bold'
                }}>Owner</Text>
              </Pressable>
              <Pressable
                style={[styles.eachOption, { backgroundColor: selectedOption === 'Tenant' ? colors.primaryColor : colors.white }]}
                onPress={() => handleOptionSelect('Tenant')}
              >
                <Text style={{
                  color: selectedOption === 'Tenant' ? colors.white : colors.black,
                  fontWeight: 'bold'
                }}>Tenant</Text>
              </Pressable>
            </View>
          )}
          {selectedOption && (
            <Animated.View style={{ ...styles.eachDropdownCon, transform: [{ translateX: flatPosition }] }}>
              <CustomDropdown
                label="Flat Number"
                showLabel={true}
                data={selectedOption === 'FlatOwner' ? flatdata : tenantFlats}
                value={flatValue?.id}
                onChange={(id, name) => setFlatValue({ id, name })}
                labelField="flatNo"
                valueField="id"
                fetchMoreData={selectedOption === 'FlatOwner' ? fetchMoreFlats : fetchMoreTenantFlats}
                hasMoreData={hasMoreData}
                onSearch={selectedOption === 'FlatOwner' ? handleFlatData : handleFlatsforTenantsData}
              />
              {/* {(!flatdata || flatdata.length === 0) && (
                <View>
                  <Text style={styles.errorMessage}>No Flats Here</Text>
                </View>
              )} */}
            </Animated.View>
          )}
          {flatValue?.id && (
             <Animated.View style={{ ...styles.buttonContainer, transform: [{ translateX: buttonPosition }] }}>
             <PrimaryButton
               onPress={() => handleOnBoarding()}
               bgColor={colors.primaryColor}
               text={'On Board'}
               shadow={true}
               textColor={colors.white}
               loading={loader}
             />
           </Animated.View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddYourHome;