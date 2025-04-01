import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Easing,
  Linking,
  Alert,
  Image,
} from 'react-native';
import { DefaultTopBarOne, getNewAuthToken, SnackbarComponent } from '../../common/customFunctions';
import { colors } from '../../common';
import SearchScreen from '../../components/searchbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAddDefaultPartnerMutation, useLazyGetApartmentServiceProvidersQuery } from '../../redux/services/nivaasServicesService';
import { styles } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components';

const EachServicelist = ({ navigation, route }) => {
  const { name ,id} = route.params || {};  
  const dispatch = useDispatch();
  const { selectedApartment } = useSelector(state => state.cityData);  
  const [loader, setloader] = useState(false);
  const [query, setQuery] = useState('');
  const [defaultService, setDefaultService] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [servicePartnersData, setservicePartnersData] = useState();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [getApartmentserviceProviders] = useLazyGetApartmentServiceProvidersQuery();
  const [addDefultPartner] = useAddDefaultPartnerMutation();

  // Filter services based on query
  const filteredServices = servicePartnersData?.filter(item => {
    const lowerCaseQuery = query?.toLowerCase();
    const serviceNameMatch = item?.partnerResponse?.name?.toLowerCase()?.includes(lowerCaseQuery);
    const mobileMatch = item?.partnerResponse?.primaryContact?.includes(lowerCaseQuery);
    return serviceNameMatch || mobileMatch;
  });
  const suggestions = [
    'Search Here...',
  ];

  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const toggleOptions = (id) => {
    if (showOptions === id) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowOptions(null);
      });
    } else {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
      setShowOptions(id);
    }
  };

  const handleSetAsDefault = (item) => {
    animatedValue.setValue(0);
    const payload = {
      apartmentId: selectedApartment?.id,
      categoryId: item?.services[0]?.categoryId,
      partnerId: item?.id
    }    
    addDefultPartner(payload)
      .unwrap()
      .then((responce) => {
        // console.log('RES OF ADD DEFAULT PARTNER', responce);
        setDefaultService(item.id);
        setShowOptions(null);
        handlepartnersList();
      }).catch((error) => {
        console.log('ERR IN ADD DEFAULT PARTNER', error);
      })
  };

  const handlepartnersList = () => {
    const payload = {
      apartmentId: selectedApartment?.id,
      categoryId:id
    }
    setloader(true);
    getApartmentserviceProviders(payload)
      .unwrap()
      .then((responce) => {
        setloader(false);
        // console.log('RES OF SERVICE PARTNERS', responce);
        setservicePartnersData(responce);
      }).catch((error) => {
        setloader(false);
        console.log('ERR IN SERVICE PARTNERS ', error);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
        if (error?.data?.errorCode === 1027) {
          SnackbarComponent({text:error?.data?.errorMessage || 'Service Providers Not Available',backgroundColor: colors.red3});
        }
      })
  }

  const renderServiceItem = ({ item }) => {
    const isDefault = item.id === defaultService;
    const optionsVisible = showOptions === item.id;

    const animatedStyle = {
      opacity: optionsVisible ? animatedValue : 1,
      transform: [{ scale: optionsVisible ? animatedValue : 1 }],
    };
    return (
      <View style={styles.serviceItem}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.serviceName}>{item?.partnerResponse?.name || 'NA'}</Text>
            {isDefault && (
              <FontAwesome name="check-circle" size={18} color={colors.primaryColor} style={{ marginLeft: 8 }} />
            )}
          </View>
          {/* <TouchableOpacity onPress={() => toggleOptions(item.id)}>
            <MaterialIcons name="more-vert" size={24} color={colors.black} />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity onPress={() => openDialer(item?.mobile)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name='call' size={20} color={colors.primaryColor} />
          <Text style={styles.mobile}>{item?.partnerResponse?.primaryContact}</Text>
        </TouchableOpacity>
        {optionsVisible && (
          <Animated.View style={[styles.optionsContainer, animatedStyle]}>
            <TouchableOpacity onPress={() => handleSetAsDefault(item)} style={styles.optionButton}>
              <Text style={styles.optionText}>Set as Default</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    );
  };

  useEffect(() => {
    handlepartnersList();
  }, [])

  return (
    <View style={styles.container}>
      {DefaultTopBarOne(navigation, 0,(name === 'Lift Service') ? name : `${name} Services`)}
      {
        loader ? (
          <View>
          <Loader
            color={colors.primaryColor}
            size={'large'}
            marginTop={'80%'}
          />
        </View>
        ) : (
          <View>
          <View style={{ marginVertical: '5%' }}>
            <SearchScreen
              query={query}
              setQuery={setQuery}
              suggestions={suggestions}
            />
          </View>
          <FlatList
            data={filteredServices}
            renderItem={renderServiceItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../utils/assets/images/dataNotFoundImage.png')}
                  style={{height: 300, width: 300}}
                />
              </View>
            )}
          />
        </View>
        )
      }
    </View>
  );
};

export default EachServicelist;