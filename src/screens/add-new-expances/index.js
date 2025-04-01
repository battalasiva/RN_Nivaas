import {Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {allTexts, colors} from '../../common';
import {
  CustomSelectDropdown,
  PrimaryButton,
  TopBarCard2,
} from '../../components';
import {statusBarHeight} from '../../utils/config/config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ExpancesValidation} from '../../common/schemas';
import {
  useAddCreditHistoryMutation,
  useAddDebitHistoryMutation,
  useUpdateCreditHistoryMutation,
  useUpdateDebitHistoryMutation,
} from '../../redux/services/expansesServices';
import {SnackbarComponent} from '../../common/customFunctions';
import {styles} from './style';

const AddNewExpances = ({navigation, route}) => {
  const {data, mode} = route?.params || {};
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [transactionType, setTransactionType] = useState();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(null);
  const [errors, setErrors] = useState({});
  const [addDebitHistory] = useAddDebitHistoryMutation();
  const [updateHistory] = useUpdateDebitHistoryMutation();
  const [addCreditHistory] = useAddCreditHistoryMutation();
  const [updateCredithistory] = useUpdateCreditHistoryMutation();
  const TypeOfTransactions = [
    {name: 'UTILITIES'},
    {name: 'SERVICES'},
    {name: 'REPAIRS'},
    {name: 'SALARY'},
    {name: 'OTHER'},
  ];

  const handleupdatestates = () => {
    setSelectedDate(data?.itemId?.transactionDate);
    mode === 'UPDATE_EXPENCES' ?
    setTransactionType(
      TypeOfTransactions?.find(type => type?.name === data?.itemId?.type),
    ) :  setTransactionType(data.itemId?.creditType);
    setDescription(data?.itemId?.description);
    setAmount(data?.itemId?.amount);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const minDate = moment(new Date(2024, 0, 1));
    const maxDate = moment();

    if (moment(date).isBetween(minDate, maxDate, 'day', '[]')) {
      setSelectedDate(formattedDate);
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        date: 'Please select a date between January 1, 2023 and today.',
      }));
    }
    hideDatePicker();
  };

  const getTitle = () => {
    switch (mode) {
      case 'ADD_EXPENCES':
        return 'Add Expense';
      case 'UPDATE_EXPENCES':
        return 'Update Expense';
      case 'ADD_CREDITS':
        return 'Add Credits';
      default:
        return 'Update Credits';
    }
  };

  const handleSave = () => {
    if (mode === 'ADD_EXPENCES') {
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const payload = {
          transactionDate: selectedDate,
          type: transactionType?.name,
          description: description,
          amount: amount,
          apartmentId: data,
        };
        // console.log(payload);
        addDebitHistory(payload)
          .unwrap()
          .then(response => {
            console.log('ADD DEBIT HISTORY response', response);
            SnackbarComponent({
              text: response?.message || 'Expances Added',
              backgroundColor: colors.green5,
            });
            navigation.navigate(allTexts.screenNames.expences);
          })
          .catch(error => {
            console.log('ERROR in adding History', error);
            SnackbarComponent({
              text: 'Failed To Add Expances',
              backgroundColor: colors.red3,
            });
          });
      }
    } else if (mode === 'UPDATE_EXPENCES') {
      // console.log('update');
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const updatepayload = {
          id: data?.itemId?.id,
          payload: {
            transactionDate: selectedDate,
            type: transactionType?.name,
            description: description,
            amount: amount,
            apartmentId: data?.apartmentId,
          },
        };
        updateHistory(updatepayload)
          .unwrap()
          .then(response => {
            console.log('response OF UPDATE HISTORY', response);
            SnackbarComponent({
              text: response?.message || 'Expances Updated',
              backgroundColor: colors.green5,
            });
            navigation.navigate(allTexts.screenNames.expences);
          })
          .catch(error => {
            console.log('ERROR IN UPDATING DEBIT HISTORY', error);
            SnackbarComponent({
              text: 'failed To Update Expances',
              backgroundColor: colors.red3,
            });
          });
      }
    } else if (mode === 'ADD_CREDITS') {
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const payload = {
          transactionDate: selectedDate,
          creditType: transactionType,
          description: description,
          amount: amount,
          apartmentId: data,
        };
        addCreditHistory(payload)
          .unwrap()
          .then(response => {
            console.log('ADD CREDITS====>', response);
            SnackbarComponent({
              text: response?.message || 'Credit added',
              backgroundColor: colors.green5,
            });
            navigation.navigate(allTexts.screenNames.expences);
          })
          .catch(error => {
            console.log('ERROR IN ADD CREDITS===>', error);
          });
      }
    }else if (mode === 'UPDATE_CREDITS') {
      const validationErrors = ExpancesValidation(
        selectedDate,
        transactionType,
        description,
        amount,
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const updatepayload = {
          id: data?.itemId?.id,
          payload: {
            transactionDate: selectedDate,
            creditType: transactionType,
            description: description,
            amount: amount,
            apartmentId: data?.apartmentId,
          },
        };
        updateCredithistory(updatepayload)
          .unwrap()
          .then(response => {
            console.log('response OF UPDATE Credits', response);
            SnackbarComponent({text: response?.message || 'Credits Updated',backgroundColor: colors.green5});
            navigation.navigate(allTexts.screenNames.expences);
          })
          .catch(error => {
            console.log('ERROR IN UPDATING Credit HISTORY', error);
            SnackbarComponent({text: 'failed To Update Credit',backgroundColor: colors.red3});
          });
      }
    }
  };

  useEffect(() => {
    if (mode === 'UPDATE_EXPENCES' || mode === 'UPDATE_CREDITS') {
      handleupdatestates();
    }
  }, []);

  return (
    <View style={styles.mainCon}>
      <View style={{height: 70, marginTop: statusBarHeight}}>
        <TopBarCard2
          back={true}
          txt={getTitle() || 'Add Expense'}
          navigation={navigation}
        />
      </View>
      <View style={styles.dateDropDownCon}>
        <View
          style={{
            width:
              mode === 'ADD_EXPENCES' || mode === 'UPDATE_EXPENCES'
                ? '47%'
                : '100%',
          }}>
          <View
            style={
              mode === 'ADD_EXPENCES' || mode === 'UPDATE_EXPENCES'
                ? styles.dateModalIconCon
                : [styles.dateModalIconCon, {height: 50}]
            }>
            <AntDesign
              name="calendar"
              size={30}
              style={{color: colors.primaryColor, marginLeft: 5}}
              onPress={showDatePicker}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Enter date"
              value={selectedDate}
              onChangeText={setSelectedDate}
            />
          </View>
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          minimumDate={new Date(2024, 0, 1)}
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          buttonTextColorIOS="purple"
        />
        {(mode === 'ADD_EXPENCES' || mode === 'UPDATE_EXPENCES') && (
          <View style={{width: '47%'}}>
            <View style={styles.selectDropdown}>
              <CustomSelectDropdown
                data={TypeOfTransactions}
                onSelect={item => setTransactionType(item)}
                selectedItem={transactionType}
                placeholder="Select Type"
              />
            </View>
            {errors.transactionType && (
              <Text style={styles.errorText}>{errors.transactionType}</Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.textFieldsCon}>
        {(mode === 'ADD_CREDITS' || mode === 'UPDATE_CREDITS') && (
          <TextInput
            style={styles.input}
            placeholder="Enter Transaction Type"
            value={transactionType}
            onChangeText={setTransactionType}
          />
        )}
        {errors.transactionType && (
          <Text style={styles.errorText}>{errors.transactionType}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={amount?.toString()}
          onChangeText={setAmount}
          keyboardType="numeric"
          maxLength={10}
        />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
        <View style={styles.button}>
          <PrimaryButton
            text={getTitle() || 'Add Expense'}
            bgColor={colors.primaryColor}
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewExpances;
