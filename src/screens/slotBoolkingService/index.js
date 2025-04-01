import {StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../common';
import { DefaultTopBarOne } from '../../common/customFunctions';

const {width, height} = Dimensions.get('window'); // Get device width and height

const SlotBookingService = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const [location] = useState({
    name: 'Shanthala Nagar, Ashok Nagar, Bengaluru',
  });

  const today = moment(); // Current date
  const previousDates = [
    today.clone().subtract(3, 'days'),
    today.clone().subtract(2, 'days'),
    today.clone().subtract(1, 'days'),
    today.clone(),
  ]; // Array holding last 3 days + today

  // Display DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle Date Selection from Picker
  const handleConfirm = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const minDate = moment(new Date(2024, 0, 1));
    // const maxDate = moment();

    if (moment(date).isBetween(minDate, maxDate, 'day', '[]')) {
      setSelectedDate(formattedDate);
      checkSlotAvailability(formattedDate); // Call to check slot availability
    } else {
      Alert.alert('Invalid Date', 'Please select a date between January 1, 2024 and today.');
    }
    hideDatePicker();
  };

  // Check if slots are fully booked for the selected date
  const checkSlotAvailability = date => {
    // Mock function to simulate checking if the slot is available
    if (moment(date).isSame(moment('2024-09-18'), 'day')) {
      setIsFullyBooked(true);
    } else {
      setIsFullyBooked(false);
    }
  };

  // Handle click on one of the last 3 dates + today
  const handleDateSelection = date => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    checkSlotAvailability(formattedDate);
  };

  return (
    <View style={styles.container}>
      {DefaultTopBarOne(navigation, 0, 'Slot Booing')}
      {/* <Text style={styles.heading}>Book your Slot</Text> */}

      {/* Display the last 3 days + today */}
      <View style={styles.datesContainer}>
        {previousDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dateButton, selectedDate === moment(date).format('YYYY-MM-DD') && styles.selectedDateButton]}
            onPress={() => handleDateSelection(date)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === moment(date).format('YYYY-MM-DD') && styles.selectedDateText,
              ]}
            >
              {index === previousDates.length - 1 ? 'Today' : moment(date).format('DD')}
            </Text>
            <Text
              style={[
                styles.dayText,
                selectedDate === moment(date).format('YYYY-MM-DD') && styles.selectedDayText,
              ]}
            >
              {index === previousDates.length - 1 ? 'Today' : moment(date).format('ddd')}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Show selected date or Pick Date button */}
        {selectedDate ? (
          <TouchableOpacity style={styles.selectedDateButtonView} onPress={showDatePicker}>
            <Text style={styles.selectedDateText}>{selectedDate}</Text>
            <AntDesign name="edit" size={20} color={colors.primaryColor} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.pickDateButton} onPress={showDatePicker}>
            <AntDesign name="calendar" size={20} color={colors.primaryColor} />
            <Text style={styles.pickDateText}>Pick Date</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slot Availability */}
      <View style={styles.slotContainer}>
        {isFullyBooked ? (
          <Text style={styles.errorText}>
            Fully booked for the day due to high demand. Please choose another date. Thank you!
          </Text>
        ) : (
          <Text style={styles.availableText}>Available slots will be shown here.</Text>
        )}
      </View>

      {/* Location Details */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Service at Home</Text>
        <Text style={styles.addressText}>{location.name}</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date(2024, 0, 1)}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        buttonTextColorIOS="purple"
      />

      {/* Book Slot Button */}
      <TouchableOpacity
        style={[styles.bookButton, isFullyBooked && {backgroundColor: colors.disabledButton}]}
        disabled={isFullyBooked}
        onPress={() => Alert.alert('Slot Booked', `You've booked a slot for ${selectedDate}`)}
      >
        <Text style={styles.bookButtonText}>Book Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SlotBookingService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: height * 0.03,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height * 0.02,
    marginHorizontal:'5%'
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 5,
  },
  selectedDateButton: {
    backgroundColor: colors.primaryColor,
  },
  dateText: {
    fontSize: height * 0.02,
    color: colors.primaryColor,
  },
  selectedDateText: {
    color: '#fff', // White text when selected
  },
  dayText: {
    fontSize: height * 0.018,
    color: colors.primaryColor,
  },
  selectedDayText: {
    color: '#fff', // White text for the day when selected
  },
  pickDateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.01,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 5,
  },
  pickDateText: {
    marginLeft: width * 0.02,
    fontSize: height * 0.02,
    color: colors.primaryColor,
  },
  selectedDateButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: height * 0.01,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 5,
  },
  slotContainer: {
    alignItems: 'center',
    marginVertical: height * 0.03,
  },
  availableText: {
    color: 'green',
    fontSize: height * 0.02,
  },
  errorText: {
    color: 'red',
    fontSize: height * 0.02,
    textAlign: 'center',
  },
  locationContainer: {
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginHorizontal:'5%'
  },
  locationText: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: height * 0.018,
    color: '#888',
  },
  changeText: {
    fontSize: height * 0.018,
    color: colors.primaryColor,
    textDecorationLine: 'underline',
    marginTop: height * 0.01,
  },
  bookButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: height * 0.02,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: height * 0.03,
    marginHorizontal:"5%"
  },
  bookButtonText: {
    color: '#fff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
});