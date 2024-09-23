import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import Card from "../card";
import Header from "../header";
import Text from "../text";

export default function StepCard() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
        setPastStepCount(pastStepCountResult.steps + result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove && subscription.remove();
  }, []);

  return isPedometerAvailable ? (
    <>
      <Card>
        <Header>Skridt i dag:</Header>
        <Text>{pastStepCount}</Text>
      </Card>
    </>
  ) : (
    <Text>Ingen tilladelser</Text>
  );
}
