import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native'
import { allTexts } from '../../common';
import { navigationRef } from '../../navigation/rootNavigation';

export const Notificationhandlers =()=>{
  const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
    onDisplayNotification(remoteMessage);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in background', remoteMessage);
    onDisplayNotification(remoteMessage);
  });

  const unsubscribeNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', remoteMessage.notification);
    handleNotificationNavigation(remoteMessage);
  });

  const unsubscribeInitialNotification = messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage.notification);
      handleNotificationNavigation(remoteMessage);
    }
  });

  const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      console.log('User pressed the notification.', detail.notification);
      handleNotificationNavigation(detail.notification.data);
    }
  });
}

export const  requestUserPermission = async()=> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
  if (enabled) {
    console.log('Authorization status of FCM TOKEN:', authStatus);
  }
 
  if (enabled && Platform.OS === 'ios') {
    await messaging().registerDeviceForRemoteMessages();
    console.log('Authorization status of FCM TOKEN IOS:', authStatus);
  }
}

export const  onDisplayNotification = async(data) => {
  console.log('-----------------------------------', data?.notification);
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
    data: data.data,
  });
}

export const  handleNotificationNavigation = (data) => {
  console.log(data);
  if (data && data.screen) {
    navigationRef.current?.navigate(allTexts.screenNames.notification, data?.params);
  }
}
