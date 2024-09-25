import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useCamera} from './CameraContext';

export function CameraPhotoButton() {

  const {takePhoto} = useCamera()

  return (
    <TouchableOpacity style={styles.button} onPress={takePhoto}/>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 5,
    borderColor: '#EEE',
    padding: 40,
    borderRadius: Number.MAX_SAFE_INTEGER
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});