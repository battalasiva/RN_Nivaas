import React, {useEffect} from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation, {navigationRef} from './src/navigation/rootNavigation';
import messaging from '@react-native-firebase/messaging';
import {
  Notificationhandlers,
  requestUserPermission,
} from './src/utils/notification-utils/NotificationsUtils';
import {CheckForUpdate} from './src/components';

const App = () => {
  const requestFCMToken = async () => {
    try {
      await messaging()?.registerDeviceForRemoteMessages();
      const token = await messaging()?.getToken();
      // console.log('FCM Token IOS:', token);
      return token;
    } catch (error) {
      console.error('Error in getting FCM token:', error);
    }
  };

  const checkToken = async () => {
    try {
      await messaging()?.requestPermission();
      const token = await messaging()?.getToken();
      // console.log('Device Token:', token);
    } catch (error) {
      console.log('ERROR IN FCM TOKEN', error);
    }
  };

  const handleFcmCall = () =>{
    if (Platform.OS === 'ios') {
      requestFCMToken();
    } else {
      checkToken();
    }
  }
  
  const theme = useColorScheme();
  useEffect(() => {
    requestUserPermission();
    Notificationhandlers();
    handleFcmCall();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <CheckForUpdate />
          <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            translucent={true}
          />
          <NavigationContainer ref={navigationRef}>
            <RootNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
