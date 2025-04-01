import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 720;


// For paddingHorizontal, marginHorizontal, paddingLeft, paddingRight, marginLeft, marginRight, width
export const horizontalScale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;

// For paddingVertical, marginVertical, paddingTop, paddingBottom, marginTop, marginBottom, height
export const verticalScale = (size: number) =>
  (longDimension / guidelineBaseHeight) * size;

// for font scaling
export const fontScale = (size: number, factor = 0.3) =>
  size + (horizontalScale(size) - size) * factor;

// for line height scaling
export const fontVerticalScale = (size: number, factor = 0.3) =>
  size + (verticalScale(size) - size) * factor;

export const scale = (num: number) => num;

// export const scalingFactor = (size: number, factor = 0.3) =>
//   (size + (horizontalScale(size) - size) * factor) * 0.88;

