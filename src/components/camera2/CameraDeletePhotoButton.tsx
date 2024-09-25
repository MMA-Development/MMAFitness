import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useCamera} from './CameraContext';

export function CameraDeletePhotoButton() {

  const {setCapturedPhoto} = useCamera()

  return (
    <TouchableOpacity
      onPress={() => setCapturedPhoto(null)}
      style={styles.button} // Use the defined style for the button
    >
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 50,
    left: 35,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    borderWidth: 2,
    borderColor: '#EEE',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
});