import { Alert } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";
import { getDistance, getTotalRuntime } from "../utils/runUtils";

export default function useRun() {
  const [isRunning, setIsRunning] = useState(false);
  const [runs, setRuns] = useState([]);
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
