import { useMemo, useState, useEffect } from "react";
import Card from "../card";
import Header from "../header";
import Text from "../text";

export default function Counter({
  from = new Date(),
  to,
  text,
  title = "Nedtælling",
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Create a timer that updates currentTime every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const timeLeft = useMemo(() => {
    const now = new Date();

    // Calculate the difference in milliseconds
    const diff = to - now;

    // Check if the target date is in the future
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Calculate time components
    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Return an object with the time breakdown
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }, [currentTime]);

  return (
    <Card>
      <Header>{title}</Header>
      <Text>{text}</Text>
      <Text>
        {Math.round(timeLeft.days)} dage, {timeLeft.hours} timer,{" "}
        {timeLeft.minutes} Minutter, {timeLeft.seconds} sekunder
      </Text>
    </Card>
  );
}
