import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PrimaryButton, TopBarCard2 } from '../../components';
import { statusBarHeight } from '../../utils/config/config';
import { allTexts, colors } from '../../common';
import { useAddPrepaidMeterMutation } from '../../redux/services/prepaidMeterService';
import { validatePrepaidMeterFields } from '../../common/schemas';
import { DefaultTopBarOne, SnackbarComponent } from '../../common/customFunctions';

const AddPrepaidMeter = ({ navigation, route }) => {
  const routeData = route?.params || {};
  const [Loader, setLoader] = useState(false);
  const [meterName, setMeterName] = useState('');
  const [description, setDescription] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [errors, setErrors] = useState({});
  const [addPrepaidMeter] = useAddPrepaidMeterMutation();

  const handleAddPrepaidMeter = () => {
    const { valid, errors } = validatePrepaidMeterFields(meterName, description, costPerUnit);
    if (!valid) {
      setErrors(errors);
      return;
    }

    const prepaidMeterPayload = {
      apartmentId: routeData?.selectedApartmentId,
      name: meterName,
      description: description,
      costPerUnit: costPerUnit,
    };

    // console.log(prepaidMeterPayload);
    setLoader(true);
    addPrepaidMeter(prepaidMeterPayload)
      .unwrap()
      .then(response => {
        console.log('ADD PREPAID METER RESPONSE======>', response);
        setLoader(false);
        SnackbarComponent({text: response?.message || 'Prepaid Meter Added',backgroundColor:colors.green5});
        navigation.navigate(allTexts.screenNames.prepaidMeter);
      })
      .catch(error => {
        console.log('ERROR IN add Prepaid Meter', error);
        if (error?.data?.errorCode === 1003) {
          SnackbarComponent({ text:error?.data?.errorMessage || 'Apartment not found', backgroundColor: colors.red3 });
        }else if (error?.data?.errorCode === 1018) {
          SnackbarComponent({ text:error?.data?.errorMessage || 'ERROR IN add Prepaid Meter', backgroundColor: colors.red3 });
        }else{
          SnackbarComponent({text:'ERROR IN add Prepaid Meter', backgroundColor: colors.red3 });
        }
      });
  };

  return (
    <View style={styles.mainCon}>
      {DefaultTopBarOne(navigation,0,'Add Prepaid Meters',true)}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputCard}>
            <Text style={styles.label}>Meter Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter meter name"
              value={meterName}
              onChangeText={setMeterName}
              autoFocus
            />
            {errors.meterName && <Text style={styles.error}>{errors.meterName}</Text>}
            
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
            />
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}
            
            <Text style={styles.label}>Cost Per Unit:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cost per unit"
              value={costPerUnit}
              onChangeText={setCostPerUnit}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.costPerUnit && <Text style={styles.error}>{errors.costPerUnit}</Text>}
          </View>
        </View>
        <TouchableOpacity style={styles.buttonCon}>
          <PrimaryButton text={'SAVE'} bgColor={colors.primaryColor} onPress={handleAddPrepaidMeter} loading={Loader}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: colors.white,
    height: '100%',
  },
  container: {
    flex: 1,
    marginHorizontal: '5%',
    marginVertical: '5%',
    backgroundColor: '#fff',
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: '2%',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color:colors.black
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: colors.gray4,
    color: colors.black,
    fontSize: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonCon: {
    marginHorizontal: '5%',
    marginBottom: '10%',
  },
});

export default AddPrepaidMeter;
