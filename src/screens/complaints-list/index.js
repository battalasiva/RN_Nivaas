import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  DefaultTopBarOne,
  formatDate,
  getNewAuthToken,
  SnackbarComponent,
} from '../../common/customFunctions';
import {
  DefaultApartmentComp,
  FilterModelComp,
  Loader,
  SortModalComponent,
  UpdateComplaintStatusModel,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLazyGetAdminsDataQuery,
  useLazyGetComplaintsDataQuery,
  useUpdateComplaintStatusMutation,
} from '../../redux/services/nivaasServicesService';
import { FlatList } from 'react-native';
import { allTexts, colors } from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './style';
import { useLazyGetFlatOwnersQuery } from '../../redux/services/myAccountService';
import { Entypo } from '../../common/icons';

const PAGE_SIZE = 10;
const ComplaintsList = ({ navigation }) => {
  const { selectedApartment } = useSelector(state => state.cityData);
  const { customerOnboardReqData } = useSelector(state => state.currentCustomer);
  const dispatch = useDispatch();
  const [complaintsData, setComplaintsData] = useState([]);
  // console.log(complaintsData,'DATA');

  const [loader, setLoader] = useState(false);
  const [filteredFlatsData, setFilteredFlatsData] = useState([]);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sortbyModalVisible, setSortbyModalVisible] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [updateModelVisible, setUpdateModelVisible] = useState(false);
  const [SelectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState({ id: null, name: '' });
  const [adminsData, setAdminsData] = useState(null);
  const [assignedAdmin, setAssignedAdmin] = useState({ id: null, fullName: '' });
  const [alertModel, setAlertModel] = useState({ state: false, item: null });
  const [complaintStatus, setcomplaintStatus] = useState(null);
  const userId = customerOnboardReqData?.user?.id;
  console.log(userId, 'USERID');

  const optionsData = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Owner' },
  ]
  const [getComplaintsData] = useLazyGetComplaintsDataQuery();
  const [updateComplaintStatus] = useUpdateComplaintStatusMutation();
  const [getAdminsData] = useLazyGetAdminsDataQuery();
  const [getFlatOwners] = useLazyGetFlatOwnersQuery();

  const toggleDescription = itemId => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const isDescriptionExpanded = itemId => expandedItems[itemId];

  const filterOptions = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In_Progress', value: 'IN_PROGRESS' },
    { label: 'Resolved', value: 'RESOLVED' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'Rejected', value: 'REJECTED' },
  ];
  const sortOptions = [
    {
      label: 'Title (A - Z)',
      type: 'nameAsc',
      sortFunction: data => data.sort((a, b) => a.title.localeCompare(b.title)),
    },
    {
      label: 'Title (Z - A)',
      type: 'nameDesc',
      sortFunction: data => data.sort((a, b) => b.title.localeCompare(a.title)),
    },
  ];

  const handleOnSort = sortedData => {
    setFilteredFlatsData(sortedData);
  };

  const handleEditIconModel = (item) => {
    setUpdateModelVisible(true);
    setSelectedItem(item);
    setcomplaintStatus(item?.status);
  }

  const handleStatusColor = status => {
    switch (status) {
      case 'OPEN':
        return {
          color: colors.green5,
        };
      case 'IN_PROGRESS':
        return {
          color: colors.yellowColor,
        };
      case 'RESOLVED':
        return {
          color: colors.green5,
        };
      case 'CLOSED':
        return {
          color: colors.red3,
        };
      default:
        return {
          color: colors.red3,
        };
    }
  };

  const handleGetAdminsData = (type, itemId) => {
    setSelectedComplaintId(itemId?.id);
    setAlertModel({ state: false, item: itemId });
    if (type === 'Admin') {
      const payload = {
        apartmentId: selectedApartment?.id,
      };
      getAdminsData(payload)
        .unwrap()
        .then(response => {
          // console.log(response,'RES OF ADMINDATA');
          const extractedData = response?.filter(item => item?.id !== userId)?.map(item => ({
            fullName: item?.fullName,
            id: item?.id,
          }));
          setAdminsData(extractedData);
        })
        .catch(error => {
          if (error?.data?.status === 401) {
            getNewAuthToken(dispatch);
          }
          console.log(error, 'ERRR IN ADMIN DATA');
        });
    } else {
      const payload = {
        apartmentID: selectedApartment?.id,
        pageNo: 0,
        pageSize: 200,
      };
      // console.log(payload);
      getFlatOwners(payload)
        .unwrap()
        .then(response => {
          // console.log('response OF FLAT OWNERS',response?.data);
          const uniqueData = response?.data?.filter(
            (item, index, self) =>
              index === self?.findIndex(t => t.id === item.id),
            item => item?.id !== userId,
          );
          setAdminsData(uniqueData);
        })
        .catch(error => {
          if (error?.data?.status === 401) {
            getNewAuthToken(dispatch);
          }
          console.log('ERROR IN FLAT OWNERS', error);
        });
    }
  };

  const handlegetComplaintsData = async (page = 0) => {
    // if (loader || !hasMore) return;
    setLoader(true);
    const payload = {
      apartmentId: selectedApartment?.id,
      page: page,
      size: PAGE_SIZE,
    };
    try {
      const response = await getComplaintsData(payload).unwrap();
      // console.log(response?.content);
      const newComplaints = response?.content?.map(item => ({
        ...item,
        selectedStatus: null,
        reassign: null,
        canEditComplaint: (userId !== item?.createdBy) && ((customerOnboardReqData?.user?.roles?.includes(allTexts.roles.flatOwner) || (selectedApartment?.admin && selectedApartment?.approved))),
      }));
      setComplaintsData(prevData =>
        page === 0 ? newComplaints : [...prevData, ...newComplaints],
      );
      setHasMore(newComplaints.length === PAGE_SIZE);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setHasMore(false);
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      setLoader(false);
    }
  };
  const loadMoreData = () => {
    if (!hasMore || loader) return;
    const nextPage = page + 1;
    setPage(nextPage);
    handlegetComplaintsData(nextPage);
  };
  const refreshData = async () => {
    setIsRefreshing(true);
    setPage(0);
    await handlegetComplaintsData(0);
    setIsRefreshing(false);
  };
  const renderFooter = () => {
    if (!loader) return null;
    return (
      <Loader color={colors.primaryColor} size={'small'} marginTop={'5%'} />
    );
  };

  const handleupdateComplaintStatus = (id, status, assignedTo) => {
    const payload = {
      id: id,
      status: status !== null ? status : complaintStatus,
      assignedTo: assignedTo || SelectedItem?.assignedTo
    };
    // console.log(payload,'PAYLOAD');
    updateComplaintStatus(payload)
      .unwrap()
      .then(response => {
        console.log('RES OF UPDATECOMPLAINT STATUS', response);
        handlegetComplaintsData(0);
        setUpdateModelVisible(false)
        setSelectedComplaintId(null);
        setAssignedAdmin({ id: null, fullName: '' });
        SnackbarComponent({
          text: 'Complaint Status Changed',
          backgroundColor: colors.green5,
        });
      })
      .catch(error => {
        console.log('ERR IN UPDATED COMPLAINTS STATUS', error);
        SnackbarComponent({
          text: 'Complaints not updated',
          backgroundColor: colors.red3,
        });
      });
  };

  const handlefilterCompaints = useCallback(() => {
    const filtered = complaintsData?.filter(flat => {
      const matchesRoles =
        selectedRoles?.length === 0 || selectedRoles?.includes(flat.status);
      return matchesRoles;
    });
    setFilteredFlatsData(filtered);
  }, [complaintsData, selectedRoles]);
  useEffect(() => {
    handlegetComplaintsData(0);
  }, []);

  useEffect(() => {
    handlefilterCompaints();
  }, [selectedRoles, handlefilterCompaints]);

  const renderComplaintListItem = ({ item }) => {
    const { color } = handleStatusColor(item?.status);
    return (
      <View>
        <Pressable style={styles.eachcard}>
          <View style={{ width: '100%', overflow: 'hidden' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <View style={{ width: '100%', overflow: 'hidden' }}>
                  <Text numberOfLines={1} style={styles.eachTitle}>
                    {item?.title}
                  </Text>
                </View>
              </View>
              {
                (item?.canEditComplaint) && (
                  <Feather
                    name="edit"
                    size={20}
                    color={(item?.canEditComplaint) ? colors.primaryColor : colors.gray}
                    onPress={() => (item?.canEditComplaint) ? handleEditIconModel(item) : SnackbarComponent({
                      text: 'Admin only have access',
                      backgroundColor: colors.yellowColor,
                    })}
                  />
                )
              }
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* <Text style={styles.creationDate}>Assigned To : Siva</Text> */}
              <Text style={styles.creationDate}>
                Raised On : {formatDate(item?.assignedOn, true, false)}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Status : </Text>
                <Text style={[styles.creationDate, { color: color, fontWeight: '500' }]}>{item?.status}</Text>
              </View>
            </View>
            <Text style={styles.eachDescription}>
              {isDescriptionExpanded(item?.id)
                ? item?.description
                : item?.description?.slice(0, 50) +
                (item?.description?.length > 50 ? '...' : '')}
            </Text>
            {item?.description?.length > 50 && (
              <Pressable onPress={() => toggleDescription(item?.id)}>
                <Text style={styles.readMoreText}>
                  {isDescriptionExpanded(item?.id) ? 'Read Less' : 'Read More'}
                </Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Complaints')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      {loader && page === 0 ? (
        <Loader color={colors.primaryColor} marginTop={'50%'} size={'large'} />
      ) : (
        <FlatList
          data={filteredFlatsData}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: '5%', marginBottom: '18%' }}
          renderItem={renderComplaintListItem}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../utils/assets/images/dataNotFoundImage.png')}
                style={{ height: 300, width: 300 }}
              />
            </View>
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          refreshing={isRefreshing}
          ListFooterComponent={renderFooter}
          onRefresh={refreshData}
        />
      )}
      <View style={styles.apartmentServicesCon}>
        <Pressable
          onPress={() => setSortbyModalVisible(true)}
          style={styles.eachService}>
          <Ionicons name="arrow-down-circle" size={30} color={colors.white} />
          <Text style={styles.eachText}>Sort By</Text>
        </Pressable>
        {selectedApartment?.admin && selectedApartment?.approved && (
          <Pressable
            onPress={() =>
              navigation.navigate(allTexts.screenNames.raiseRequest)
            }>
            <View style={styles.eachService}>
              <Entypo name="squared-plus" size={25} color={colors.white} />
              <Text style={styles.eachText}>Raise Request</Text>
            </View>
          </Pressable>
        )}
        <Pressable
          onPress={() => setFilterModalVisible(true)}
          style={styles.eachService}>
          <Ionicons name="filter-circle-sharp" size={30} color={colors.white} />
          <Text style={styles.eachText}>Filter</Text>
        </Pressable>
      </View>
      <FilterModelComp
        filterModalVisible={filterModalVisible}
        setFilterModalVisible={setFilterModalVisible}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        filterOptions={filterOptions}
        filterTitle="Apply Filter"
      />
      <SortModalComponent
        sortbyModalVisible={sortbyModalVisible}
        setSortbyModalVisible={setSortbyModalVisible}
        filteredData={filteredFlatsData}
        handleOnSort={handleOnSort}
        sortOptions={sortOptions}
        sortTitle="Sort By"
      />
      <UpdateComplaintStatusModel selectedApartment={selectedApartment} alertModel={alertModel} adminsData={adminsData} navigation={navigation} updateModelVisible={updateModelVisible} setUpdateModelVisible={setUpdateModelVisible} setSelectedTab={setSelectedTab} setAssignedAdmin={setAssignedAdmin} setcomplaintStatus={setcomplaintStatus} SelectedItem={SelectedItem} optionsData={optionsData} assignedAdmin={assignedAdmin} handleGetAdminsData={handleGetAdminsData} selectedTab={selectedTab} handleupdateComplaintStatus={handleupdateComplaintStatus} complaintStatus={complaintStatus} />
    </View>
  );
};
export default ComplaintsList;