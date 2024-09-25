import { useEffect, useState, useRef } from "react";
import { TextInput, View, Text, Animated } from "react-native";

export default function Input({ onChangeText, placeholder, ...props }) {
  function onChange(value) {
    onChangeText(value);
  }

  return (
    <View>
      <TextInput
        style={{
          padding: 10,
          shadowColor: "#DDD",
          shadowOffset: { height: 2 },
          shadowRadius: 4,
          shadowOpacity: 0.6,
          borderColor: "#EEE",
          borderWidth: 1,
          backgroundColor: "white",
          borderRadius: Number.MAX_SAFE_INTEGER,
        }}
        placeholder={placeholder}
        onChangeText={onChange}
        {...props}
      ></TextInput>
    </View>
  );
}
