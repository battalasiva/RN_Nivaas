import { ScrollView, Text, View, Pressable, Image, TouchableOpacity, Platform, FlatList, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import SearchScreen from '../../components/searchbar';
import { allTexts, colors } from '../../common';
import { useSelector } from 'react-redux';
import { styles } from './style';
import { useLazyGetServiceCategoriesListQuery } from '../../redux/services/nivaasServicesService';

const Services = ({ navigation }) => {
  const { customerOnboardReqData } = useSelector(state => state.currentCustomer);
  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('Apartment Services'); 
  const [selectedService, setSelectedService] = useState(null); 

  const [getServiceCategoriesList] = useLazyGetServiceCategoriesListQuery();
  const showApartmentServicesTab = (
    customerOnboardReqData?.user?.roles?.includes(allTexts.roles.apartmentAdmin) ||
    customerOnboardReqData?.user?.roles?.includes(allTexts.roles.flatOwner)
  );

  const suggestions = [
    'Search for Electricians',
    'Search for Plumbers',
    'Search for Carpenters',
    'Search for Cleaners',
    'Search for Chefs',
  ];

  const apartmentServices = [
    { id: '1', type: 'apartmentPartner', name: 'Electrician', uri: require('../../utils/assets/images/Electrician.png') },
    { id: '2', type: 'apartmentPartner', name: 'Plumbing', uri: require('../../utils/assets/images/Plumber.png') },
    { id: '3', type: 'apartmentPartner', name: 'Repairs', uri: require('../../utils/assets/images/Carpenter.png') },
    { id: '4', type: 'apartmentPartner', name: 'Cleaning', uri: require('../../utils/assets/images/Cleaner.png') },
    { id: '5', type: 'nivaasTrustedPartner', name: 'Painting', uri: require('../../utils/assets/images/Maid.png') },
  ];

  const nivaasTrustedPartners = [
    { id: '1', type: 'nivaasTrustedPartner', name: 'Electrician', uri: require('../../utils/assets/images/Electrician.png') },
    { id: '2', type: 'nivaasTrustedPartner', name: 'Plumbing', uri: require('../../utils/assets/images/Plumber.png') },
    { id: '3', type: 'nivaasTrustedPartner', name: 'Repairs', uri: require('../../utils/assets/images/Carpenter.png') },
    { id: '4', type: 'nivaasTrustedPartner', name: 'Cleaning', uri: require('../../utils/assets/images/Cleaner.png') },
    { id: '5', type: 'nivaasTrustedPartner', name: 'Painting', uri: require('../../utils/assets/images/Maid.png') },
  ];

  const filteredServices = selectedTab === 'Apartment Services'
    ? apartmentServices.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      )
    : nivaasTrustedPartners.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleServicePress = (item) => {
    if (selectedTab === 'Nivaas Trusted Partners') {
      setSelectedService(item.id === selectedService?.id ? null : item); 
    } else {
      navigation.navigate(allTexts.screenNames.eachServicelist, { name: item?.name ,id : item?.id});
    }
  };

  const handleServiceCategoriesList =()=>{            
    getServiceCategoriesList()
      .unwrap()
      .then((responce)=>{
        console.log(responce,'SERVICE CAT');
      }).catch((error)=>{
        console.log(error);
      })
  }
  useEffect(() => {
    handleServiceCategoriesList()
  }, [])
  
  return (
    <View style={styles.mainCon}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: Platform.OS === 'ios' ? null : statusBarHeight }}>
          <TopBarCard2 txt={'Services'} />
        </View>
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tabButton,
              selectedTab === 'Apartment Services' && styles.selectedTabButton
            ]}
            onPress={() => {
              setSelectedTab('Apartment Services');
              setSelectedService(null); 
            }}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'Apartment Services' && styles.selectedTabText
            ]}>
              Apartment Services
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabButton,
              selectedTab === 'Nivaas Trusted Partners' && styles.selectedTabButton
            ]}
            onPress={() => {
              setSelectedTab('Nivaas Trusted Partners');
              setSelectedService(null); 
            }}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'Nivaas Trusted Partners' && styles.selectedTabText
            ]}>
              Nivaas Trusted Partners
            </Text>
          </Pressable>
        </View>
        <SearchScreen query={query} setQuery={setQuery} suggestions={suggestions} />
        <View style={styles.servicesCon}>
          {filteredServices.length > 0 ? (
            <FlatList
              data={filteredServices}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleServicePress(item)}
                  style={styles.eachServiceCon}>
                  <View style={[styles.imageBg,selectedTab === 'Nivaas Trusted Partners' && selectedService?.id === item.id && { borderColor: colors.primaryColor, borderWidth: 2 }]}>
                    <Image source={item.uri} style={{ height: 50, width: 50 }} />
                  </View>
                  <Text style={styles.textStyle}>{item.name}</Text>
                </Pressable>
              )}
              numColumns={4} 
              contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No Services found</Text>
          )}
        </View>
      </ScrollView>
      {/* {selectedTab === 'Apartment Services' && showApartmentServicesTab && (
        <PlusButton navigation={navigation} screenName={allTexts.screenNames.addService} />
      )} */}
      {selectedTab === 'Nivaas Trusted Partners' && selectedService && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <PrimaryButton text={'Book Service'} bgColor={colors.primaryColor}/>
        </View>
      )}
    </View>
  );
};

export default Services;