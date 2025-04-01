import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../common';
import { styles } from './style';
import PhoneIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const InputField = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  onCardPress,
  width,
  border,
  isUser,
  ...props
}) => {
  return (
    <>
      <View style={[styles.wrapper]}>
        <Text
          style={[
            styles.title,
            { color: titleColor ? titleColor : colors.darkBrown },
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer}>
          {isUser && (
            <View style={styles.imgContainer}>
              <PhoneIcon name="user" style={styles.image} size={20} />
            </View>
          )}

          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            multiline={true}
            autoCapitalize='none'
            placeholder={placeholder}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export const InputField1 = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  ...props
}) => {
  return (
    <>
      <View style={styles.wrapper}>
        <Text
          style={[
            styles.title,
            { color: titleColor ? titleColor : colors.darkBrown },
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer}>
          {isFlag && (
            <View style={styles.imgContainer}>
              <PhoneIcon name="phone" style={styles.image} size={20} />
              <Text style={styles.code}>+91</Text>
            </View>
          )}
          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            {...props}
          />
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export const PasswordField = ({
  title,
  placeholder,
  setState,
  isFlag,
  error,
  titleColor,
  value,
  onCardPress,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  return (
    <>
      <View style={styles.wrapper}>
        <Text
          style={[
            styles.title,
            { color: titleColor ? titleColor : colors.darkBrown },
          ]}>
          {title}
        </Text>
        <View style={styles.fieldContainer}>
          {isFlag && (
            <View style={styles.imgContainer}>
              <PhoneIcon name="phone" style={styles.image} size={20} />
              <Text style={styles.code}>+91</Text>
            </View>
          )}
          <TextInput
            value={value}
            placeholderTextColor={colors.gray2}
            onChangeText={val => setState(val)}
            style={styles.inputText}
            secureTextEntry={isShowPassword}
            autoCapitalize='none'
            {...props}
          />
          {value?.length > 0 && (
            <TouchableOpacity
              style={{ marginLeft: '-10%' }}
              onPress={() => setIsShowPassword(!isShowPassword)}>
              <MaterialCommunityIcon
                name={!isShowPassword ? 'eye' : 'eye-off'}
                style={{ fontSize: 22, }}
                color={colors.primaryColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};
