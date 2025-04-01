import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './style';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {allTexts, colors} from '../../common';

const UserServices = ({navigation}) => {
  return (
    <View>
      <View>
        <Pressable
          onPress={() => navigation.navigate(allTexts.screenNames.houseHold)}>
          <View style={styles.householdCon}>
            <Feather name="users" size={25} color={colors.black} />
            <Text style={styles.manageFlatsConAddText}>Household</Text>
            <View style={styles.householdSubCon}>
              <Text style={{fontSize: 18, color: colors.gray}}>Manage</Text>
              <AntDesign name="right" size={20} color={colors.black} />
            </View>
          </View>

          <View style={styles.householdSuperCon}>
            <View style={styles.iconNameCon}>
              <Feather name="users" size={25} color={colors.black} />
              <Text>Mates</Text>
            </View>
            <View style={styles.iconNameCon}>
              <MaterialCommunityIcons
                name="dog"
                size={25}
                color={colors.black}
              />
              <Text>Pets</Text>
            </View>
            <View style={styles.iconNameCon}>
              <FontAwesome6 name="user-gear" size={25} color={colors.black} />
              <Text>Maid </Text>
            </View>
          </View>
        </Pressable>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>Manage Flats</Text>
        <View style={styles.manageFlatsConHome}>
          <MaterialIcons
            name="format-list-bulleted"
            size={25}
            color={colors.black}
            style={{marginLeft: 4}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate(allTexts.screenNames.orders)}>
            <Text style={styles.manageFlatsConAddText}>My Orders</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.manageFlatsConHome}>
          <Ionicons name="add-circle-outline" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>Add you flat/Villa</Text>
        </View>
      </View>
      <View style={styles.manageFlatsCon}>
        <Text style={styles.headingText}>Purchages</Text>
        <View style={styles.manageFlatsConHome}>
          <Foundation
            name="home"
            size={30}
            color={colors.black}
            style={{marginLeft: 6}}
          />
          <Text style={styles.manageFlatsConAddText}>My Orders</Text>
        </View>
        <View style={styles.manageFlatsConHome}>
          <Ionicons name="add-circle-outline" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>Add you flat/Villa</Text>
        </View>
      </View>
    </View>
  );
};

export default UserServices;
