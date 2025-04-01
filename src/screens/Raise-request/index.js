import {
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultTopBarOne, SnackbarComponent} from '../../common/customFunctions';
import {useSelector} from 'react-redux';
import {allTexts, colors} from '../../common';
import {
  CustomDropdown,
  CustomSelectDropdown,
  DefaultApartmentComp,
  PrimaryButton,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './style';
import {validateComplaintFields} from '../../common/schemas';
import { useLazyGetAdminsDataQuery, useRaiseComplaintMutation, useRaiseServiceRequestMutation } from '../../redux/services/nivaasServicesService';

const RaiseRequest = ({navigation}) => {
  const {customerOnboardReqData} = useSelector(state => state.currentCustomer);  
  const {selectedApartment} = useSelector(state => state.cityData);
  const [loader, setLoader] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Complaint');
  const [title, setTitle] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [assignedAdmin, setAssignedAdmin] = useState('');
  
  const [serviceType, setserviceType] = useState(null); 
  const [serviceDescription, setserviceDescription] = useState(null); 
  const [errors, setErrors] = useState({});  
  const [adminsData, setAdminsData] = useState(null);

  const [raiseComplaint] = useRaiseComplaintMutation();
  const [getAdminsData] = useLazyGetAdminsDataQuery();
  const [raiseServiceRequest] = useRaiseServiceRequestMutation();

  const handleRaiseComplaint = () => {
    const validationErrors = validateComplaintFields(title, complaintText, assignedAdmin);
    if (Object?.keys(validationErrors)?.length === 0) {
      setErrors('');
      setLoader(true);
      const payload = {
        apartmentId: selectedApartment?.id,
        description: complaintText,
        createdBy: customerOnboardReqData?.user?.id,
        Type: "GENERAL",
        assignTo: assignedAdmin?.id,
        title: title,
      };
      console.log(payload, 'RAISE REQUEST');
      raiseComplaint(payload)
        .unwrap()
        .then(response => {
          setLoader(false);
          console.log(response, 'RES OF RAISE COMPLAINT');
          SnackbarComponent({
            text: 'Complaint Raised Successfully',
            backgroundColor: colors.green5,
          });
          navigation.navigate(allTexts.screenNames.home);
        })
        .catch(error => {
          setLoader(false);
          console.log(error, 'ERR IN RAISE COMPLAINT');
          SnackbarComponent({
            text: 'Failed to Raise Complaint',
            backgroundColor: colors.red3,
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRaiseRequest = () => {
    const validationErrors = {};
    if (!serviceType) {
      validationErrors.serviceTypeError = 'Please select a service type.';
    }
    if (!serviceDescription || serviceDescription.trim() === '') {
      validationErrors.serviceDescriptionError = 'Please enter a description.';
    }

    if (Object.keys(validationErrors).length === 0) {
      setErrors('');
      const payload = {
        description: serviceDescription,
        apartmentId: selectedApartment?.id,
        purposeType: "APARTMENT_REQUEST",
        createdBy: customerOnboardReqData?.user?.id,
        categoryId: serviceType?.id,
      };
      console.log(payload, 'SERVICE REQUEST');
      raiseServiceRequest(payload)
        .unwrap()
        .then(response => {
          console.log(response);
          SnackbarComponent({
            text: 'Service Request Raised Successfully',
            backgroundColor: colors.green5,
          });
          navigation.navigate(allTexts.screenNames.home);
        })
        .catch(error => {
          console.log(error);
          SnackbarComponent({
            text: 'Failed to Raise Service Request',
            backgroundColor: colors.red3,
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const handleGetAdminsData = () => {
    const payload = {
      apartmentId: selectedApartment?.id,
    };
    getAdminsData(payload)
      .unwrap()
      .then(response => {
        const extractedData = response?.map(item => ({
          fullName: item?.fullName,
          id: item?.id,
        }));
        setAdminsData(extractedData);
      })
      .catch(error => {
        console.log(error, 'ERR IN ADMIN DATA');
      });
  };

  useEffect(() => {
    handleGetAdminsData();
  }, []);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {DefaultTopBarOne(navigation, 0, 'Raise Request')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      <View style={{marginHorizontal: '5%'}}>
        {/* <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tabButton,
              selectedTab === 'Complaint' && styles.selectedTabButton,
            ]}
            onPress={() => setSelectedTab('Complaint')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Complaint' && styles.selectedTabText,
              ]}>
              Complaint
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabButton,
              selectedTab === 'Service' && styles.selectedTabButton,
            ]}
            onPress={() => setSelectedTab('Service')}>
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Service' && styles.selectedTabText,
              ]}>
              Service
            </Text>
          </Pressable>
        </View> */}
        {selectedTab === 'Complaint' ? (
          <View>
            <View style={{marginVertical: '5%'}}>
              <Text style={styles.boldText}>Title :</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Title Here..."
                value={title}
                onChangeText={setTitle}
              />
              {errors.titleError ? (
                <Text style={{color: 'red', fontSize: 12}}>
                  {errors.titleError}
                </Text>
              ) : null}
            </View>
            <View style={{marginVertical: '3%'}}>
              <Text style={styles.boldText}>Description :</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Describe your complaint..."
                value={complaintText}
                onChangeText={setComplaintText}
                multiline={true}
              />
              {errors.complaintTextError ? (
                <Text style={{color: 'red', fontSize: 12}}>
                  {errors.complaintTextError}
                </Text>
              ) : null}
            </View>
            <View style={styles.assignToCon}>
              <Text
                style={{fontSize: 16, fontWeight: '500', color: colors.black}}>
                {'Assign To :    '}
              </Text>
              <View style={{width: '74%', marginTop: -20}}>
                <CustomDropdown
                  label="Admin"
                  showLabel={false}
                  data={adminsData}
                  value={assignedAdmin.id}
                  onChange={(id, fullName) => setAssignedAdmin({id, fullName})}
                  labelField="fullName"
                  valueField="id"
                />
                {errors.assignedAdminError ? (
                  <Text style={{color: 'red', fontSize: 12}}>
                    {errors.assignedAdminError}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={{marginTop: '5%'}}>
              <CustomSelectDropdown
                data={allTexts.serviceTypes}
                onSelect={item => setserviceType(item)}
                selectedItem={serviceType}
                placeholder="Select Service"
              />
              {errors.serviceTypeError && (
                <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
                  {errors.serviceTypeError}
                </Text>
              )}
            </View>
            {serviceType !== '' && (
              <View style={{marginVertical: '5%'}}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Description..."
                  value={serviceDescription}
                  onChangeText={setserviceDescription}
                  multiline={true}
                />
                {errors.serviceDescriptionError && (
                  <Text style={{color: 'red', fontSize: 12, marginTop: 5}}>
                    {errors.serviceDescriptionError}
                  </Text>
                )}
              </View>
            )}
          </>
        )}
        <View style={{marginTop: '3%'}}>
          <PrimaryButton
            text={'Raise a Request'}
            bgColor={colors.primaryColor}
            onPress={
              selectedTab === 'Complaint' ? handleRaiseComplaint : handleRaiseRequest
            }
            loading={loader}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RaiseRequest;