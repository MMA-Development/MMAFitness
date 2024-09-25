import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

const Speedometer = ({ size = 300, maxSpeed = 180, speed = 60 }) => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: speed,
      duration: 1000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [speed]);

  const radius = size / 2;
  const strokeWidth = 20;
  const dialRadius = radius - strokeWidth;
  const center = size / 2;
  const tickCount = 9; // Number of ticks (e.g., 0 to 180 in steps of 20)

  const renderTicks = () => {
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
      const angle = (-180 + (i * 180) / tickCount) * (Math.PI / 180);
      const x1 = center + dialRadius * Math.cos(angle);
      const y1 = center + dialRadius * Math.sin(angle);
      const x2 = center + (dialRadius - 20) * Math.cos(angle);
      const y2 = center + (dialRadius - 20) * Math.sin(angle);
      const textX = center + (dialRadius - 40) * Math.cos(angle);
      const textY = center + (dialRadius - 40) * Math.sin(angle);
      const tickValue = Math.round((i * maxSpeed) / tickCount);

      ticks.push(
        <>
          <Line
            key={`tick-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="black"
            strokeWidth="2"
          />
          <SvgText
            key={`text-${i}`}
            x={textX}
            y={textY}
            fill="black"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {tickValue}
          </SvgText>
        </>
      );
    }
    return ticks;
  };

  const rotation = animatedValue.interpolate({
    inputRange: [0, maxSpeed],
    outputRange: ["-90deg", "90deg"],
  });

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Background Circle */}
        <Circle
          cx={center}
          cy={center}
          r={dialRadius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Ticks */}
        {renderTicks()}

        {/* Animated Needle */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ rotate: rotation }],
          }}
        >
          <View
            style={{
              width: 4,
              height: dialRadius - 20,
              backgroundColor: "red",
            }}
          />
        </Animated.View>
      </Svg>

      {/* Speed Display */}
      <Text style={styles.speedText}>{Math.round(speed)} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  speedText: {
    position: "absolute",
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
  },
});

export default Speedometer;
