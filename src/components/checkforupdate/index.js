import React, { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

const CheckForUpdate = () => {
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const currentVersion = VersionCheck.getCurrentVersion();
        // console.log('Current Version:', currentVersion);

        const latestVersion = await VersionCheck.getLatestVersion();
        // console.log('Latest Version:', latestVersion);

        
        const updateNeededResult = await VersionCheck.needUpdate();
        // console.log('Is update needed?', updateNeededResult.isNeeded); 

        if (updateNeededResult?.isNeeded) {
          
          const updateUrl = Platform.OS === 'ios'
            ? 'itms-apps://apps.apple.com/us/app/6639611241'  
            : 'market://details?id=com.nivaas';           

          
          Alert.alert(
            'Update Available',
            'A new version of the app is available. Please update to the latest version.',
            [
              {
                text: 'Later',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'UPDATE',
                onPress: () => Linking.openURL(updateUrl), 
              },
            ]
          );
        } else {
          console.log('No update needed');
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    };

    checkVersion();
  }, []);

  return null;
};

export default CheckForUpdate;
