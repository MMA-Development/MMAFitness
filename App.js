import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import StepCard from "./src/components/stepcard";
import useRun from "./src/services/runService";
import Card from "./src/components/card";
import OldRuns from "./src/components/oldRuns";
import { SafeAreaView } from "react-native";
import Text from "./src/components/text";
import { Dimensions } from "react-native";
import Button from "./src/components/button";
import Header from "./src/components/header";
import { getDistance } from "./src/utils/runUtils";
import SpiritLevel from "./src/components/spiritLevel";
import Compass from "./src/components/compass";
import Speedometer from "./src/components/speedometer";
import Counter from "./src/components/counter";
import DrunknessCalc from "./src/components/drunknesscalc";
import { useState } from "react";
import Enjoy from "./src/components/enjoy";
import {CameraBase} from "./src/components/camera2";

export default function App() {
  const {
    startRun,
    isRunning,
    stopRun,
    currentLocation,
    runs,
    starting,
    currentRunHistory,
  } = useRun();

  const [showCamera, setShowCamera] = useState(false);

  return (
    <>
      {starting ? (
        <View
          style={{
            position: "absolute",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 999,
          }}
        >
          <ActivityIndicator></ActivityIndicator>
        </View>
      ) : null}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            padding: showCamera ? 0 : 15,
            paddingTop: 15,
            gap: 15
          }}>
            <Button onPress={() => setShowCamera(!showCamera)}>
              {showCamera ? "Skjul" : "Vis"} kamera
            </Button>
            {showCamera ? (
              <CameraBase showCamera={setShowCamera}/>
            ) : (
              <>
                <Enjoy></Enjoy>
                <Counter
                  title="J-dag!!!"
                  text={"(Husk kondom)"}
                  to={new Date("2024-11-01")}
                ></Counter>
                <Counter
                  title="Slå op med lillemor"
                  text={"Lillemors termin"}
                  to={new Date("2024-11-01")}
                ></Counter>
                <Counter
                  title="Druk hos Ronnie"
                  text={"Husk juleøl"}
                  to={new Date("2024-12-24")}
                ></Counter>
                <DrunknessCalc></DrunknessCalc>
                <SpiritLevel></SpiritLevel>
                <Compass></Compass>
                <StepCard></StepCard>
                {isRunning && (
                  <Card>
                    <Header>Nuværende løb:</Header>
                    <Text>{currentLocation.coords.speed * 3.6} km/h</Text>
                    <Text>{getDistance(currentRunHistory)}</Text>
                  </Card>
                )}
                {isRunning ? (
                  <Button onPress={stopRun}>Stop løb</Button>
                ) : (
                  <Button onPress={startRun}>Start løb</Button>
                )}
                <OldRuns history={runs}></OldRuns>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
