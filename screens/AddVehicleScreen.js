import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  darkgrey,
  darkgrey40,
  darkgrey60,
  lime,
  lime60,
  white,
} from "../constants/colors";
import { List, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FAB, TextInput, RadioButton } from "react-native-paper";
import { profileScreenName } from "../constants/screenNames";
import { useDispatch } from "react-redux";
import { addVehicle } from "../actions/user";

const licensePlateRegex = /^([0-9]{1,2})\s*([A-Z]{1,3})\s*([0-9]{2,4})$/;

const vehicleTypes = [
  {
    title: "SUV",
    value: "SUV",
    id: 0,
  },
  {
    title: "SEDAN",
    value: "SEDAN",
    id: 1,
  },
  {
    title: "MINIVAN",
    value: "MINIVAN",
    id: 2,
  },
];

export default function AddVehicleScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const [type, setType] = React.useState("SEDAN");
  const [licensePlate, setLicensePlate] = React.useState("");
  const [model, setModel] = React.useState("");
  const [isValidLicensePlate, setIsValidLicensePlate] = useState(false);

  const formatLicensePlate = (plateNumber) => {
    const matches = plateNumber.match(licensePlateRegex);

    if (matches) {
      const [_, firstNumber, characters, secondNumber] = matches;
      return `${firstNumber} ${characters} ${secondNumber}`;
    }

    return plateNumber;
  };

  return (
    <View style={styles.container}>
      <FAB
        mode="flat"
        size="small"
        color="#fff"
        icon="keyboard-backspace"
        style={styles.backButton}
        onPress={onBackButtonClick}
      />
      <Text style={styles.header}>Add vehicle</Text>
      <TextInput
        style={styles.input}
        placeholder="License Plate"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
        value={formatLicensePlate(licensePlate)}
        onChangeText={(licensePlate) => {
          licensePlate = licensePlate.toUpperCase();
          setLicensePlate(licensePlate);
          if (licensePlateRegex.test(licensePlate)) {
            setIsValidLicensePlate(true);
          } else {
            setIsValidLicensePlate(false);
          }
        }}
      />
      {!isValidLicensePlate && licensePlate ? (
        <Text style={styles.alert}>Please enter a valid license plate.</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Vehicle Model"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
        value={model}
        onChangeText={(model) => setModel(model)}
      />

      <Text style={styles.subheader}>Choose vehicle type</Text>
      <RadioButton.Group onValueChange={(type) => setType(type)} value={type}>
        {vehicleTypes.map((item) => {
          return (
            <View style={styles.radioButton} key={item.id}>
              <RadioButton.Item
                label={item.title}
                value={item.value}
                color={lime60}
                labelStyle={
                  type == item.value
                    ? styles.radioButtonTextSelected
                    : styles.radioButtonTextUnselected
                }
              />
            </View>
          );
        })}
      </RadioButton.Group>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (licensePlateRegex.test(licensePlate)) {
            dispatch(
              addVehicle({
                plate: licensePlate.replace(/\s/g, ""),
                carType: type,
                model: model,
                fuelType: "GASOLINE",
              })
            );
            navigation.navigate({
              name: profileScreenName,
            });
          }
        }}
      >
        <Text style={styles.buttonText}>Add vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    backgroundColor: darkgrey,
    height: "100%",
    width: "100%",
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "26",
    letterSpacing: "0.3%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  listItem: {
    color: white,
  },
  subheader: {
    color: lime,
    fontWeight: "600",
    fontSize: "16",
    letterSpacing: "0.3%",
    marginTop: 30,
  },
  button: {
    width: "100%",
    backgroundColor: darkgrey,
    borderColor: lime60,
    alignItems: "center",
    height: 42,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 8,
    marginRight: "auto",
    borderWidth: 1,
  },
  buttonText: {
    color: lime,
    fontWeight: "600",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    marginLeft: 10,
    marginVertical: 60,
    left: 0,
    top: 0,
    borderRadius: 32,
    backgroundColor: "#1F1F1F",
  },
  input: {
    backgroundColor: "transparent",
    borderColor: darkgrey40,
    marginVertical: 8,
  },
  radioButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 4,
    width: "100%",
    borderColor: darkgrey40,
    marginVertical: 8,
    color: white,
  },
  radioButtonTextSelected: {
    color: white,
  },
  radioButtonTextUnselected: {
    color: darkgrey60,
  },
  alert: {
    color: "#e42218",
    fontSize: "14",
    letterSpacing: "0.3%",
  },
});
