/* eslint-disable no-dupe-keys */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {allTexts, colors} from '../../common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export const TopBarcard = ({
  onPress,
  txt,
  isBell,
  arrow,
  cancel,
  children,
  navigation,
  back,
  roleId,
  roleType,
  navCreate,
  onPressBag,
  bag,
  onPressBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.15, alignItems: 'center'}}>
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 10}}
              />
            </TouchableOpacity>
          )}
           {back && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressBack ? onPressBack : () => navigation.goBack()}
              >
              <Ionicons name="arrow-back-circle" size={40} color={colors.white} />
            </TouchableOpacity>
          )}
          {cancel && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => alert('cancel')}>
              <MaterialIcons
                name="cancel"
                size={20}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 0.7}}>
          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'Normal',
                color: colors.white,
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                // backgroundColor: 'red',
              }}>
              {txt}
            </Text>
          )}
          {children}
        </View>
        <View
          style={{
            flex: 0.18,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* {isBell && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(allTexts.screenNames.notification)
              }>
              <View>
                <Feather name="bell" size={30} color={colors.primaryColor} />
                {notificationsCount !== 0 && (
                  <>
                    <View style={styles.notificationsCount}>
                      <Text style={styles.notificationCountNumber}>
                        {notificationsCount}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          )} */}
          {bag && (
            <TouchableOpacity onPress={onPressBag} style={{marginRight: '5%'}}>
              <Feather
                name="shopping-bag"
                size={30}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          )}
          {(roleId === 'ROLE_ITEM_ADMIN' || roleType === 'ROLE_ADMIN') && (
            <TouchableOpacity onPress={navCreate}>
              <Text style={styles.joinText}>Create</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export const TopBarCard2 = ({
  onPress,
  txt,
  arrow,
  accountType,
  children,
  navigation,
  back,
  navscreen,
  roleId,
  roleType,
  navCreate,
  searchBar,
  edit,
  profieEdit,
  bData,
  isPlus,
  onPressBag,
  bag,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.15, alignItems: 'center'}}>
          {arrow && (
            <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
              <Image
                source={require('../../../assets/images/backarrow.png')}
                style={{height: 10, width: 10}}
              />
            </TouchableOpacity>
          )}
          {back && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => { navscreen ? navigation.navigate(navscreen) :
                navigation.goBack(),
                  {
                    data: bData,
                  };
              }}>
              <AntDesign name='arrowleft' size={28} color={colors.white}/>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 0.7}}>
          {txt && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: colors.white,
                textAlign: 'center',
                fontFamily: 'Poppins-Medium',
                fontWeight: 'Normal',
                letterSpacing:1
              }}>
              {txt}
            </Text>
          )}
          {children}
        </View>
        <View style={{flex: 0.15}}>
          {accountType && (
            <View onPress={onPressBag} style={{marginRight: '25%',alignItems:'center',borderRadius:10}}>
              <Text style={{color:'white',fontWeight:'500'}}>{accountType}</Text>
            </View>
          )}
          {searchBar && (
            <TouchableOpacity onPress={onPressBag} style={{marginRight: '20%',alignItems:'center',borderRadius:10}}>
              <Feather name='search' size={25} color={colors.black}/>
            </TouchableOpacity>
          )}
          {edit && (
            <TouchableOpacity onPress={onPress} style={{marginRight: '20%',alignItems:'center',borderRadius:10}}>
              <Feather name='edit' size={23} color={colors.white}/>
            </TouchableOpacity>
          )}
          {
            profieEdit && (
              <TouchableOpacity onPress={onPress} style={{marginRight: '20%',alignItems:'center',borderRadius:10}}>
              <MaterialCommunityIcons
                name="account-edit"
                size={28}
                color={colors.white}
              />
            </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryColor,
    flex: 1,
    height: 70,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    paddingBottom:5,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
  },
  children: {
    flex: 0.7,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountTypeCon:{

  },
  joinText: {
    color: colors.primaryColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  userIcon: {
    alignItems: 'center',
    borderRadius: 25,
    // backgroundColor: 'green',
    height: 45,
    borderColor: 'white',
    width: 45,
  },
  menuIcon: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    padding: 1,
    backgroundColor: 'gray',
    height: 20,
    width: 20,
    padding: 1,
  },

  plusIcon: {
    color: colors.white,
  },
  plusContainer: {
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    textAlign: 'center',
    height: 30,
    width: 30,
  },
  notificationsCount: {
    borderWidth: 1,
    borderColor: colors.primaryColor,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -5,
    left: 15,
  },
  notificationCountNumber: {
    color: colors.primaryColor,
    fontSize: 10,
  },
});
