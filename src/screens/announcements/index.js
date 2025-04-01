import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  useLazyGetAllNoticesQuery,
  usePostNoticeMutation,
} from '../../redux/services/notificationService';
import {
  DefaultTopBarOne,
  formatDate,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import {useFocusEffect} from '@react-navigation/native';
import {DefaultApartmentComp, Loader, PrimaryButton, TopBarCard2} from '../../components';
import {styles} from './style';
import PlusButton from '../../components/plus-button';
import {allTexts, colors} from '../../common';

const PAGE_SIZE = 10;

const AnnouncementsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedApartment} = useSelector(state => state.cityData);
  const hasFetched = useRef(false);
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [announcementData, setAnnouncementData] = useState([]);
  const [currentItemData, setCurrentItemData] = useState(null);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [edit, setEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [getNotices] = useLazyGetAllNoticesQuery();
  const [updateNotice] = usePostNoticeMutation();

  const handleGetNotices = useCallback(async (pageNumber = 0) => {
    if (!hasMore && pageNumber !== 0) return; 
    if (loader) return;
    setLoader(true);

    try {
      const payload = {
        apartmentId: selectedApartment?.id,
        pageNo: pageNumber,
        pageSize: PAGE_SIZE,
      };
      const response = await getNotices(payload).unwrap();

      if (response?.data?.length > 0) {
        setAnnouncementData(prevData =>
          pageNumber === 0 ? response?.data : [...prevData, ...response?.data],
        );
        setHasMore(response?.data?.length === PAGE_SIZE); 
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log('ERROR IN GET NOTICES', error);
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
    } finally {
      setLoader(false);
      setIsRefreshing(false);
    }
  }, [getNotices, loader, hasMore, selectedApartment, dispatch]);

  const openModal = item => {
    setModalVisible(true);
    setCurrentItemData(item);
    setEditedMessage(item?.body);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleUpdateMessage = async () => {
    const updatedData = {...currentItemData, body: editedMessage};
    const payload = {
      id: currentItemData?.id,
      title: currentItemData?.title,
      body: updatedData?.body,
      apartmentId: currentItemData?.apartmentId,
    };

    try {
      await updateNotice(payload).unwrap();
      setEdit(false);
      setModalVisible(false);
      SnackbarComponent({
        text: 'Notice Updated Successfully',
        backgroundColor: colors.green5,
      });
      handleGetNotices(0); 
    } catch (error) {
      console.log('ERROR IN UPDATE NOTICE', error);
      SnackbarComponent({
        text: 'Error in Notice Updation',
        backgroundColor: colors.red3,
      });
    }
  };

  const loadMoreData = () => {
    if (!loader && hasMore) {
      setPage(prevPage => prevPage + 1);
      handleGetNotices(page + 1);
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setPage(0);
    setAnnouncementData([]);
    setHasMore(true);
    handleGetNotices(0);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEdit(false);
    setCurrentItemData(null);
    setEditedMessage('');
  };

  const renderFooter = () => {
    if (!loader || isRefreshing) return null;
    return <Loader color={colors.primaryColor} size="small" marginTop="5%" />;
  };

  useFocusEffect(
    useCallback(() => {
      if (!hasFetched.current) {
        hasFetched.current = true;
        handleGetNotices(0);
      }
    }, [handleGetNotices]),
  );

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Announcements', true)}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={styles.bodyCon}>
        {loader && page === 0 ? (
          <Loader color={colors.primaryColor}/>
        ) : (
          <FlatList
            data={announcementData}
            keyExtractor={item => item?.id?.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Pressable onPress={() => openModal(item)} style={styles.eachcard}>
                <View style={{width: '95%', overflow: 'hidden'}}>
                  <Text numberOfLines={1} style={styles.eachTitle}>
                    {item?.title}
                  </Text>
                  <Text style={styles.creationDate}>
                    Posted By: {item?.postedBy} On{' '}
                    {formatDate(item?.publishTime, true, false)}
                  </Text>
                </View>
                <AntDesign name="right" size={20} color={colors.black} />
              </Pressable>
            )}
            ListEmptyComponent={() => (
              <View style={styles.noDataText}>
                <Image
                  source={require('../../utils/assets/images/dataNotFoundImage.png')}
                  style={{height: 300, width: 300}}
                />
              </View>
            )}
            contentContainerStyle={{paddingBottom:'50%'}}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            refreshing={isRefreshing}
            ListFooterComponent={renderFooter}
            onRefresh={refreshData}
          />
        )}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleModalClose}>
          <View style={styles.overlay}>
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                  <TopBarCard2
                    navigation={navigation}
                    txt="Message"
                    edit={
                      selectedApartment?.admin &&
                      selectedApartment?.approved &&
                      !edit
                    }
                    onPress={handleEdit}
                  />
                  <AntDesign
                    name="arrowleft"
                    size={26}
                    color={colors.white}
                    style={styles.CrossIcon}
                    onPress={handleModalClose}
                  />
                </View>
                <Text style={styles.titleText}>{currentItemData?.title}</Text>
                {edit ? (
                  <View>
                    <TextInput
                      placeholder="Edit Message"
                      value={editedMessage}
                      style={styles.input}
                      onChangeText={value => setEditedMessage(value)}
                      multiline={true}
                      maxLength={1000}
                    />
                    <View
                      style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                      <PrimaryButton
                        text="UPDATE"
                        bgColor={colors.primaryColor}
                        onPress={handleUpdateMessage}
                      />
                    </View>
                  </View>
                ) : (
                  <Text style={styles.messageText}>
                    {currentItemData?.body}
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
      {selectedApartment?.approved && selectedApartment?.admin && (
        <PlusButton
          navigation={navigation}
          screenName={allTexts.screenNames.addNotice}
        />
      )}
    </View>
  );
};

export default AnnouncementsScreen;