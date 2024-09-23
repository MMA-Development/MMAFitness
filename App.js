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
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 999,
          }}
        >
          <ActivityIndicator></ActivityIndicator>
        </View>
      ) : null}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    padding: 15,
    gap: 15,
  },
});
