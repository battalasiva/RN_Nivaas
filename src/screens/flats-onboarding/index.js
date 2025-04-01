import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, Switch, Text, TextInput, View, FlatList } from 'react-native';
import {
  DefaultApartmentComp,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import { allTexts, colors } from '../../common';
import { useSelector } from 'react-redux';
import { useCreateFlatByaptOwnMutation } from '../../redux/services/maintainenceService';
import {
  DefaultTopBarOne,
  SnackbarComponent,
} from '../../common/customFunctions';
import { styles } from './style';
import { useFlatsOnboardingWithoutDetailsMutation } from '../../redux/services/cityServices';
import { validateflatOwnersDetails, validateFlats } from '../../common/schemas';

const FlatsOnboarding = ({ navigation, route }) => {
  const { selectedApartment } = useSelector(state => state.cityData);
  const [numFlats, setNumFlats] = useState(null);
  const [flatsDetails, setFlatsDetails] = useState([]);
  const [currentFlatIndex, setCurrentFlatIndex] = useState(0);
  const [flatDetails, setFlatDetails] = useState({
    flatNo: '',
    ownerPhoneNo: '',
    ownerName: '',
  });
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setbuttonLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [blockNumbers, setBlockNumbers] = useState([]);
  const [toggleSwitch, settoggleSwitch] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [postFlatOwnerWithoutDetails] = useFlatsOnboardingWithoutDetailsMutation();
  const blockNumbersOBJ = {
    flats: blockNumbers.map(flat => ({
      flatNo: flat,
    })),
  };

  const handletoggleSwitch = () =>
    settoggleSwitch(previousState => !previousState);
  const [createFlatByAptOwn] = useCreateFlatByaptOwnMutation();

  useEffect(() => {
    if (numFlats > 1) {
      const num = parseInt(numFlats);
      if (!isNaN(num)) {
        setBlockNumbers(Array(num).fill(''));
        setErrors(Array(num).fill(''));
      } else {
        setBlockNumbers([]);
        setErrors([]);
      }
    }
  }, [numFlats]);

  const handleBlockNumberChange = (value, index) => {
    const updatedBlocks = [...blockNumbers];
    updatedBlocks[index] = value.trim();

    const updatedErrors = [...errors];
    if (updatedBlocks?.filter(block => block === value).length > 1) {
      updatedErrors[index] = 'Block already exists';
    } else if (!value.trim()) {
      updatedErrors[index] = 'Block number cannot be empty';
    } else {
      updatedErrors[index] = '';
    }
    setBlockNumbers(updatedBlocks);
    setErrors(updatedErrors);
  };
  const handleOnboardFlatNumbers = () => {
    if (
      validateFlats(blockNumbers, setErrors, errors) &&
      blockNumbersOBJ?.flats?.length > 1
    ) {
      const payload = {
        apartmentId: selectedApartment?.id,
        flats: blockNumbersOBJ?.flats,
      };
      console.log(payload);
      setLoader(true);
      postFlatOwnerWithoutDetails(payload)
        .unwrap()
        .then(response => {
          setLoader(false);
          console.log(response, 'ownerWithoutDetails');
          navigation.navigate(allTexts.screenNames.manageFlats);
          SnackbarComponent({
            text: response?.message || 'New Flats ONboarded',
            backgroundColor: colors.green5,
          });
        })
        .catch(error => {
          console.log('errorrrrrr', error);
          SnackbarComponent({
            text: response?.message || 'Error In New Flats ONboarded',
            backgroundColor: colors.red3,
          });
        });
    } else {
      if (blockNumbersOBJ?.flats?.length <= 1) {
        SnackbarComponent({
          text: 'Flat Numbers Must be Greater Than 1',
          backgroundColor: colors.red3,
        });
      } else {
        SnackbarComponent({
          text: 'Error In Flats creation',
          backgroundColor: colors.red3,
        });
      }
    }
  };

  const handleNumFlatsChange = value => {
    setNumFlats(value);
    if (value > 1) {
      const newFlatsDetails = Array.from({ length: Number(value) }, () => ({
        flatNo: null,
        ownerPhoneNo: '',
        ownerName: '',
      }));
      setFlatsDetails(newFlatsDetails);
    } else {
      SnackbarComponent({
        text: 'Number Of Flats Must Greater Than 1',
        backgroundColor: colors.red3,
      });
    }
  };

  const handleNextFlat = () => {
    if (validateflatOwnersDetails(flatDetails, setErrors)) {
      const updatedFlatsDetails = [...flatsDetails];
      updatedFlatsDetails[currentFlatIndex] = flatDetails;
      setFlatsDetails(updatedFlatsDetails);
      setFlatDetails(
        updatedFlatsDetails[currentFlatIndex + 1] || {
          flatNo: '',
          ownerPhoneNo: '',
          ownerName: '',
        },
      );
      setCurrentFlatIndex(prevIndex => prevIndex + 1);
      setErrors({});
    }
    setHasSubmitted(true);
  };

  const handlePreviousFlat = () => {
    const updatedFlatsDetails = [...flatsDetails];
    updatedFlatsDetails[currentFlatIndex] = flatDetails;
    setFlatsDetails(updatedFlatsDetails);
    setFlatDetails(
      updatedFlatsDetails[currentFlatIndex - 1] || {
        flatNo: null,
        ownerPhoneNo: '',
        ownerName: '',
      },
    );
    setCurrentFlatIndex(prevIndex => prevIndex - 1);
    setErrors({});
  };

  const handleReviewModal = () => {
    handlePreviousFlat();
    setReviewModal(true);
  };

  const handleSubmitFlatDetails = () => {
    if (validateflatOwnersDetails(flatDetails, setErrors)) {
      const updatedFlatsDetails = [...flatsDetails];
      updatedFlatsDetails[currentFlatIndex] = flatDetails;
      const payload = {
        apartmentId: selectedApartment?.id,
        flats: updatedFlatsDetails,
      };
      // console.log(payload);
      setbuttonLoader(true);
      createFlatByAptOwn(payload)
        .unwrap()
        .then(response => {
          console.log('response OF NEW FLAT CREATION======>', response);
          setbuttonLoader(false);
          SnackbarComponent({
            text: 'New Flats Created Successfully',
            backgroundColor: colors.green5,
          });
          setReviewModal(false);
          navigation.navigate(allTexts.screenNames.manageFlats);
        })
        .catch(error => {
          setbuttonLoader(false);
          console.log('ERROR IN NEW FLAT CREATION=====>', error);
          if (error?.data?.errorCode === 1003) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'ERROR IN NEW FLAT CREATION',
              backgroundColor: colors.red3,
            });
          } else if (error?.data?.errorCode === 1014) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'ERROR IN NEW FLAT CREATION',
              backgroundColor: colors.red3,
            });
          } else if (error?.data?.errorCode === 1026) {
            SnackbarComponent({
              text: error?.data?.errorMessage || 'ERROR IN NEW FLAT CREATION',
              backgroundColor: colors.red3,
            });
          } else {
            SnackbarComponent({
              text: 'ERROR IN NEW FLAT CREATION',
              backgroundColor: colors.red3,
            });
          }
        });
      setHasSubmitted(true);
    }
  };
  const renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>Flat No</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>ownerPhoneNo</Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.headerCellContainer}>
        <Text style={styles.headerCell}>OwnerName</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.headerCellContainer, { paddingVertical: 5 }]}>
        <Text numberOfLines={1} style={styles.cell}>
          {item.flatNo}
        </Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, { paddingVertical: 5 }]}>
        <Text numberOfLines={1} style={styles.cell}>
          {item.ownerPhoneNo}
        </Text>
      </View>
      <View style={styles.verticalLine} />
      <View style={[styles.headerCellContainer, { paddingVertical: 5 }]}>
        <Text numberOfLines={1} style={styles.cell}>
          {item.ownerName}
        </Text>
      </View>
    </View>
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.mainCon}>
      {DefaultTopBarOne(navigation, 0, 'OnBoard New Flats')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      {currentFlatIndex === 0 ? (
        <View style={styles.fieldsCon}>
          <TextInput
            style={styles.inputOne}
            value={numFlats}
            onChangeText={handleNumFlatsChange}
            keyboardType="numeric"
            placeholder="Enter Number Of Flats"
            placeholderTextColor={colors.gray}
            maxLength={2}
          />
          <View style={styles.toggleCon}>
            <Text
              style={[
                styles.toggleText,
                toggleSwitch ? styles.inactiveText : styles.activeText,
              ]}>
              Flat Numbers
            </Text>
            <Switch
              trackColor={{ false: colors.gray2, true: colors.gray2 }}
              thumbColor={
                toggleSwitch ? colors.primaryColor : colors.secondaryColor
              }
              onValueChange={handletoggleSwitch}
              value={toggleSwitch}
            />
            <Text
              style={[
                styles.toggleText,
                toggleSwitch ? styles.activeText : styles.inactiveText,
              ]}>
              Flat Owner Details
            </Text>
          </View>
        </View>
      ) : null}
      {toggleSwitch ? (
        <View style={styles.container}>
          {(currentFlatIndex < numFlats) && (numFlats > 1) && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Enter Details For Flat {currentFlatIndex + 1}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Flat Number"
                placeholderTextColor={colors.gray}
                value={flatDetails.flatNo}
                onChangeText={text =>
                  setFlatDetails({ ...flatDetails, flatNo: text })
                }
              />
              {hasSubmitted && errors.flatNo && (
                <Text style={styles.errorText}>{errors.flatNo}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Owner Phone Number"
                value={flatDetails.ownerPhoneNo}
                placeholderTextColor={colors.gray}
                onChangeText={text =>
                  setFlatDetails({
                    ...flatDetails,
                    ownerPhoneNo: text.replace(/[^0-9]/g, '').slice(0, 10),
                  })
                }
                keyboardType="phone-pad"
                maxLength={10}
              />
              {hasSubmitted && errors.ownerPhoneNo && (
                <Text style={styles.errorText}>{errors.ownerPhoneNo}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Owner Name"
                placeholderTextColor={colors.gray}
                value={flatDetails.ownerName}
                onChangeText={text =>
                  setFlatDetails({ ...flatDetails, ownerName: text })
                }
              />
              {hasSubmitted && errors.ownerName && (
                <Text style={styles.errorText}>{errors.ownerName}</Text>
              )}
              <View style={styles.buttonContainer}>
                {currentFlatIndex > 0 && (
                  <View style={{ width: '45%', marginTop: 15 }}>
                    <PrimaryButton
                      text={'Previous'}
                      bgColor={colors.primaryColor}
                      onPress={handlePreviousFlat}
                    />
                  </View>
                )}
                <View
                  style={
                    currentFlatIndex < 1
                      ? { width: '100%', marginTop: 15 }
                      : { width: '45%', marginTop: 15 }
                  }>
                  <PrimaryButton
                    text={
                      currentFlatIndex === numFlats - 1 ? (
                        'Review'
                      ) : (
                        <Text>OnBoard Flat {currentFlatIndex + 2}</Text>
                      )
                    }
                    bgColor={colors.primaryColor}
                    loading={loader}
                    onPress={
                      currentFlatIndex === numFlats - 1
                        ? handleReviewModal
                        : handleNextFlat
                    }
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View>
          <ScrollView>
            {(numFlats > 1 ) && blockNumbers.map((blockNumber, index) => (
              <View style={{ marginHorizontal: '5%' }} key={index}>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter Name for Flat ${index + 1}`}
                  placeholderTextColor={colors.gray}
                  value={blockNumber}
                  onChangeText={value => handleBlockNumberChange(value, index)}
                  maxLength={20}
                />
                {errors[index] ? (
                  <Text style={styles.errorText}>{errors[index]}</Text>
                ) : null}
              </View>
            ))}
          </ScrollView>
          <View style={{ marginTop: '5%', marginHorizontal: '5%' }}>
            {
              blockNumbers?.length > 1 && (
                <PrimaryButton
                  onPress={handleOnboardFlatNumbers}
                  bgColor={colors.primaryColor}
                  text={'ONBOARD'}
                  loading={loader}
                />
              )
            }
          </View>
        </View>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={reviewModal}
        onRequestClose={() => {}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topBar}>
              <TopBarCard2 txt={'Review Flat Details'} />
            </View>
            <View>
              <FlatList
                data={flatsDetails}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '10%' }}
              />
              <View style={styles.editButtonsCon}>
                <View style={{ width: '40%' }}>
                  <PrimaryButton
                    text={'Edit'}
                    onPress={() => setReviewModal(false)}
                    bgColor={colors.primaryColor}
                  />
                </View>
                <View style={{ width: '40%' }}>
                  <PrimaryButton
                    text={'Submit'}
                    bgColor={colors.primaryColor}
                    onPress={handleSubmitFlatDetails}
                    loader={buttonLoader}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FlatsOnboarding;