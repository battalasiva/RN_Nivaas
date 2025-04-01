import { Alert, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../screens/home-feed/styles';
import { PrimaryButton } from '../primary-button';
import { allTexts, colors } from '../../common';
import ImageSlider from '../image-slider';
import { useSelector } from 'react-redux';
import StatusItems from '../statusItems';
import { MaterialCommunityIcons, MaterialIcons } from '../../common/icons';

const HomeComponent = ({ currentCustomerData, navigation, dispatch }) => {
  const { selectedApartment } = useSelector(state => state.cityData);
  const { premium } = useSelector(state => state.currentCustomer);
  const [flatModel, setFlatModel] = useState(false);

  const handleNavigation = screenName => {
    if (
      currentCustomerData?.user?.roles?.includes(
        allTexts.roles.apartmentAdmin,
      ) ||
      currentCustomerData?.user?.roles?.includes(allTexts.roles.flatOwner) ||
      currentCustomerData?.user?.roles?.includes(allTexts.roles.familyMember) ||
      currentCustomerData?.user?.roles?.includes(allTexts.roles.flatTenant)
    ) {
      navigation.navigate(screenName);
    } else {
      Alert.alert(
        'Alert',
        "You Don't have Any Flats and Apartments",
        [
          {
            text: 'Ok',
          },
        ],
        { cancelable: false },
      );
    }
  };
  return (
    <View>
      <View style={styles.quickAccessCon}>
        <View>
          <Text style={[styles.discoverMore, { fontSize: 18 }]}>
            Quick Access
          </Text>
        </View>
        <View
          style={{
            // flexDirection: 'row',
            // flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: 10,
            width: '100%',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Pressable style={InStyles.eachItem} onPress={() => handleNavigation(allTexts.screenNames.societyDues)}>
              <MaterialIcons
                name="payments"
                size={30}
                style={styles.iconstyles}
              />
              <Text style={styles.eachText}>Bills</Text>
            </Pressable>
            <Pressable style={InStyles.eachItem} onPress={() => handleNavigation(allTexts.screenNames.manageFlats)}>
              <MaterialCommunityIcons
                name="home"
                size={30}
                style={styles.iconstyles}
              />
              <Text style={styles.eachText}>My Flats</Text>
            </Pressable>
            <Pressable style={InStyles.eachItem} onPress={() =>
              handleNavigation(allTexts.screenNames.announcementsScreen)
            }>
              <MaterialCommunityIcons
                name="bullhorn"
                size={30}
                style={styles.iconstyles}
              />
              <Text numberOfLines={1} style={styles.eachText}>
                NoticeBoard
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginLeft:'0.5%'}}>
          <Pressable style={[InStyles.eachItem, { width: '30%' }]} onPress={() => handleNavigation(allTexts.screenNames.raiseRequest)}>
            <MaterialIcons
              name="post-add"
              size={30}
              style={styles.iconstyles}
            />
            <Text style={styles.eachText}>{'Raise Complaint'}</Text>
          </Pressable>
          <Pressable style={[InStyles.eachItem, { width: '30%' }]} onPress={() => handleNavigation(allTexts.screenNames.serviceProviders)}>
            <MaterialIcons
              name="miscellaneous-services"
              size={30}
              style={styles.iconstyles}
            />
            <Text style={styles.eachText}>{'Service Providers'}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.subConOne}>
        <Text style={styles.discoverMore}>
          {allTexts.headings.discoverMore}
        </Text>
        <Text style={styles.description}>
          {allTexts.paragraphs.discoverNivaas}
        </Text>
        <View style={{ marginTop: '4%' }}>
          {(!(selectedApartment?.admin && selectedApartment?.approved) ||
            (selectedApartment?.admin && selectedApartment?.approved)) &&
            selectedApartment?.flats?.length >= 1 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View style={styles.flatNameCon}>
                <PrimaryButton
                  text={'My Requests'}
                  bgColor={colors.primaryColor}
                  onPress={() =>
                    navigation.navigate(allTexts.screenNames.requestSummary)
                  }
                />
              </View>
              <MaterialIcons
                name="add-home"
                size={30}
                color={colors.primaryColor}
                onPress={() =>
                  navigation.navigate(allTexts.screenNames.addYourHome)
                }
              />
            </View>
          ) : (
            <PrimaryButton
              onPress={() =>
                navigation.navigate(allTexts.screenNames.addYourHome)
              }
              bgColor={colors.primaryColor}
              text={'+ ADD YOUR HOME'}
              shadow={true}
              textColor={colors.white}
            />
          )}
        </View>
      </View>
      <View style={styles.ImageSlideCon}>
        <ImageSlider />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={flatModel}
        onRequestClose={() => setFlatModel(false)}>
        <TouchableWithoutFeedback onPress={() => setFlatModel(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <StatusItems apartments={currentCustomerData?.apartments} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default HomeComponent;
const InStyles = StyleSheet.create({
  eachItem: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 5,
    paddingVertical: 10,
    marginHorizontal: 5
  }
});