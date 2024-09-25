import { Alert } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";
import { getDistance, getTotalRuntime } from "../utils/runUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useRun() {
  const [isRunning, setIsRunning] = useState(false);
  const [runs, setRuns] = useState([
    {
      time: { minutes: 2, seconds: 2 },
      distance: 2,
      coords: [
        { latitude: 55.380877, longitude: 10.412002 },
        { latitude: 55.380522, longitude: 10.411959 },
        { latitude: 55.380531, longitude: 10.411667 },
        { latitude: 55.380575, longitude: 10.411656 },
        { latitude: 55.380616, longitude: 10.410615 },
        { latitude: 55.380927, longitude: 10.410656 },
        { latitude: 55.380888, longitude: 10.41168 },
      ],
    },
  ]);
  const [locationInterval, setLocationInterval] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentRunHistory, setCurrentRunHistory] = useState([]);
  const [starting, setStarting] = useState(false);

  async function startRun() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Ingen adgang til lokation");
      return;
    }
    setStarting(true);
    setCurrentLocation(await Location.getCurrentPositionAsync({}));
    setStarting(false);
    Alert.alert("Løb startet");
    setCurrentRunHistory([]);
    setIsRunning(true);
    setLocationInterval(
      setInterval(async () => {
        let location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location);
        setCurrentRunHistory((current) => {
          return [...current, location];
        });
      }, 2 * 1000)
    );
  }

  async function stopRun() {
    setIsRunning(false);
    clearInterval(locationInterval);
    const result = {
      time: getTotalRuntime(currentRunHistory),
      distance: getDistance(currentRunHistory),
      coords: currentRunHistory.map((x) => x.coords),
      created: new Date(),
    };
    setRuns([...runs, result]);
  }

  async function saveRuns(runs) {
    await AsyncStorage.setItem("runs", JSON.stringify(runs));
  }

  async function getRuns() {
    return JSON.parse(await AsyncStorage.getItem("runs"));
  }

  return {
    startRun,
    isRunning,
    runs,
    stopRun,
    currentLocation,
    starting,
    currentRunHistory,
  };
}
