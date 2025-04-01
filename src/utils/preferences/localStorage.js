import {PreferencesKeys} from './preferencesKeys';
import {
  storeValue,
  getValue,
  removeMultiple,
} from './asyncStoragePreferences';

export const saveLoginSessionDetails = async (tokenType, authToken) => {
  await storeValue(PreferencesKeys.authToken, tokenType + ' ' + authToken);
};
export const saveRefreshTokenDetails = async (tokenType, refreshToken) => {
  await storeValue(PreferencesKeys.refreshToken, refreshToken);
};
export const getLogionSessionDetails = async () => {
  let authToken = await getValue(PreferencesKeys.authToken);
  console.log(authToken); 
  return {
    authToken: authToken.value || '',
  };
};
export const getRefreshToken = async () => {
  let refreshToken = await getValue(PreferencesKeys.refreshToken);
  let RefreshToken = refreshToken.value || '';
  // console.log('REFRESH_TOKEN--->', RefreshToken);
  return RefreshToken;
};
export const getAuthTokenDetails = async () => {
  let authToken = await getValue(PreferencesKeys.authToken);
  let bearerToken = authToken.value || '';
  console.log('AUTH_TOKEN--->', bearerToken);
  return bearerToken;
};
export const removeLoginSessionDetails = async () => {
  await storeValue(PreferencesKeys.BasicAuth, null);
};
export const removeRefreshTokenDetails = async () => {
  await storeValue(PreferencesKeys.refreshToken, null);
};
export const clearKeys = async () => {
  const keys = [PreferencesKeys.BasicAuth,PreferencesKeys.authToken,PreferencesKeys.refreshToken];  
  await removeMultiple(keys);
}
export const setSeenStatus = async (key,value) => {
  await storeValue(key,value);
  // console.log('SEEN VALUE STORED');
}
export const getSeenStatus = async () => {
  let seenValue = await getValue(PreferencesKeys.hasSeenSlides);
  let hasSeen = seenValue.value || '';
  // console.log(hasSeen,'GET SEEN VALUE');
  return hasSeen;
}