import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
} from "expo-camera";
import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BackgroundContext from "../../hooks/backgroundImageContext";

export interface CameraContextProps {
  facing?: CameraType;
  flash?: FlashMode;
  torch?: boolean;
  zoom?: number;
  mirror?: boolean;
  active?: boolean;
  toggleCameraFacing: () => void;
  toggleFlash: () => void;
  toggleTorch: () => void;
  onChangeZoom: (val: number) => void;
  takePhoto: () => Promise<void>;
  setCapturedPhoto: (img: string | null) => void;
  capturedPhoto: string | null;
  cameraRef: MutableRefObject<CameraView | null>;
}

const defaultValues: CameraContextProps = {
  facing: "back",
  flash: "off",
  torch: false,
  zoom: 0,
  mirror: true,
  active: false,
  toggleCameraFacing: () => {},
  toggleFlash: () => {},
  toggleTorch: () => {},
  onChangeZoom: () => {},
  takePhoto: async () => {},
  setCapturedPhoto: () => {},
  capturedPhoto: null,
  cameraRef: { current: null } as MutableRefObject<CameraView | null>,
};

const CameraContext = createContext<CameraContextProps>(defaultValues);

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
}

export function CameraProvider({ children }: PropsWithChildren) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [torch, setTorch] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false); // Manage camera mount state
  const [zoom, setZoom] = useState<number>(0.005);
  const [mirror, setMirror] = useState<boolean>(true);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null); // Store captured image

  const cameraRef = useRef<CameraView | null>(null);
  const { changeBackground } = useContext(BackgroundContext);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }

    setIsCameraActive(true);

    return () => {
      setIsCameraActive(false);
    };
  }, [permission, requestPermission]);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash((current) => (current === "off" ? "on" : "off"));
  }

  function onChangeZoom(val: number) {
    setZoom(val);
  }

  function toggleTorch() {
    setTorch((prev) => !prev);
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo) return;
      changeBackground(photo.uri);
      setCapturedPhoto(photo.uri);
    }
  }

  return (
    <CameraContext.Provider
      value={{
        facing,
        flash,
        torch,
        mirror,
        zoom,
        active: isCameraActive,
        toggleCameraFacing,
        toggleFlash,
        toggleTorch,
        onChangeZoom,
        takePhoto,
        setCapturedPhoto,
        capturedPhoto,
        cameraRef,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}
