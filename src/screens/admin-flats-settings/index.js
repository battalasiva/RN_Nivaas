import {
  FlatList,
  Pressable,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultApartmentComp, TopBarCard2} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import {allTexts, colors} from '../../common';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {styles} from './style';
import { useLazyGetAdminFlatDetailsQuery, useLazyGetFlatOwnerDetailsQuery } from '../../redux/services/cityServices';

const AdminFlatSettings = ({navigation}) => {
  const {selectedApartment} = useSelector(state => state.cityData);
  const customerDetails = useSelector(state => state.currentCustomer);



  const [data, setData] = useState('');
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(null);

  const [getAdminFlatsDetails] = useLazyGetAdminFlatDetailsQuery();
  const [getFlatOwnerDetails] = useLazyGetFlatOwnerDetailsQuery()

  const handleEditDetails = (field, value) => {
    setSelectedFlat({...selectedFlat, [field]: value});
  };

  const saveDetails = () => {
    const updatedData = data.map(item =>
      item.flatId === selectedFlat.flatId ? selectedFlat : item,
    );
    setData(updatedData);
    setModalVisible(false);
  };

  const handleApprove = () => {
    setApprovalStatus('Approved');
  };

  const handleReject = () => {
    setApprovalStatus('Rejected');
  };

  const handleadminflatsdetails =()=>{
    if (customerDetails?.customerOnboardReqData?.user?.roles?.some(role => role === allTexts.roles.apartmentAdmin)) {
      getAdminFlatsDetails()
      .unwrap()
      .then((responce)=>{
        console.log('RES OF ADMIN FLATS DETAILS',responce);
      }).catch((error)=>{
        console.log('ERROR IN ADMIN FLATS DETAILS',error);
      })

    }else if (customerDetails?.customerOnboardReqData?.user?.roles?.some(role => role === allTexts.roles.flatOwner)) {
      const payload = {
        apartmentID: selectedApartment?.id,
      };
      getFlatOwnerDetails(payload)
      .unwrap()
      .then((responce)=>{
        console.log('RES OF FLATOWNER DETAILS',responce);
        setData(responce)
      }).catch((error)=>{
        console.log('error In FLAT OWNER DETAILS',error);
      })
    }else{
      console.log('You dont have Role');
    }
  }
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Flat No</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Name</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Resident</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Approve</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Details</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.row}>
      <View style={[styles.headerCellContainer, {paddingVertical: 5}]}>
        <Text style={styles.cell}>{item.flatNo}</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, {paddingVertical: 5}]}>
        <Text style={styles.cell}>{item.name}</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, {paddingVertical: 5}]}>
        <Text style={styles.cell}>{item.residentType}</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, {paddingVertical: 5}]}>
        <Text style={styles.cell}>{item.approved ? 'Yes' : 'No'}</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, {paddingVertical: 5}]}>
        <MaterialCommunityIcons
          name="eye-arrow-right"
          size={30}
          color={colors.primaryColor}
          onPress={() => {
            setSelectedFlat(item);
            setModalVisible(true);
            setApprovalStatus(null); 

          }}
        />
      </View>
    </View>
  );

  useEffect(() => {
   handleadminflatsdetails();
  }, [])
  
  return (
    <View style={styles.mainCon}>
      <View style={{height: 70, marginTop: statusBarHeight}}>
        <TopBarCard2 back={true} txt={'Manage Flats'} navigation={navigation} />
      </View>
      {
        customerDetails?.customerOnboardReqData?.user?.roles?.includes(allTexts.roles.apartmentAdmin) &&  <DefaultApartmentComp selectedApartment={selectedApartment} />
      }
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.flatId}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View>
                <Text style={styles.modalTitle}>Flat Details</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={selectedFlat?.flatNo}
                  onChangeText={value => handleEditDetails('flatNo', value)}
                  placeholder="Enter Flat No"
                  editable={customerDetails?.customerOnboardReqData?.roles?.includes(allTexts.roles.apartmentAdmin) ? true : false}
                />
                <TextInput
                  style={styles.input}
                  value={selectedFlat?.name}
                  onChangeText={value => handleEditDetails('name', value)}
                  placeholder="Enter Name"
                  editable={customerDetails?.customerOnboardReqData?.roles?.includes(allTexts.roles.apartmentAdmin) ? true : false}
                />
                <TextInput
                  style={styles.input}
                  value={selectedFlat?.contactNumber}
                  onChangeText={value => handleEditDetails('contact', value)}
                  placeholder="Enter Mobile Number"
                  editable={customerDetails?.customerOnboardReqData?.roles?.includes(allTexts.roles.apartmentAdmin) ? true : false}
                />
                <TextInput
                  style={styles.input}
                  value={selectedFlat?.residentType}
                  onChangeText={value => handleEditDetails('resident', value)}
                  placeholder="Enter Resident"
                  editable={customerDetails?.customerOnboardReqData?.roles?.includes(allTexts.roles.apartmentAdmin) ? false : false}
                />
                {customerDetails?.customerOnboardReqData?.user?.roles?.includes(
                  allTexts.roles.apartmentAdmin
                ) && selectedFlat?.approved === false && (
                  <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between',marginHorizontal:'2%'}}>
                    <Pressable
                      style={[
                        styles.saveButtons,
                        approvalStatus === 'Approved' && {backgroundColor: 'gray'},
                      ]}
                      onPress={handleApprove}>
                      <Text style={styles.saveButtonText}>
                        {approvalStatus === 'Approved' ? 'Approved' : 'Approve'}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[
                        styles.saveButtons,
                        approvalStatus === 'Rejected' && {backgroundColor: 'gray'},
                      ]}
                      onPress={handleReject}>
                      <Text style={styles.saveButtonText}>
                        {approvalStatus === 'Rejected' ? 'Rejected' : 'Reject'}
                      </Text>
                    </Pressable>
                  </View>
                  </View>
                )}
                {customerDetails?.customerOnboardReqData?.user?.roles?.includes(
                  allTexts.roles.apartmentAdmin,
                ) && selectedFlat?.approved === true && (
                  <Pressable style={styles.saveButton} onPress={saveDetails}>
                    <Text style={styles.saveButtonText}>UPDATE</Text>
                  </Pressable>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {customerDetails?.customerOnboardReqData?.user?.roles?.includes(
        allTexts.roles.apartmentAdmin,
      ) && (
        <View style={styles.apartmentServicesCon}>
          <Pressable
            onPress={() =>
              navigation.navigate(allTexts.screenNames.flatsOnboarding)
            }>
            <View style={styles.eachService}>
              <Entypo name="squared-plus" size={25} color={colors.white} />
              <Text style={styles.eachText}>Onboard new flats</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default AdminFlatSettings;
