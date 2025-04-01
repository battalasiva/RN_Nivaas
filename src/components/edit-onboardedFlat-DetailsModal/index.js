import { allTexts, colors } from '../../common';
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '../../common/icons';
import { PrimaryButton } from '../primary-button';
import { styles } from '../../screens/manage-flats/style';
import { getResidentTypeLabel } from '../../common/customFunctions';
import { ValidateEditFlatsSchema } from '../../common/schemas';
import { useState } from 'react';

const EditOnBoarderFlatDetailsModal = ({
  modalVisible,
  setModalVisible,
  handleEditDetails,
  customerDetails,
  selectedFlat,
  handleApproveTenants,
  handleApproveFlatOwners,
  handleUpdateDetails,
  approvalStatus,
  setErrors,
  errors,
  selectedApartment,
  setsaleAndRentModal,
  navigation,
}) => {    
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    if (ValidateEditFlatsSchema(setErrors, selectedFlat)) {
      handleUpdateDetails();
      setIsEditing(false);
    }
  };

  const handleInputChange = (field, value) => {
    handleEditDetails(field, value);
  };

  const isFlatOwner = customerDetails?.customerOnboardReqData?.user?.roles?.includes(allTexts.roles.flatOwner);
  const isApartmentAdmin = selectedApartment?.admin && selectedApartment?.approved;
  const isFlatOwnerApprovalRequired = isFlatOwner && selectedFlat?.approved === false;
  const isApartmentAdminApprovalRequired =
    isApartmentAdmin &&
    (selectedFlat?.residentType === 'FLAT_OWNER' ||
      selectedFlat?.residentType === 'TENANT' ||
      selectedFlat?.residentType === 'FLAT_OWNER_FAMILY_MEMBER') &&
    selectedFlat?.approved === false;

  const handlePress = () => {
    if (isApartmentAdmin && isFlatOwner) {
      selectedFlat?.residentType === 'FLAT_OWNER'
        ? handleApproveFlatOwners(selectedFlat?.id)
        : handleApproveTenants(selectedFlat?.id, selectedFlat?.residentType, selectedFlat?.relatedUserId);
    } else if (isApartmentAdmin) {
      selectedFlat?.residentType === 'FLAT_OWNER'
        ? handleApproveFlatOwners(selectedFlat?.id)
        : handleApproveTenants(selectedFlat?.id, selectedFlat?.residentType, selectedFlat?.relatedUserId);
    } else if (isFlatOwner) {
      handleApproveTenants(selectedFlat?.id, selectedFlat?.residentType, selectedFlat?.relatedUserId);
    }
  };

  const getButtonLabel = () => (approvalStatus === 'Approved' ? 'Approved' : 'Approve');
  const shouldShowApproveButton = isApartmentAdmin
    ? isApartmentAdminApprovalRequired ||
      (isFlatOwnerApprovalRequired &&
        (selectedFlat?.residentType === 'TENANT' || selectedFlat?.residentType === allTexts.roles.familyMember))
    : isFlatOwnerApprovalRequired;

  return (
    <View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsEditing(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setErrors(null);
            setModalVisible(false);
            setIsEditing(false);
          }}
        >
          <View style={[styles.modalContainer, { marginTop: Platform.OS === 'ios' ? 50 : 0 }]}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContent, { height: '100%' }]}>
                <View style={{ flexDirection: 'row',marginBottom:'5%'}}>
                  <AntDesign
                    name="arrowleft"
                    size={25}
                    color={colors.black}
                    onPress={() => {
                      setModalVisible(false);
                      setIsEditing(false);
                    }}
                    style={{ marginRight: '7%' }}
                  />
                  <View style={{ width: '75%', alignItems: 'center' }}>
                    <Text style={styles.modalTitle}>Flat Details</Text>
                  </View>
                  {
                    (selectedApartment?.admin && selectedApartment?.approved) && selectedFlat?.approved === true && <Feather name='edit' size={20} color={isEditing ? colors.gray : colors.black}  onPress={() => !isEditing && setIsEditing(true)}  style={{ opacity: isEditing ? 0.5 : 1 }}/>
                  }
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={updatedStyles.heading}>Flat No</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors?.flatNo && { borderColor: colors.red3, borderWidth: 1 },
                    ]}
                    value={selectedFlat?.flatNo}
                    onChangeText={(value) => handleInputChange('flatNo', value)}
                    placeholder="Enter Flat No"
                    editable={
                      isEditing && selectedApartment?.admin && selectedApartment?.approved && selectedFlat?.approved === true
                    }
                  />
                  {errors?.flatNo && <Text style={styles.errorText}>{errors.flatNo}</Text>}
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={updatedStyles.heading}>Full Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors?.name && { borderColor: colors.red3, borderWidth: 1 },
                    ]}
                    value={selectedFlat?.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                    placeholder="Enter Name"
                    editable={
                      isEditing && selectedApartment?.admin && selectedApartment?.approved && selectedFlat?.approved === true
                    }
                  />
                  {errors?.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={updatedStyles.heading}>Contact Number</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors?.contactNumber && { borderColor: colors.red3, borderWidth: 1 },
                    ]}
                    value={selectedFlat?.contactNumber}
                    onChangeText={(value) => handleInputChange('contactNumber', value)}
                    placeholder="Enter Mobile Number"
                    keyboardType="numeric"
                    editable={
                      isEditing && selectedApartment?.admin && selectedApartment?.approved && selectedFlat?.approved === true
                    }
                  />
                  {errors?.contactNumber && (
                    <Text style={styles.errorText}>{errors.contactNumber}</Text>
                  )}
                </View>
                <Text style={updatedStyles.heading}>Resident</Text>
                <TextInput
                  style={styles.input}
                  value={getResidentTypeLabel(selectedFlat?.residentType)}
                  placeholder="Enter Resident"
                  editable={false}
                />
                {shouldShowApproveButton && (
                  <View>
                    <View style={{ alignItems: 'center', marginVertical: '5%' }}>
                      <Pressable
                        style={[
                          styles.saveButtons,
                          approvalStatus === 'Approved' && { backgroundColor: colors.gray },
                        ]}
                        onPress={handlePress}
                      >
                        <Text style={styles.saveButtonText}>
                          {getButtonLabel()}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
                {(selectedApartment?.admin && selectedApartment?.approved) && selectedFlat?.approved === true && isEditing && (
                  <View style={{ marginTop: '5%' }}>
                    <PrimaryButton
                      text={'UPDATE'}
                      onPress={handleUpdate}
                      bgColor={isEditing ? colors.primaryColor : colors.gray}
                      disabled={!isEditing} 
                    />
                  </View>
                )}
                {
                  (selectedFlat?.residentType === 'FLAT_OWNER' && selectedFlat?.approved === true && !(selectedApartment?.admin && selectedApartment?.approved)) && (
                    <View style={{marginVertical:'5%'}}>
                    <PrimaryButton text={'Add More Details'} bgColor={colors.primaryColor} onPress={()=>{
                      setModalVisible(false);
                      navigation.navigate(allTexts.screenNames.rentSale,{selectedFlatID:selectedFlat?.flatId})
                    }}/>
                    </View>
                  )
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const updatedStyles = StyleSheet.create({
  heading: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.black,
      marginBottom:3,
      marginLeft:2
  },
});

export default EditOnBoarderFlatDetailsModal;