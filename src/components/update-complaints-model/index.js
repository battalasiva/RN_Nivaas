import { Text, TextInput, View } from 'react-native';
import React from 'react';
import { allTexts, colors } from '../../common';
import { Modal } from 'react-native';
import { TopBarCard2 } from '../topBar1/topBarCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../../screens/complaints-list/style';
import { formatDate } from '../../common/customFunctions';
import CustomSelectDropdown from '../Custom-SelectDropDown';
import CustomDropdown from '../custom-dropdown';
import { PrimaryButton } from '../primary-button';

const UpdateComplaintStatusModel = ({ selectedApartment,alertModel, navigation, updateModelVisible, setUpdateModelVisible, setSelectedTab, setAssignedAdmin, setcomplaintStatus, SelectedItem, optionsData, assignedAdmin, handleGetAdminsData, selectedTab, handleupdateComplaintStatus, complaintStatus, adminsData }) => {
  return (
    <Modal
      visible={updateModelVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setUpdateModelVisible(false);
        setSelectedTab(null);
        setAssignedAdmin(null);
      }}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TopBarCard2 navigation={navigation} txt={'Update Complaint'} />
            <AntDesign
              name="arrowleft"
              size={26}
              color={colors.white}
              style={styles.CrossIcon}
              onPress={() => {
                setUpdateModelVisible(false);
                setSelectedTab(null);
                setAssignedAdmin(null);
              }}
            />
          </View>
          <View style={{ marginTop: '10%', marginHorizontal: '5%' }}>
            <View style={{ backgroundColor: colors.secondaryColor, padding: '5%', borderRadius: 5 }}>
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={[styles.boldText, { textDecorationLine: 'underline' }]}>Details :</Text>
              </View>
              <View style={{ alignItems: 'center', marginTop: '3%' }}>
                <View>
                  <Text style={{ color: colors.black }}>{`Assigned On : ${formatDate(SelectedItem?.assignedOn, true, false)}`}</Text>
                  <Text style={{ color: colors.black }}>{`Created On : ${formatDate(SelectedItem?.createdDt, true, false)}`}</Text>
                  {/* <Text style={{color:colors.black}}>{'Assigned To : Siva'}</Text> */}
                </View>
              </View>
            </View>
            <View>
              <View style={{ marginTop: '5%' }}>
                <Text style={styles.boldText}>Title :</Text>
                <TextInput
                  style={styles.textInput}
                  value={SelectedItem?.title}
                  editable={false}
                />
              </View>
              <View style={{ marginTop: '5%' }}>
                <Text style={styles.boldText}>Description : </Text>
                <TextInput
                  style={styles.textInput}
                  value={SelectedItem?.description}
                  editable={false}
                  multiline={true}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '5%'
              }}>
              <Text style={[styles.boldText, { marginTop: 8 }]}>Update Status : </Text>
              <View style={{ width: '72%' }}>
                <CustomSelectDropdown
                  data={allTexts.complaintStatusTypes}
                  onSelect={status => {
                    setcomplaintStatus(
                      status.name,
                    );
                  }}
                  selectedItem={SelectedItem?.status}
                  placeholder={SelectedItem?.status || 'Change Status'}
                  fontsize={14}
                />
              </View>
            </View>
            {
              (selectedApartment?.admin && selectedApartment?.approved) && <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '5%'
              }}>
              <Text style={[styles.boldText, { marginTop: 24 }]}>{'Reassign To :    '}</Text>
              <View style={{ width: '74%' }}>
                <CustomDropdown
                  label="To Reassign"
                  showLabel={false}
                  data={optionsData}
                  value={assignedAdmin?.id}
                  onChange={(id, name) => {
                    setSelectedTab({ id, name });
                    handleGetAdminsData(name, alertModel?.item)
                  }}
                  labelField="name"
                  valueField="id"
                />
              </View>
            </View>
            }
            {
              selectedTab?.id &&
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{ width: '100%' }}>
                  <CustomDropdown
                    label="To Reassign"
                    showLabel={false}
                    data={adminsData}
                    value={assignedAdmin?.id}
                    onChange={(id, fullName) => {
                      setAssignedAdmin({ id, fullName });
                    }}
                    labelField="fullName"
                    valueField="id"
                  />
                </View>
              </View>
            }
            <View style={{ marginTop: '10%' }}>
              <PrimaryButton text={'SUBMIT'} bgColor={colors.primaryColor} onPress={() => handleupdateComplaintStatus(SelectedItem?.id, complaintStatus, assignedAdmin?.id)} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateComplaintStatusModel;