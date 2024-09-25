import { TextInput, View } from "react-native";
import Card from "../card";
import Header from "../header";
import Text from "../text";
import { useMemo, useState } from "react";
import Input from "../input";
import RNPickerSelect from "react-native-picker-select";

export default function DrunknessCalc() {
  const [cl, setCl] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [amount, setAmount] = useState(1);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("male"); // 'male' or 'female'

  const drinks = useMemo(() => {
    if (cl && percentage && amount)
      return (((cl * percentage * 0.8) / 120) * amount).toFixed(2);
    return "";
  }, [cl, percentage, amount]);

  const promille = useMemo(() => {
    if (weight && amount) {
      const r = gender === "male" ? 0.68 : 0.55;
      // Total alkohol i gram
      const totalAlcohol = ((cl * percentage * 0.8) / 100) * amount; // omregn til gram
      const calculatedPromille = ((totalAlcohol / (weight * r)) * 10).toFixed(
        2
      );
      return calculatedPromille;
    }
    return "";
  }, [weight, amount, gender, cl, percentage]);

  return (
    <Card>
      <View style={{ gap: 10 }}>
        <Header>Genstandsberegner</Header>
        <Input
          placeholder="Cl"
          keyboardType="numeric"
          onChangeText={(text) =>
            setCl(Number.parseFloat(text.replace(",", ".")))
          }
        />
        <Input
          placeholder="Percentage"
          keyboardType="numeric"
          onChangeText={(text) =>
            setPercentage(Number.parseFloat(text.replace(",", ".")))
          }
        />
        <Input
          placeholder="Antal"
          keyboardType="numeric"
          onChangeText={(text) =>
            setAmount(Number.parseFloat(text.replace(",", ".")))
          }
          defaultValue={1}
        />
        <Input
          placeholder="Vægt (kg)"
          keyboardType="numeric"
          onChangeText={(text) =>
            setWeight(Number.parseFloat(text.replace(",", ".")))
          }
        />
        <View>
          <RNPickerSelect
            placeholder={{ label: "Vælg køn", value: undefined }}
            style={{
              inputIOS: {
                padding: 10,
                shadowColor: "#DDD",
                shadowOffset: { height: 2 },
                shadowRadius: 4,
                shadowOpacity: 0.6,
                borderColor: "#EEE",
                borderWidth: 1,
                backgroundColor: "white",
                borderRadius: Number.MAX_SAFE_INTEGER,
              },
              placeholder: {
                color: "black",
              },
            }}
            onValueChange={(value) => {
              setGender(value);
            }}
            items={[
              {
                label: "Det rigtige køn",
                value: "male",
              },
              {
                label: "Det forkerte køn",
                value: "female",
              },
            ]}
          ></RNPickerSelect>
        </View>
        <Text>Antal genstande: {drinks}</Text>
        <Text>Promille: {promille}</Text>
      </View>
    </Card>
  );
}
