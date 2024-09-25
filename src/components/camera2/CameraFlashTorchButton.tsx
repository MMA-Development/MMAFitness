import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import * as Haptics from 'expo-haptics';
import {useCamera} from './CameraContext';

interface CameraFlashTorchButtonProps {
  style?: StyleProp<ViewStyle>
}

export function CameraFlashTorchButton({style}: CameraFlashTorchButtonProps) {

  const {torch, toggleTorch} = useCamera()

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft).then(toggleTorch)
        }}
        style={[
          {
            alignItems: 'center',
            backgroundColor: torch ? '#EEE' : 'transparent',
            borderWidth: 2,
            borderColor: '#EEE',
            padding: 10,
            borderRadius: Number.MAX_SAFE_INTEGER
          }, style
        ]}
      >
        <Text style={{
          color: torch ? 'black' : 'white'
        }}>
          {torch ? 'on' : 'off'}
        </Text>
      </TouchableOpacity>
      <Text style={{color: 'white', marginTop: 5}}>Torch</Text>
    </View>
  )
}