import {Dimensions} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {Gesture} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {CameraContextProps} from './CameraContext';
import {clamp} from '../../utils';

export function useZoomOnPinch(camera: CameraContextProps) {
  const {width, height} = Dimensions.get('screen');

  const zoom = useSharedValue(0.001);

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      // Use velocity to determine zoom factor change
      const velocityScale = event.velocity; // Velocity can be used here

      // Adjust zoom increment based on velocity (you can fine-tune these factors)
      const zoomChange = velocityScale * 0.0005; // Fine-tune this multiplier

      // Update zoom value, making sure to clamp it within min and max limits
      const newZoom = clamp(zoom.value + zoomChange, 0, 0.1);
      zoom.value = newZoom;

      camera.onChangeZoom(newZoom);
    })
    .onEnd(() => {
      camera.onChangeZoom(zoom.value);
    })
    .runOnJS(true);

  useEffect(() => {
    camera.onChangeZoom(zoom.value);
  }, [camera, zoom.value]);

  return {
    width,
    height,
    pinch
  }
}