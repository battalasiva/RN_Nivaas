import {Dimensions,Platform,StatusBar,NativeModules} from 'react-native';
const { StatusBarManager } = NativeModules;
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const statusBarHeight  = Platform.OS === 'ios' ?  StatusBarManager.HEIGHT : StatusBar.currentHeight; 

