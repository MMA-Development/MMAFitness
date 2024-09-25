import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native'
import {useCamera} from './CameraContext';

interface CameraFlashSelectorProps {
  style?: StyleProp<ViewStyle>;
}

export function CameraFlashSelector({style}: CameraFlashSelectorProps) {

  const {flash, toggleFlash} = useCamera()

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={toggleFlash} style={[
        {
          alignItems: 'center',
          backgroundColor: flash === 'on' ? '#EEE' : 'transparent',
          borderWidth: 2,
          borderColor: '#EEE',
          padding: 10,
          borderRadius: Number.MAX_SAFE_INTEGER
        }, style
      ]}
      >
        <Text style={{
          color: flash === 'on' ? 'black' : 'white'
        }}>
          {flash}
        </Text>
      </TouchableOpacity>
      <Text style={{color: 'white', marginTop: 5}}>Flash</Text>
    </View>
  )
}