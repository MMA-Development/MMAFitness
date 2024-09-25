import * as Location from "expo-location";
import { Animated, Text, Vibration, View } from "react-native";
import Card from "../card";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import Header from "../header";

export default function Compass() {
  const [pStatus, setPStatus] = useState("");
  const [deg, setDeg] = useState("0");

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      setPStatus(status);
    });
  }, []);

  function callback(props) {
    if (props.magHeading) {
      const val = Math.floor(props.magHeading);
      if (val % 30 === 0) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      if (-val != -deg) setDeg(-val);
    }
  }
  useEffect(() => {
    const test = Location.watchHeadingAsync(callback);
  }, []);

  if (pStatus !== "granted")
    return (
      <Card>
        <Text>Du skal give tilladelse manner</Text>
      </Card>
    );
  return (
    <Card>
      <Header>Kompas</Header>
      <View
        style={{
          alignSelf: "center",
          aspectRatio: 1,
          width: 300,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <View
          style={{
            width: 300,
            height: 300,
            alignSelf: "flex-start",
            position: "absolute",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <View
            style={{
              width: 2,
              zIndex: 999,
              height: 150,
              backgroundColor: "black",
              borderRadius: 120,
            }}
          ></View>
        </View>
        <Animated.Image
          style={{
            transform: [{ rotate: deg + "deg" }],
            width: 300,
            resizeMode: "contain",
          }}
          source={require("../../../assets/compass-needle.png")}
        ></Animated.Image>
      </View>
    </Card>
  );
}
