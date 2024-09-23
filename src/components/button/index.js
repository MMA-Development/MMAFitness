import { TouchableOpacity, Text } from "react-native";
import * as Haptics from "expo-haptics";

export default function Button({ onPress, children }) {
  return (
    <TouchableOpacity
      style={{
        borderRadius: Number.MAX_SAFE_INTEGER,
        backgroundColor: "#00adef",
        padding: 15,
      }}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        onPress?.();
      }}
    >
      <Text style={{ color: "white", alignSelf: "center" }}>{children}</Text>
    </TouchableOpacity>
  );
}
