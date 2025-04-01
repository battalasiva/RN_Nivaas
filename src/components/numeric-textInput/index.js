import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from 'react-native-elements';

const NumericTextInput = () => {
  const [value, setValue] = useState(0);
  const handleIncrement = () => {
    setValue(prevValue => prevValue + 1);
  };

  const handleDecrement = () => {
    setValue(prevValue => (prevValue > 0 ? prevValue - 1 : 0));
  };

  const handleChangeText = text => {
    const newValue = parseInt(text, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setValue(newValue);
    } else if (text === '') {
      setValue(0);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input1}
          value={String(value)}
          onChangeText={handleChangeText}
          keyboardType="numeric"
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleIncrement} style={styles.button}>
            <MaterialIcons
              name="keyboard-arrow-up"
              size={24}
              color={colors.grey0}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDecrement} style={styles.button}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={colors.grey0}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NumericTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey0,
    borderRadius: 3,
  },
  button: {
    width: 20,
    height: 17,
    alignItems:'center'
  },
  input1: {
    width: 70,
    height: 40,
    textAlign: 'center',
    fontSize: 17,
  },
  buttons:{
    marginBottom:5,
    marginRight:5,
  }
});
