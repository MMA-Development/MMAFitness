import { Alert, View } from "react-native";
import Button from "../button";
import Card from "../card";
import Header from "../header";
import * as WebBrowser from "expo-web-browser";

export default function Enjoy() {
  return (
    <Card>
      <View style={{ gap: 10 }}>
        <Header>Lang arbejdsdag?</Header>
        <Button
          onPress={() => {
            WebBrowser.openBrowserAsync("https://pornhub.com/random").then(
              () => {
                Alert.alert("Håber du nød besøget ;)", "<3 ");
              }
            );
          }}
        >
          Så klik her :D
        </Button>
      </View>
    </Card>
  );
}
