import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './style';
import { allTexts, colors } from '../../common';
import { DefaultTopBarOne } from '../../common/customFunctions';
import { MaterialIcons, MaterialCommunityIcons, AntDesign } from '../../common/icons';

const AdminSociety = ({ navigation }) => {
  const [openSections, setOpenSections] = useState({}); 

  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };

  const services = [
    {
      icon: MaterialCommunityIcons,
      iconName: 'speedometer',
      screenName: null,
      title: 'Meters & Consumption',
      isCollapsible: true,
      subServices: [
        {
          screenName: allTexts.screenNames.prepaidMeter,
          title: 'Prepaid Meters',
        },
        {
          screenName: allTexts.screenNames.addConsumptionUnits,
          title: 'Consumption Units',
        },
      ],
    },
    {
      icon: MaterialIcons,
      iconName: 'settings-applications',
      screenName: allTexts.screenNames.maintainenceSettings,
      title: 'Maintenance Settings',
    },
    {
      icon: MaterialIcons,
      iconName: 'local-atm',
      screenName: allTexts.screenNames.expences,
      title: 'Account',
    },
    {
      icon: AntDesign,
      iconName: 'wallet',
      screenName: null,
      title: 'Coins & Subscription',
      isCollapsible: true,
      subServices: [
        {
          screenName: allTexts.screenNames.coins,
          title: 'Coins',
        },
        {
          screenName: allTexts.screenNames.subscription,
          title: 'Subscription',
        },
      ],
    },
    {
      icon: AntDesign,
      iconName: 'notification',
      screenName: allTexts.screenNames.addNotice,
      title: 'Add Notice',
    },
    {
      icon: MaterialIcons,
      iconName: 'add-circle-outline',
      screenName: allTexts.screenNames.addService,
      title: 'Add Service Providers',
    },
  ];

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'Admin Society', true)}
      <View style={styles.apartmentServicesCon}>
        {services.map((service, index) => {
          const IconComponent = service.icon; 
          return (
            <View key={index}>
              <Pressable
                style={styles.eachService}
                onPress={() => {
                  if (service.isCollapsible) {
                    toggleSection(index);
                  } else {
                    navigation.navigate(service.screenName);
                  }
                }}
              >
                <IconComponent name={service.iconName} size={25} color={colors.primaryColor} />
                <Text style={styles.eachText}>{service.title}</Text>
              </Pressable>
              {service.isCollapsible && openSections[index] && (
                <View style={styles.subServicesCon}>
                  {service.subServices.map((subService, subIndex) => (
                    <Pressable
                      key={subIndex}
                      style={styles.subService}
                      onPress={() => navigation.navigate(subService.screenName)}
                    >
                      <MaterialCommunityIcons name="hand-pointing-right" size={25} color={colors.primaryColor}/>
                      <Text style={styles.subServiceText}>{subService.title}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default AdminSociety;