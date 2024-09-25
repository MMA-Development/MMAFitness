import { CameraProvider } from "./CameraContext";
import { Camera } from "./Camera";

interface CameraBaseProps {
  showCamera: (show: boolean) => void;
}

export function CameraBase({ showCamera }: CameraBaseProps) {
  return (
    <CameraProvider>
      <Camera showCamera={showCamera} />
    </CameraProvider>
  );
}
