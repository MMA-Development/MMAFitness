import {CameraView} from 'expo-camera';
import {
  GestureDetector,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import {Alert, Image, View} from 'react-native';
import {useCamera} from './CameraContext';
import {useZoomOnPinch} from './useZoomOnPinch';
import {CameraStyles} from './styles';
import {CameraFlashTorchButton} from './CameraFlashTorchButton';
import {CameraPhotoButton} from './CameraPhotoButton';
import {CameraFlashSelector} from './CameraFlashSelector';
import {CameraDeletePhotoButton} from './CameraDeletePhotoButton';
import * as WebBrowser from 'expo-web-browser';

interface CameraProps {
  showCamera: (show: boolean) => void
}

export function Camera({showCamera}: CameraProps) {
  const camera = useCamera();

  const {
    width,
    height,
    pinch
  } = useZoomOnPinch(camera)

  return (
    !camera.capturedPhoto ? (
      <GestureHandlerRootView style={CameraStyles.container}>
        <CameraView
          {...camera}
          enableTorch={camera.torch}
          ref={camera.cameraRef}
          style={{width, height}}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={({ data }) => {
            showCamera(false);

            Alert.alert("OBS!", `Ville du åbne ${data}?`, [
              {
                isPreferred: false,
                text: "Ja",
                onPress: () => {
                  WebBrowser.openBrowserAsync(data);
                },
              },
              {
                isPreferred: true,
                text: "Nej",
                onPress: () => {
                  showCamera(true);
                },
              },
            ]);
          }}
        >
          <GestureDetector gesture={pinch}>
            <View style={CameraStyles.controls}>
              <View style={CameraStyles.buttonContainer}>
                <CameraFlashTorchButton style={CameraStyles.flashSelector} />
                <CameraPhotoButton />
                <CameraFlashSelector style={CameraStyles.flashSelector} />
              </View>
            </View>
          </GestureDetector>
        </CameraView>
      </GestureHandlerRootView>
    ) : (
      <View style={CameraStyles.container}>
        <CameraDeletePhotoButton/>
        <Image source={{uri: camera.capturedPhoto}} style={{
          width: width,
          height: height,
          resizeMode: 'contain'
        }}/>
      </View>
    )
  );
}


