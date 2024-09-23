import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Accelerometer } from "expo-sensors";
import Card from "../card";
import Header from "../header";

export default function SpiritLevel() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  // Animated.Value til at holde den interpolerede vinkel
  const animatedTilt = useRef(new Animated.Value(0)).current;
  const currentTilt = useRef(0); // Holder styr på den aktuelle vinkel

  // Funktion til at abonnere på accelerometeret
  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
    Accelerometer.setUpdateInterval(100); // Opdater hver 100 ms
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  // Udtræk x og y fra accelerometer-data
  const { x, y } = data;

  // Beregn vinklen baseret på x og y aksen
  const angleX = (Math.atan2(x, y) * 180) / Math.PI; // Konverter til grader

  // Funktion til at finde den korteste rotationsvej
  const calculateShortestAngle = (current, next) => {
    let delta = next - current;
    if (delta > 180) delta -= 360; // Juster, så vi ikke tager 360 graders vej
    if (delta < -180) delta += 360;
    return current + delta;
  };

  // Interpoler værdien af vinkelX med en jævn animation
  useEffect(() => {
    const newTilt = calculateShortestAngle(currentTilt.current, angleX);
    currentTilt.current = newTilt;

    Animated.timing(animatedTilt, {
      toValue: newTilt, // Animer til justeret vinkel
      duration: 100, // Tidsinterval for animation
      useNativeDriver: true, // Brug native driver for bedre performance
    }).start();
  }, [angleX]);

  // Interpoler rotationsvinklen
  const rotate = animatedTilt.interpolate({
    inputRange: [-180, 180],
    outputRange: ["-180deg", "180deg"],
  });

  return (
    <Card>
      <Header>Vaterpas</Header>
      <View style={styles.container}>
        <Text style={styles.text}>X: {x.toFixed(2)}</Text>
        <Text style={styles.text}>Y: {y.toFixed(2)}</Text>
        <Animated.View
          style={[
            styles.level,
            { transform: [{ rotate }] }, // Animeret rotation
          ]}
        />
        <Text style={styles.text}>Tilt: {angleX.toFixed(2)}°</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  level: {
    width: 200,
    height: 10,
    backgroundColor: "green",
  },
});
