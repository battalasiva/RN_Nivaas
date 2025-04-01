/* eslint-disable react/react-in-jsx-scope */
import {styles} from './style';
import {TextInput} from '@react-native-material/core';

export const TempleInput = ({label, placeholder, width, value}) => {
  return (
    <TextInput
      variant="outlined"
      label={value ? '' : label}
      placeholder={placeholder}
      color={'#FFA001'}
      leadingContainerStyle={styles.inputField}
      style={{width: width}}
      value={value}
    />
  );
};
