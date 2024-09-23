import { Text, View } from "react-native";
import { Dimensions } from "react-native";

export default function Card({ children }) {
  return (
    <View
      style={{
        shadowOpacity: 0.2,
        shadowColor: "#000",
        backgroundColor: "#FFF",
        shadowRadius: 15,
        shadowOffset: {
          height: 15,
        },
        borderRadius: 15,
        padding: 30,
        width: "100%",
        alignSelf: "center",
      }}
    >
      {children}
    </View>
  );
}
