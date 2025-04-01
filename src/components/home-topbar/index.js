import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { allTexts, colors, window } from '../../common';
import {  useSelector } from 'react-redux';
import { usePostDefaultApartmentMutation } from '../../redux/services/cityServices';
import { TouchableOpacity } from 'react-native';
import DefaultApartmentComp from '../default-apartment';
import { PrimaryButton } from '../primary-button';
import { styles } from './style';
import { MaterialIcons,Ionicons} from '../../common/icons';

const HomeTopbar = ({handlecurrentApartment,currentCustomerData,navigation,dispatch,currentApartment,approvedApartments,setCurrentApartment}) => {
    const {selectedApartment} = useSelector(state => state.cityData);
    const customerDetails = useSelector(state => state.currentCustomer);
    // const [currentUserApartments] = useLazyGetCurrentuserApartmentsQuery();
    const [postDefaultApartment] = usePostDefaultApartmentMutation();
    const allowedRoles = [allTexts.roles.apartmentAdmin,allTexts.roles.flatOwner,allTexts.roles.flatTenant,allTexts.roles.familyMember];  
    const [switchApartmentModal, setSwitchApartmentModal] = useState(false);
    // const [currentApartment,setCurrentApartment] = useState(null);
    const handleApartment = async apartment => {
      setCurrentApartment(apartment);
    };
    const handledefaultapartment = (item)=>{
      if (item) {
        setSwitchApartmentModal(false)
      }
      const payload = {
        userId:currentCustomerData?.user?.id,
        apartmentId:item?.id,
      }
      postDefaultApartment(payload)
        .unwrap()
        .then((response)=>{
          // console.log('RES OF POST DEF APARTMENT',response);
          handlecurrentApartment();
        }).catch((error)=>{
          console.log('ERROR IN POSTING DEFULT APARTMENT',error);
        })
    }
  return (
    <View>
     <View style={styles.marginHeader}>
        <View style={styles.headerCon}>
          <Text style={styles.username}>
            Hi, {currentCustomerData?.user?.name}
          </Text>
          <View style={styles.iconsCon}>
            <Ionicons
              name="notifications"
              size={30}
              style={styles.icons}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }
            />
            <MaterialIcons
              name="account-circle"
              size={30}
              style={styles.icons}
              onPress={() =>
                navigation.navigate(allTexts.screenNames.myAccount)
              }
            />
          </View>
        </View>
      </View>
      {(approvedApartments?.length >= 2) ? (currentCustomerData?.user?.roles?.some(role => allowedRoles.includes(role)) &&  
        <TouchableOpacity
          onPress={() => setSwitchApartmentModal(true)}
          style={styles.manageFlatsConAdd}>
          <MaterialIcons
            name="arrow-drop-down"
            size={40}
            color={colors.black}
          />
          {
            selectedApartment ? ('') : (<Text style={styles.manageFlatsConAddText}>{'Switch Apartment'}</Text>)
          }
          <Text style={styles.manageFlatsConAddText}>{selectedApartment?.name}</Text>
        </TouchableOpacity>
      ) :  ((customerDetails?.customerOnboardReqData?.user?.roles?.some(role => allowedRoles.includes(role))) &&  <DefaultApartmentComp selectedApartment={selectedApartment} /> )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={switchApartmentModal}
        onRequestClose={() => setSwitchApartmentModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => setSwitchApartmentModal(false)}>
          <View style={styles.switchModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.switchModalCon}>
                <FlatList
                  data={approvedApartments}
                  keyExtractor={item => item?.id?.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => handleApartment(item)}
                      style={styles.nameIconCon}>
                      <Text style={styles.apartmentText}>
                        {item.name}
                      </Text>
                      <Ionicons
                        name={
                          currentApartment?.id === item?.id
                            ? 'checkmark-circle'
                            : 'checkmark-circle-outline'
                        }
                        size={30}
                        color={
                          currentApartment?.id === item?.id
                            ? colors.primaryColor
                            : colors.black
                        }
                      />
                    </TouchableOpacity>
                  )}
                />
                <View style={styles.buttonContainer}>
                  <PrimaryButton
                    text={'OK'}
                    bgColor={colors.primaryColor}
                    // onPress={() => setSwitchApartmentModal(false)}
                    onPress={()=>handledefaultapartment(currentApartment)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default HomeTopbar;