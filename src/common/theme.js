import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const window = {
  width,
  height,
};
//#253a6d
//#0089d5
//F17171
//FFF2E2
const colors = {
  primaryColor: '#253a6d',
  secondaryColor:'#e0e9ff',
  skyblueColor:'#00B0F8',
  orangeColor:'#FF9B01',
  orangeColor2: 'rgba(255,160,1,0.5)',
  orangeColor3:"rgba(255, 160, 1, 0.4)",
  red1: '#FF2E01',
  red2: '#CB0000',
  red3: '#EE6C4D',
  red6: '#D30000',
  red5: 'rgba(211, 0, 0, 0.08)',
  yellowColor: '#e8a135',
  yellowbg:'#FFE0B2',
  gold: '#FC9605',
  black: '#000',
  black2: '#686869',
  black3:'#383535',
  green: '#31932A',
  green2: '#0A673B',
  green3: '#E6F7F1',
  green4: '#EAF8F3',
  green5: '#0EBD96',
  greenBg:'#bdf0e4',
  blue: '#004FE9',
  white: '#FFFFFF',
  gray0: '#F5F5F5',
  gray: '#595959',
  gray2: '#C2C2C2',
  gray3: '#ECECEC',
  gray4: '#F3F3F3',
  gray5: '#D9D9D9',
  darkBrown: '#3F2117',
  blue2: '#0098FD',
  blue3: '#06B3C4',
  lightBlue:'#177cd4',
  red4: '#DD1E0C',
  shadowColor: 'rgba(0, 0, 0, 0.24)',
};
const timer = {
  loaderTime: 1000,
};
export {timer, window, colors};
