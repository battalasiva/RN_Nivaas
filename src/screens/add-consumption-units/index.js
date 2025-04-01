import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, Alert, ScrollView } from 'react-native';
import { allTexts, colors } from '../../common';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetAparmentPrepaidMetersQuery, useUpdateConsumedUnitsMutation } from '../../redux/services/prepaidMeterService';
import { DefaultTopBarOne, getNewAuthToken, SnackbarComponent } from '../../common/customFunctions';
import { CustomDropdown, DefaultApartmentComp, Loader, PrimaryButton } from '../../components';
import { useLazyGetlastConsumptionDetailsQuery } from '../../redux/services/maintainenceService';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddConsumptionUnits = ({ navigation }) => {
  const dispatch = useDispatch();
  const { selectedApartment } = useSelector(state => state.cityData);

  const [flatData, setFlatData] = useState([]);
  const [textInputData, setTextInputData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [prepaidMetersData, setPrepaidMetersData] = useState([]);
  const [selectedPrepaidMeter, setSelectedPrepaidMeter] = useState(null);

  const [updateConsumptionUnits] = useUpdateConsumedUnitsMutation();
  const [lastAddedConsumption] = useLazyGetlastConsumptionDetailsQuery();
  const [getApartmentPrepaidMetersList] = useLazyGetAparmentPrepaidMetersQuery();

  const handlePrepaidMetersList = async () => {
    setLoader(true);
    if (selectedApartment?.id) {
      const payload = {
        apartmentId: selectedApartment.id,
        pageNo: 0,
        pageSize: 200,
      };

      try {
        const response = await getApartmentPrepaidMetersList(payload).unwrap();
        setPrepaidMetersData(response.data);

        if (response.data.length > 0) {
          setSelectedPrepaidMeter({ id: response.data[0].id, name: response.data[0].name });
          fetchLastConsumption(selectedApartment.id, response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching prepaid meters:', error);
        handleError(error, 'Apartment PrepaidMetersList');
        if (error?.data?.status === 401) {
          getNewAuthToken(dispatch);
        }
      } finally {
        setLoader(false);
      }
    }
  };

  const fetchLastConsumption = async (apartmentId, prepaidId) => {
    if (!apartmentId || !prepaidId) return;
    setLoader(true);
    const payload = {
      apartmentId,
      prepaidId,
    };
    try {
      const response = await lastAddedConsumption(payload).unwrap();
      const formattedData = response.map(item => ({
        flatId: item.flatId,
        flatNo: item.flatNumber,
        unitsConsumed: String(item.unitsConsumed),
      }));
      setFlatData(formattedData);
      setTextInputData(formattedData);
    } catch (error) {
      if (error?.data?.status === 401) {
        getNewAuthToken(dispatch);
      }
      console.error('Error fetching last consumption:', error);
    } finally {
      setLoader(false);
    }
  };
  const handleUpdateConsumptionUnits = useCallback(() => {
    if (!flatData?.length) {
      return Alert.alert(
        'No Flats Available',
        `There are no flats onboarded in the ${selectedApartment?.name?.toUpperCase()} apartment. Please onboard flats to add consumption.`
      );
    }
    const isValid = flatData.every(flat => {
      const consumed = textInputData.find(item => item.flatId === flat.flatId)?.unitsConsumed?.trim();
      return consumed && consumed !== '';
    });
    if (!isValid) {
      return Alert.alert('Validation Error', 'Please enter consumption units for all flats.');
    }
    const payload = {
      prepaidId: selectedPrepaidMeter?.id,
      apartmentId: selectedApartment?.id,
      flatConsumption: textInputData,
    };
    setLoader(true);
    updateConsumptionUnits(payload)
      .unwrap()
      .then(() => {
        SnackbarComponent({ text: 'Consumption Added', backgroundColor: colors.green5 });
      })
      .catch(error => {
        console.error('Error updating consumption units:', error);
      })
      .finally(() => setLoader(false));
  }, [flatData, textInputData, selectedPrepaidMeter?.id, selectedApartment?.id]);

  const handleConsumptionUnits = useCallback((flatId, unitsConsumed) => {
    setTextInputData(prevState => {
      const updatedData = [...prevState];
      const index = updatedData.findIndex(item => item.flatId === flatId);
      if (index !== -1) {
        updatedData[index].unitsConsumed = unitsConsumed;
      } else {
        updatedData.push({ flatId, unitsConsumed });
      }
      return updatedData;
    });
  }, []);

  const handleError = (error, context) => {
    if (error?.data?.status === 401) {
      getNewAuthToken(dispatch);
    } else {
      SnackbarComponent({
        text: error?.data?.errorMessage || `Error in ${context}`,
        backgroundColor: error?.data?.errorCode === 1021 ? colors.yellowColor : colors.red3,
      });
    }
  };

  useEffect(() => {
    if (selectedApartment?.id) {
      handlePrepaidMetersList();
    }
  }, [selectedApartment?.id]);

  return (
    <KeyboardAwareScrollView
      style={styles.mainCon}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {DefaultTopBarOne(navigation, 0, 'Add Consumption Units')}
      <DefaultApartmentComp selectedApartment={selectedApartment} />
      {loader ? (
        <Loader color={colors.primaryColor} size="large" marginTop="40%" />
      ) : (
        <View style={styles.container2}>
          <CustomDropdown
            label="Prepaid Meter"
            data={prepaidMetersData}
            value={selectedPrepaidMeter?.id}
            onChange={(id, name) => {
              setSelectedPrepaidMeter({ id, name });
              fetchLastConsumption(selectedApartment.id, id);
            }}
            labelField="name"
            valueField="id"
          />
          <View style={styles.header}>
            <Text style={[styles.headerCell, { textDecorationLine: 'underline' }]}>Flat Number</Text>
            <Text style={[styles.headerCell, { textDecorationLine: 'underline' }]}>Consumption (Units)</Text>
          </View>
          <ScrollView>
            {flatData.map(item => (
              <View style={styles.row} key={item.flatId}>
                <Text style={styles.cell}>{item.flatNo}</Text>
                <TextInput
                  placeholder="Enter a Value"
                  value={textInputData.find(data => data.flatId === item.flatId)?.unitsConsumed || ''}
                  onChangeText={text => handleConsumptionUnits(item.flatId, text)}
                  keyboardType="numeric"
                  maxLength={6}
                  style={{textAlign:'center',margin:10,height:40,width:100,borderRadius:5,backgroundColor:colors.white}}
                />
              </View>
            ))}
            {!flatData.length && <Text style={styles.noDataText}>{allTexts.paragraphs.NoItemsText}</Text>}
          </ScrollView>
          {selectedPrepaidMeter?.id && (
            <View style={styles.updateButton}>
              <PrimaryButton
                text="Add Consumption"
                onPress={handleUpdateConsumptionUnits}
                bgColor={colors.primaryColor}
                loading={loader}
              />
            </View>
          )}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default AddConsumptionUnits;