import { Alert, Pressable, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { allTexts, colors } from '../../common';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { TopBarCard2 } from '../../components';
const hasRole = (roles, roleList) => roleList.some(role => roles?.includes(role));
const Apartments = ({ navigation }) => {
  const {customerOnboardReqData} = useSelector(state => state.currentCustomer);
  const { selectedApartment } = useSelector(state => state.cityData);
  const userRoles = customerOnboardReqData?.user?.roles || [];
  const handleNavigation = (screenName, rolesAllowed = []) => {
    if (hasRole(userRoles, rolesAllowed)) {
      navigation.navigate(screenName);
    } else {
      Alert.alert(
        "Alert",
        "You don't have access to this feature.",
        [{ text: "Ok" }],
        { cancelable: false }
      );
    } 
  };

  const handleAdminNavigation = (screenName) => {
    if (selectedApartment?.admin && selectedApartment?.approved || hasRole(userRoles, [allTexts.roles.flatOwner])) {
      navigation.navigate(screenName);
    } else {
      Alert.alert(
        "Alert",
        "Admins and Owners only have access. OnBoard your new Apartment or Flat to get access",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OnBoard", onPress: () => navigation.navigate(allTexts.screenNames.newApartmentOnBoard) }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.mainCon}>
      <View style={styles.topBar}>
        <TopBarCard2 txt='Apartments' />
      </View>
      <View style={styles.apartmentServicesCon}>
        <ServiceItem
          icon={<FontAwesome name='money' size={23} color={colors.lightBlue} />}
          title="Society Dues"
          description="Clear your society dues, deposits & advances"
          onPress={() => handleNavigation(allTexts.screenNames.societyDues, [allTexts.roles.apartmentAdmin, allTexts.roles.flatOwner, allTexts.roles.familyMember, allTexts.roles.flatTenant])}
        />
        <ServiceItem
          icon={<MaterialCommunityIcons name='account-cog' size={25} color={colors.lightBlue} />}
          title="Admin Society"
          description="Define society rules and dues"
          onPress={() => handleAdminNavigation(allTexts.screenNames.adminSociety)}
        />
        <ServiceItem
          icon={<MaterialCommunityIcons name='office-building-cog' size={25} color={colors.lightBlue} />}
          title={hasRole(userRoles, [allTexts.roles.apartmentAdmin, allTexts.roles.flatOwner]) ? "Manage Flats" : "My Flats"}
          description={hasRole(userRoles, [allTexts.roles.apartmentAdmin, allTexts.roles.flatOwner]) ? "OnBoard Your New Flats" : "View Flat Details"}
          onPress={() => handleNavigation(allTexts.screenNames.manageFlats, [allTexts.roles.apartmentAdmin, allTexts.roles.flatOwner, allTexts.roles.familyMember, allTexts.roles.flatTenant])}
        />
        <ServiceItem
          icon={<MaterialIcons name='post-add' size={25} color={colors.lightBlue} />}
          title={"Manage Complaints"}
          description={"Change Status & Reassign Complaints"}
          onPress={() => handleNavigation(allTexts.screenNames.complaintsList,[allTexts.roles.apartmentAdmin, allTexts.roles.flatOwner, allTexts.roles.familyMember, allTexts.roles.flatTenant])}
        />
      </View>
    </View>
  );
};

const ServiceItem = ({ icon, title, description, onPress }) => (
  <Pressable style={styles.eachService} onPress={onPress}>
    {icon}
    <Text style={styles.eachText}>{title}</Text>
    <Text style={styles.eachText}>{description}</Text>
  </Pressable>
);

export default Apartments;