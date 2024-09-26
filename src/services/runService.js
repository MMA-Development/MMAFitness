import { Alert } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { getDistance, getTotalRuntime } from "../utils/runUtils";

export default function useRun() {
  const [isRunning, setIsRunning] = useState(false);
  const [runs, setRuns] = useState();
  const [locationInterval, setLocationInterval] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentRunHistory, setCurrentRunHistory] = useState([]);
  const [starting, setStarting] = useState(false);

  async function saveRun(run) {
    const result = await fetch("http://192.168.1.136:3000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(run),
    });

    return "ok";
  }

  async function getRuns() {
    const response = await fetch("http://192.168.1.136:3000");
    if (!response.ok) return;

    const json = await response.json();
    return json;
  }

  return {
    getRuns,
    saveRun,
  };
}
