import {StyleSheet} from 'react-native';

export const CameraStyles  = StyleSheet.create({
  container: {
    flex: 1,
    width: '50%',
    position: 'relative', // Allow absolute positioning for child elements
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end', // Align items to the bottom of the container
    paddingBottom: 200, // Padding from the bottom
    alignItems: 'center', // Center items horizontally
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center the row of buttons
    width: '100%', // Full width for better centering
  },
  flashSelector: {
    marginHorizontal: 20, // Space between the button and flash selector
  },
});