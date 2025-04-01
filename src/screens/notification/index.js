import {
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { allTexts, colors } from '../../common';
import { FaqButton, Loader, NotificationCard, TopBarCard2 } from '../../components';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useClearAllNotificationsMutation, useLazyGetNotificationDataQuery } from '../../redux/services/notificationService';
import { styles } from './style';
import { getNewAuthToken } from '../../common/customFunctions';
import { useDispatch } from 'react-redux';

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationData, setNotificationData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false); 

  const [getNotificationData] = useLazyGetNotificationDataQuery();
  const [clearAllNotifications] = useClearAllNotificationsMutation();

  const handleNotificationCall = (reset = false) => {
    if (isDataLoaded && !reset) return; 
    if (reset) {
      setLoader(true);
      setPageNo(0); 
      setNotificationData([]);
    } else {
      setIsLoadingMore(true);
    }
    const payload = {
      pageNo: reset ? 0 : pageNo,
      pageSize: 20,
    };

    getNotificationData(payload)
      .unwrap()
      .then(response => {
        setLoader(false);
        setIsLoadingMore(false);
        const newData = response?.data || [];
        if (reset) {
          setNotificationData(newData);
          setIsDataLoaded(true); 
        } else {
          setNotificationData(prevData => [...prevData, ...newData]);
        }
        
        setHasMoreData(newData.length > 0); 
        if (!reset) setPageNo(prevPage => prevPage + 1); 
      })
      .catch(error => {
        setLoader(false);
        setIsLoadingMore(false);
        setHasMoreData(false);
        console.log('Error In Notification Data', error);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
      });
  };

  const handleClearAllNotifications = () => {
    clearAllNotifications()
      .unwrap()
      .then(() => handleNotificationCall(true))
      .catch(error => console.log(error));
  };

  const filteredNotifications = notificationData?.filter(
    notification =>
      notification?.title
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase()) ||
      notification?.message
        ?.toLowerCase()
        ?.includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    handleNotificationCall(true);
  }, []);

  const handleLoadMore = () => {
    if (hasMoreData && !isLoadingMore && !searchQuery) {
      handleNotificationCall();
    }
  };

  return (
    <View style={styles.mainCon}>
      {!searchVisible && (
        <View style={styles.topBar}>
          <TopBarCard2 back={true} navigation={navigation} txt={'Notifications'} />
          {notificationData.length > 0 && (
            <TouchableOpacity style={styles.icon} onPress={() => setSearchVisible(true)}>
              <Feather name="search" size={25} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {searchVisible && (
        <View style={styles.searchBar}>
          <TouchableOpacity
            onPress={() => {
              setSearchVisible(false);
              setSearchQuery('');
            }}>
            <Feather name="arrow-left" size={25} color={colors.black} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={25} color={colors.black} />
          </TouchableOpacity>
        </View>
      )}
      {loader ? (
        <View>
          <Loader color={colors.primaryColor} size={'large'} marginTop={'70%'} />
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <NotificationCard title={item?.type} message={item?.message} />
          )}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyView}>
              <Ionicons name="notifications-off" size={40} color={colors.primaryColor} />
              <Text style={styles.noDataText}>Notifications not available at the moment...</Text>
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => 
            isLoadingMore && hasMoreData ? (
              <ActivityIndicator size="small" color={colors.primaryColor} style={{ marginVertical: 10 }} />
            ) : null
          }
        />
      )}
      {notificationData.length > 0 && (
        <View style={styles.clearAllContainer}>
          <Pressable onPress={handleClearAllNotifications} style={styles.clearAllCon}>
          <Text style={styles.clearAllText}>Clear All</Text>
          <MaterialCommunityIcons name="notification-clear-all" size={25} color={colors.white} />
        </Pressable>
        </View>
      )}
    </View>
  );
};

export default Notification;