import { View, SafeAreaView } from "react-native";
import Header from "../header";
import { getDistance, getTotalRuntime } from "../../utils/runUtils";
import Card from "../card";
import Text from "../text";
import MapView, { Marker, MarkerAnimated, Polyline } from "react-native-maps";
import { useEffect } from "react";

export default function OldRuns({ history }) {
  const getCenter = (coords) => {
    let latitudeSum = 0;
    let longitudeSum = 0;

    coords.forEach((point) => {
      latitudeSum += point.latitude;
      longitudeSum += point.longitude;
    });

    return {
      latitude: latitudeSum / coords.length,
      longitude: longitudeSum / coords.length,
    };
  };

  const getDeltas = (coords) => {
    const latitudes = coords.map((point) => point.latitude);
    const longitudes = coords.map((point) => point.longitude);

    const latitudeDelta = Math.max(...latitudes) - Math.min(...latitudes);
    const longitudeDelta = Math.max(...longitudes) - Math.min(...longitudes);

    return {
      latitudeDelta: latitudeDelta + 0.001, // Add a small buffer
      longitudeDelta: longitudeDelta + 0.001,
    };
  };

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
              <Text>gammelt løb ({or.distance} Meter)</Text>
              <Text>
                {or.time.minutes}:{or.time.seconds}
              </Text>
              <MapView
                initialRegion={{
                  ...getCenter(or.coords),
                  ...getDeltas(or.coords),
                }}
                style={{ width: "100%", aspectRatio: 1, borderRadius: 15 }}
              >
                <Polyline coordinates={or.coords} strokeWidth={6}></Polyline>
                <Marker coordinate={or.coords[0]} />
                <Marker coordinate={or.coords[or.coords.length - 1]} />
              </MapView>
            </Card>
          );
        })
      ) : (
        <Text>Ingen løb</Text>
      )}
    </View>
  );
}
