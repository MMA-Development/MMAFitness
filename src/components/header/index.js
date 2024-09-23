import { Text } from "react-native";

export default function Header({ children }) {
  return (
    <Text
      style={{
        fontWeight: 700,
        fontSize: 24,
      }}
    >
      {children}
    </Text>
  );
}
