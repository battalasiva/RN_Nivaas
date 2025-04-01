import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {
  getAuthTokenDetails,
  getRefreshToken,
  saveLoginSessionDetails,
  saveRefreshTokenDetails,
} from '../../utils/preferences/localStorage';
import {BASE_URL_USER} from '../../api/api';
import {endpoints} from '../../api';
import {loginAction} from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const RefreshTokenCode = () => {
    const dispatch = useDispatch();
 const handleRefreshToken = async() =>{
    try {
        const refreshToken = await getRefreshToken();
        const accessToken = await getAuthTokenDetails();
    
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', accessToken);
    
        const raw = JSON.stringify({
          refreshToken: refreshToken,
        });
    
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };
    
        const response = await fetch(
          `${BASE_URL_USER}${endpoints.REFRESH_TOKEN}`,
          requestOptions,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result, 'LLLLLLLLLLLLLLLLLLLLLLLLLLL');
        dispatch(loginAction({token: result?.token, tokenType: result?.type}));
        saveLoginSessionDetails(result?.type, result?.token);
        saveRefreshTokenDetails('RefreshToken', result?.refreshToken);
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
 }
 useEffect(() => {
  handleRefreshToken();
 }, [])
 
  return null;
};

export default RefreshTokenCode;

const styles = StyleSheet.create({});
