import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from '../../screens/myaccount/style';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons,AntDesign,Ionicons } from '../../common/icons';
import { allTexts, colors } from '../../common';
const ManageApartmentsModal = ({
  apartmentModalVisible,
  setApartmentModalVisible,
  custDetails,
  navigation,
}) => {
  const { selectedApartment } = useSelector(state => state.cityData);

  const renderApartmentItem = ({item}) => (
    (item?.admin) && 
    (<View style={styles.renderCon}>
      <Text style={styles.apartmentModalText}>
        {item?.name}
      </Text>
      <Text style={[styles.apartmentModalText, {marginLeft: '7%'}]}>
        {(item?.approved && item?.admin) ? (
          <Text style={styles.statusactiveText}>Active</Text>
        ) : (
          <Text style={styles.statusPendingText}>Pending</Text>
        )}
      </Text>
    </View>)
  );

  return (
    <View style={styles.manageFlatsSubCon}>
      <View>
        {(custDetails?.apartments?.filter(apartment => apartment.admin === true)?.length > 0) && (
          <View style={styles.manageFlatsConHome}>
            <MaterialCommunityIcons
              name="office-building"
              size={32}
              color={colors.black3}
            />
            <View>
              {custDetails?.apartments?.length > 1 ? (
                <TouchableOpacity
                  onPress={() => setApartmentModalVisible(true)}
                  style={styles.flatItemCon}>
                  <Text numberOfLines={1} style={styles.apartmentText}>
                    {'Apartments'}
                    {/* custDetails?.apartments[custDetails?.apartments?.length - 1]?.name || */}
                  </Text>
                  <AntDesign name="right" size={20} color={colors.black} />
                </TouchableOpacity>
              ) : (
                <FlatList
                  data={custDetails?.apartments}
                  renderItem={renderApartmentItem}
                  keyExtractor={item => item?.id?.toString()}
                />
              )}
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(allTexts.screenNames.newApartmentOnBoard)
          }
          style={styles.manageFlatsConAdd}>
          <Ionicons name="add-circle-outline" size={30} color={colors.black} />
          <Text style={styles.manageFlatsConAddText}>
            {'On Board Your New Apartment'}
          </Text>
        </TouchableOpacity>
        {(selectedApartment?.admin && selectedApartment?.approved) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(allTexts.screenNames.coAdmin)}
            style={styles.manageFlatsConAdd}>
            <Ionicons
              name="add-circle-outline"
              size={30}
              color={colors.black}
            />
            <Text style={styles.manageFlatsConAddText}>{'Add Co-Admin'}</Text>
          </TouchableOpacity>
        )}
        {(selectedApartment?.admin && selectedApartment?.approved) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(allTexts.screenNames.coins)}
            style={styles.manageFlatsConAdd}>
            <AntDesign name="wallet" size={30} color={colors.black} />
            <Text style={styles.manageFlatsConAddText}>{'Coins'}</Text>
          </TouchableOpacity>
        )}
        {(selectedApartment?.admin && selectedApartment?.approved) && (
          <TouchableOpacity
            onPress={() => navigation.navigate(allTexts.screenNames.subscription)}
            style={styles.manageFlatsConAdd}>
            <View>
            <Image source={require('../../utils/assets/images/subscription.png')} style={{ height: 30, width: 28 }} />
            </View>
            {/* <MaterialCommunityIcons name="thumb-up-outline" size={30} color={colors.black} /> */}
            <Text style={styles.manageFlatsConAddText}>{'Subscription'}</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        transparent={true}
        visible={apartmentModalVisible}
        animationType="fade"
        onRequestClose={() => setApartmentModalVisible(false)}>
        <TouchableWithoutFeedback
          onPress={() => setApartmentModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setApartmentModalVisible(false)}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={custDetails?.apartments}
                  renderItem={renderApartmentItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const IndividualStyles = StyleSheet.create({
  nameIconCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  apartmentText: { fontSize: 16, fontWeight: '500', color: colors.black },
  switchModalCon: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  buttonContainer: {
    marginTop: '5%',
  },
  switchModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default ManageApartmentsModal;
