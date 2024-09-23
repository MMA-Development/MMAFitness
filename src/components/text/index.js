import { Text as T } from "react-native";

export default function Text({ children }) {
  return <T style={{ fontSize: 16, fontWeight: 400 }}>{children}</T>;
}
