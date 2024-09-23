import { View, SafeAreaView } from "react-native";
import Header from "../header";
import { getDistance, getTotalRuntime } from "../../utils/runUtils";
import Card from "../card";
import Text from "../text";

export default function OldRuns({ history }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      <Header>Gamle løb</Header>
      {history?.length ? (
        history.map((or, index) => {
          return (
            <Card key={index}>
              <Text>
                gammelt løb {or.time.minutes}m {or.time.seconds}s {or.distance}{" "}
                Meter
              </Text>
            </Card>
          );
        })
      ) : (
        <Text>Ingen løb</Text>
      )}
    </View>
  );
}
