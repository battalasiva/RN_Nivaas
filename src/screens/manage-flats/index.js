import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  DefaultApartmentComp,
  EditOnBoarderFlatDetailsModal,
  Loader,
  QRCodeModal,
  SaleAndRentModal,
  SortModalComponent,
} from '../../components';
import {allTexts, colors} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './style';
import {
  useFlatOwnerApprovelMutation,
  useLazyGetFlatOwnerDetailsQuery,
  useRejectRequestMutation,
  useRemoveRequestMutation,
  useRemoveTenantMutation,
  useTenantApprovelMutation,
} from '../../redux/services/cityServices';
import {useUpdateFlatDetailsMutation} from '../../redux/services/maintainenceService';
import {
  DefaultTopBarOne,
  getNewAuthToken,
  getResidentTypeLabel,
  SnackbarComponent,
} from '../../common/customFunctions';
import {useFocusEffect} from '@react-navigation/native';
import SearchScreen from '../../components/searchbar';
import FilterModalAdv from '../../components/filterModalAdv';
import { MaterialCommunityIcons,AntDesign,MaterialIcons ,Fontisto,Ionicons,Entypo} from '../../common/icons';

const ManageFlats = ({navigation}) => {
  const {selectedApartment} = useSelector(state => state.cityData);
  const customerDetails = useSelector(state => state.currentCustomer);
  const dispatch = useDispatch();
  const allowedRoles = [
    allTexts.roles.apartmentAdmin,
    allTexts.roles.flatOwner,
    allTexts.roles.flatTenant,
    allTexts.roles.familyMember,
  ];
  const [data, setData] = useState([]);
  const [filteredFlatsData, setFilteredFlatsData] = useState(data);
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState('');
  const [qrCodeModal, setqrCodeModal] = useState(false);
  const [saleAndRentModal, setsaleAndRentModal] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [sortbyModalVisible, setSortbyModalVisible] = useState(false);
  const [isModalVisible, setIsmodalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    userCategory: [],
    status: [],
  });
  
  const filterOption = {
    userCategory: [
      { label: 'Tenant', value: 'TENANT' },
      { label: 'Flat Owner', value: 'FLAT_OWNER' },
      { label: 'Family Member', value: 'FLAT_OWNER_FAMILY_MEMBER' },
    ],
    status: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
    ],
  };

  const toggleModal = () => {
    setIsmodalVisible(!isModalVisible);
  };

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
      const filteredItems = data.filter((item) => {
      const itemStatus = item.approved ? 'active' : 'pending';
      const categoryMatch = filters?.userCategory?.length === 0 || filters.userCategory.includes(item.residentType);
      const statusMatch = filters?.status?.length === 0 || filters.status.includes(itemStatus);
      return categoryMatch && statusMatch;
    });    
    setFilteredFlatsData(filteredItems);
    setIsmodalVisible(false);
  };
  
  const clearFilters = () => {
    setSelectedFilters({ userCategory: [], status: [] });
    setFilteredFlatsData(data);
  };
  const [getFlatOwnerDetails] = useLazyGetFlatOwnerDetailsQuery();
  const [updateOnboardedFlatDetails] = useUpdateFlatDetailsMutation();
  const [approveTenant] = useTenantApprovelMutation();
  const [approveFlatowner] = useFlatOwnerApprovelMutation();
  const [removeTenant] = useRemoveTenantMutation();
  const [rejectRequest] = useRejectRequestMutation();

  const suggestions = ['Search for Flats', 'Search for Flats'];

  const sortOptions = [
    {
      label: "Flat Number (Low - High)",
      type: "flatLowHigh",
      sortFunction: (data) => data.sort((a, b) => a.flatNo.localeCompare(b.flatNo, undefined, { numeric: true }))
    },
    {
      label: "Flat Number (High - Low)",
      type: "flatHighLow",
      sortFunction: (data) => data.sort((a, b) => b.flatNo.localeCompare(a.flatNo, undefined, { numeric: true }))
    },
    {
      label: "Name (A - Z)",
      type: "nameAsc",
      sortFunction: (data) => data.sort((a, b) => a.name.localeCompare(b.name))
    },
    {
      label: "Name (Z - A)",
      type: "nameDesc",
      sortFunction: (data) => data.sort((a, b) => b.name.localeCompare(a.name))
    }
  ];
  
  const handleEditDetails = (field, value) => {
    setSelectedFlat({...selectedFlat, [field]: value});
  };

  const filterFlats = useCallback(() => {
    const filtered = data?.filter(flat => {
      const matchesQuery = flat?.flatNo
        .toLowerCase()
        ?.includes(query.toLowerCase());
      const matchesRoles =
        selectedRoles?.length === 0 ||
        selectedRoles?.includes(flat.residentType);
      return matchesQuery && matchesRoles;
    });
    setFilteredFlatsData(filtered); 
  }, [data, query, selectedRoles]);

  const handleOnSort = sortedData => {
    setFilteredFlatsData(sortedData);
  };

  useEffect(() => {
    filterFlats();
  }, [query, selectedRoles, filterFlats]);
  const handleflatsdetails = () => {
    setLoader(true);
    const payload = {
      apartmentID: selectedApartment?.id,
    };
    // console.log(payload);
    getFlatOwnerDetails(payload)
      .unwrap()
      .then(response => {
        // console.log('RES OF FLAT DETAILS', response);
        const flatDataWithKeys = response.map((item, index) => ({
          ...item,
          key: `${item.flatNo}-${index}-${Date.now()}`,
        }));
        setData(flatDataWithKeys);
        setLoader(false);
      })
      .catch(error => {
        console.log('error In FLAT DETAILS', error);
        setLoader(false);
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
        // if (error?.data?.errorCode === 1003) {
        //   SnackbarComponent({text:error?.data?.errorMessage || 'Error in Getting Flat details',backgroundColor: colors.red3});
        // }
      });
  };

  const handleUpdateDetails = () => {
    const flatPayload = {
      apartmentId: selectedApartment?.id,
      flatId: selectedFlat?.flatId,
      payload: {
        flatNo: selectedFlat?.flatNo,
        ownerPhoneNo: selectedFlat?.contactNumber,
        ownerName: selectedFlat?.name,
      },
    };
    // console.log(flatPayload);
    updateOnboardedFlatDetails(flatPayload)
      .unwrap()
      .then(response => {
        console.log('response updateOnboardedFlatDetails', response);
        SnackbarComponent({
          text: response?.message || 'Flats data Updated',
          backgroundColor: colors.green5,
        });
        handleflatsdetails();
      })
      .catch(error => {
        console.log('ERROR IN updateOnboardedFlatDetails', error);
        SnackbarComponent({
          text: 'Failed To Update',
          backgroundColor: colors.red3,
        });
      });
  };

  const handleRejectRequest = (onboardingRequestId,userId) => {
    const payload = {
      userId:userId,
      onboardingRequestId:onboardingRequestId
    }
    console.log(payload,'LLLLLLLL');
    rejectRequest(payload)
      .unwrap()
      .then((responce)=>{
        console.log(responce);
        SnackbarComponent({
          text: responce?.message || 'User removed Successfully',
          backgroundColor: colors.green5,
        });
        handleflatsdetails();
      }).catch((error)=>{
        console.log(error);
      })
  }
  const handleApproveTenants = (id, relatedType, relatedUserId) => {
    const payload = {
      id: id,
      relatedType: relatedType,
      relatedRequestId: relatedUserId,
    };
    console.log(payload);
    if (approvalStatus === null) {
      approveTenant(payload)
        .unwrap()
        .then(response => {
          console.log('RES OF TENANT/FAMILY_MEMBER APPROVEL', response);
          SnackbarComponent({
            text:
              relatedType === 'TENANT'
                ? 'Tenant Approved'
                : 'Family Member Approved' || 'Approved',
            backgroundColor: colors.green5,
          });
          setApprovalStatus('Approved');
          setModalVisible(false);
          handleflatsdetails();
        })
        .catch(error => {
          console.log('ERR ON TENANT/FAMILY_MEMBER APPROVAL', error);
          if (error?.data?.errorCode === 1031) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'Not a valid owner to approve',
              backgroundColor: colors.red3,
            });
          } else if (error?.data?.errorCode === 1038) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'Not a valid owner to approve',
              backgroundColor: colors.red3,
            });
          } else {
            SnackbarComponent({
              text: error?.message || 'Not a valid owner to approve',
              backgroundColor: colors.red3,
            });
          }
        });
    }
  };
  const handleApproveFlatOwners = id => {
    const payload = {
      id: id,
      type: 'FLAT',
    };
    // console.log(payload, 'payload');
    if (approvalStatus === null) {
      approveFlatowner(payload)
        .unwrap()
        .then(response => {
          console.log('RES OF FLATOWNERS APPROVEL', response);
          setApprovalStatus('Approved');
          handleflatsdetails();
          SnackbarComponent({
            text: response?.message || 'Flat Approved',
            backgroundColor: colors.green5,
          });
          setModalVisible(false);
        })
        .catch(error => {
          console.log('ERR ON FLATOWNERS APPROVAL', error);
          if (error?.data?.errorCode === 1011) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'Not a valid owner to approve',
              backgroundColor: colors.red3,
            });
          } else {
            SnackbarComponent({
              text: 'Not a valid owner to approve',
              backgroundColor: colors.red3,
            });
          }
        });
    }
  };
  const handleremovingTenantsApi = (onboardingRequestId, relatedUserId) => {
    const payload = {
      relatedUserId: relatedUserId,
      onboardingRequestId: onboardingRequestId,
    };
    console.log(payload,'REMOVE TENANT');
    removeTenant(payload)
      .unwrap()
      .then(responce => {
        SnackbarComponent({
          text: responce?.message || 'Tenant removed Successfully',
          backgroundColor: colors.green5,
        });
        handleflatsdetails();
      })
      .catch(error => {
        // console.log('ERR IN TENANT REMOVAL',error);
        if (error?.data?.errorCode === 1041) {
          SnackbarComponent({
            text: error?.data?.errorMessage || 'Tenant not removed',
            backgroundColor: colors.red3,
          });
        } else if (error?.data?.errorCode === 1041) {
          SnackbarComponent({
            text: error?.data?.errorMessage || 'Tenant not removed',
            backgroundColor: colors.red3,
          });
        } else {
          SnackbarComponent({
            text: 'Tenant removal failed',
            backgroundColor: colors.red3,
          });
        }
      });
  };
  const handleRemoveUser = (onboardingRequestId, relatedUserId, type) => {
    // console.log(onboardingRequestId,relatedUserId,type,'PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP');
    
    const alertTitle = type === 'tenant' ? 'Do you want to remove Tenant?' : 'Do you want to remove Request?';
    const alertMessage = type === 'tenant' 
        ? 'Tenant will be removed permanently.' 
        : 'Request will be removed permanently.';
    Alert.alert(
        alertTitle,
        alertMessage,
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {type === 'tenant' ? handleremovingTenantsApi(onboardingRequestId, relatedUserId) : handleRejectRequest(onboardingRequestId, relatedUserId)},
            },
        ],
        { cancelable: false }
    );
};

  const handleGetButtonTitle = item => {
    if (
      item?.approved === true &&
      selectedApartment?.admin &&
      selectedApartment?.approved
    ) {
      return 'Veiw Details';
    } else if (
      item?.approved === false &&
      ((selectedApartment?.admin && selectedApartment?.approved) ||
        customerDetails?.customerOnboardReqData?.user?.roles?.includes(
          allTexts.roles.flatOwner,
        ))
    ) {
      return 'Approve';
    } else {
      return 'View Details';
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.mainCardCon}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.flatText}>{item.flatNo}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {item?.residentType === 'TENANT' &&
            item?.approved &&
            ((selectedApartment?.admin && selectedApartment?.approved) ||
              customerDetails?.customerOnboardReqData?.user?.roles?.includes(
                allTexts.roles.flatOwner,
              )) && (
              <MaterialCommunityIcons
                name="delete-circle"
                size={28}
                color={colors.primaryColor}
                onPress={() => handleRemoveUser(item?.id, item?.userId,'tenant')}
                style={{color: colors.red3, paddingRight: '1.5%'}}
              />
          )}
          {item?.approved ? (
            <MaterialIcons name="verified" size={25} color={colors.green5} />
          ) : (
            <MaterialCommunityIcons
              name="clock"
              size={25}
              color={colors.yellowColor}  
            />
          )}
        </View>
      </View>
      <View style={styles.subCon}>
        <View style={styles.eachCon}>
          <Fontisto name="person" size={25} color={colors.black} />
          <Text style={{marginLeft: 10, fontSize: 17, color: colors.black}}>
            {item.name}
          </Text>
        </View>
          <Text style={{marginLeft: 10, fontSize: 17, color: colors.black}}>
            {getResidentTypeLabel(item?.residentType)}
          </Text>
      </View>
      <View style={styles.subCon}>
        <View style={styles.eachCon}>
          <Ionicons name="call" size={20} color={colors.black} />
          <Text style={{marginLeft: 10, fontSize: 17, color: colors.black}}>
            {item.contactNumber}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '2%',
          }}>
          <Pressable
            onPress={() => {
              setSelectedFlat(item);
              setModalVisible(true);
              setApprovalStatus(null);
            }}
            style={styles.cardButtons}>
            <Text style={styles.buttonsText}>
              {/* {item?.approved ? 'Update' : 'Approve'} */}
              {handleGetButtonTitle(item)}
            </Text>
          </Pressable>
          {item?.approved === false &&
            ((selectedApartment?.admin && selectedApartment?.approved) ||
              customerDetails?.customerOnboardReqData?.user?.roles?.includes(
                allTexts.roles.flatOwner,
              )) && (
              <Pressable onPress={()=>handleRemoveUser(item?.id,item?.userId,'user')} style={[styles.cardButtons, {marginLeft: '2%'}]}>
                <Text style={styles.buttonsText}>Reject</Text>
              </Pressable>
            )}
        </View>
      </View>
    </View>
  );
  useFocusEffect(
    useCallback(() => {
      handleflatsdetails();
    }, []),
  );

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Manage Flats', true)}
      {customerDetails?.customerOnboardReqData?.user?.roles?.some(role =>
        allowedRoles.includes(role),
      ) && <DefaultApartmentComp selectedApartment={selectedApartment} />}
      <View style={{marginTop: '5%'}}>
        <SearchScreen
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          marginHorizontal={'0%'}
        />
      </View>
      {/* <AntDesign name='qrcode' color={colors.white} size={25} onPress={()=>setqrCodeModal(!qrCodeModal)} style={{position:'absolute',top:Platform.OS === 'ios' ? '9%' : '5.5%',right:'5%'}}/> */}
      {loader ? (
        <Loader color={colors.primaryColor} size={'large'} marginTop={'50%'} />
      ) : (
        <FlatList
          data={filteredFlatsData}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          ListEmptyComponent={() => (
            <View style={styles.noDataText}>
              <Image
                source={require('../../utils/assets/images/dataNotFoundImage.png')}
                style={{height: 300, width: 300}}
              />
            </View>
          )}
        />
      )}
      <EditOnBoarderFlatDetailsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleEditDetails={handleEditDetails}
        customerDetails={customerDetails}
        selectedFlat={selectedFlat}
        handleApproveTenants={handleApproveTenants}
        handleApproveFlatOwners={handleApproveFlatOwners}
        handleUpdateDetails={handleUpdateDetails}
        approvalStatus={approvalStatus}
        setErrors={setErrors}
        errors={errors}
        selectedApartment={selectedApartment}
        setsaleAndRentModal={setsaleAndRentModal}
        navigation={navigation}
      />
      <View style={styles.apartmentServicesCon}>
        <Pressable
          onPress={() => setSortbyModalVisible(true)}
          style={styles.eachService}>
          <Ionicons name="arrow-down-circle" size={25} color={colors.white} />
          <Text style={styles.eachText}>Sort By</Text>
        </Pressable>
        {selectedApartment?.admin && selectedApartment?.approved && (
          <Pressable
            onPress={() =>
              navigation.navigate(allTexts.screenNames.flatsOnboarding)
            }>
            <View style={styles.eachService}>
              <Entypo name="squared-plus" size={25} color={colors.white} />
              <Text style={styles.eachText}>Onboard new flats</Text>
            </View>
          </Pressable>
        )}
        <Pressable
          onPress={() => setIsmodalVisible(true)}
          style={styles.eachService}>
          <Ionicons name="filter-circle-sharp" size={25} color={colors.white} />
          <Text style={[styles.eachText, {marginRight: 5}]}>Filter</Text>
        </Pressable>
      </View>
      <SortModalComponent
        sortbyModalVisible={sortbyModalVisible}
        setSortbyModalVisible={setSortbyModalVisible}
        filteredData={filteredFlatsData}
        handleOnSort={handleOnSort}
        sortOptions={sortOptions}
      />
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsmodalVisible(false)}>
        <FilterModalAdv
          filterOptions={filterOption}
          selectedFilters={selectedFilters}
          onApply={applyFilters}
          onClear={clearFilters}
          onClose={toggleModal}
          setIsmodalVisible={setIsmodalVisible}
        />
      </Modal>
      {/* <QRCodeModal
        visible={qrCodeModal}
        onClose={()=>setqrCodeModal(!qrCodeModal)}
        selectedApartmentID={selectedApartment?.id}
      /> */}
      {
        selectedFlat?.flatId && (
          <SaleAndRentModal
            modalVisible={saleAndRentModal}
            setModalVisible={setsaleAndRentModal}
            selectedFlatId={selectedFlat?.flatId}
          />
        )
      }
    </View>
  );
};

export default ManageFlats;