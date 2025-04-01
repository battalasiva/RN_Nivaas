import { Modal, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { styles } from '../../screens/myaccount/style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { allTexts, colors } from '../../common';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ManageflatsModal = ({
  flatModalVisible,
  setFlatModalVisible,
  custDetails,
  navigation,
}) => {
  const renderFlatItem = ({ item }) => (
    <View style={[styles.renderCon,{marginLeft:'0%'}]}>
      <FlatList
        data={item?.flats}
        renderItem={(flat) => renderFlat(flat, item?.name)} 
        keyExtractor={(flat) => flat.id.toString()}
      />
    </View>
  );
  
  const renderFlat = ({ item }, apartmentName) => (
    <View style={{ width: '100%', flexDirection: 'row'}}>
      <View style={{width:'25%',alignItems:'center'}}>
      <Text style={styles.flatModalText}>{item?.flatNo}</Text>
      </View>
      <View style={{width:'40%',alignItems:'center'}}>
      <Text style={styles.apartmentNameText}>{apartmentName}</Text>
      </View>
      <View style={{width:'40%',alignItems:'center'}}>
      <Text style={[styles.apartmentModalText]}>
        {item?.approved ? (
          <Text style={styles.statusactiveText}>Active</Text>
        ) : (
          <Text style={styles.statusPendingText}>Pending</Text>
        )}
      </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.manageFlatsSubCon}>
      <View>
        {/* && (custDetails?.user?.roles?.some(role => role === allTexts.roles.flatOwner)) */}
        {(custDetails?.apartments?.some(apartment => apartment?.flats?.length >= 1)) && (
          <View style={styles.manageFlatsConHome}>
            <Foundation
              name="home"
              size={28}
              color={colors.black}
              style={{ marginLeft: 5 }}
            />
            <View>
              {custDetails?.apartments?.length >= 1 ? (
                <TouchableOpacity
                  onPress={() => setFlatModalVisible(true)}
                  style={styles.flatItemCon}>
                  <Text numberOfLines={1} style={styles.flatText}>
                    {'Flats'}
                  </Text>
                  <AntDesign name="right" size={20} color={colors.black} />
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={custDetails?.apartments}
                  renderItem={renderFlatItem}
                  keyExtractor={item => item?.id?.toString()}
                />
              )}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.addYourHome)
          }>
          <View style={styles.manageFlatsConAdd}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={colors.black}
            />
            <Text style={styles.manageFlatsConAddText}>
              {'Add your flat/Villa'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={flatModalVisible}
        animationType="fade"
        onRequestClose={() => setFlatModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setFlatModalVisible(false)}>
          <View style={styles.modalContent}>
            {/* <TouchableOpacity
              onPress={() => setFlatModalVisible(false)}
              style={styles.modalCloseIcon}>
              <AntDesign name="close" size={25} color={colors.black} />
            </TouchableOpacity> */}
            <FlatList
              data={custDetails?.apartments}
              renderItem={renderFlatItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ManageflatsModal;
