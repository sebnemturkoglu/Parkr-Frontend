import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FAB, RadioButton, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteVehicle, editVehicle } from "../actions/user";
import {
  darkgrey,
  darkgrey40,
  darkgrey60,
  lime,
  lime60,
  white,
} from "../constants/colors";
import { profileScreenName } from "../constants/screenNames";
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
  {
    title: "HATHCHBACK",
    value: "HATHCHBACK",
    id: 3,
  },
  {
    title: "CROSSOVER",
    value: "CROSSOVER",
    id: 4,
  },
  {
    title: "CONVERTIBLE",
    value: "CONVERTIBLE",
    id: 5,
  },
  {
    title: "SPORTSCAR",
    value: "SPORTSCAR",
    id: 6,
  },
  {
    title: "COUPE",
    value: "COUPE",
    id: 7,
  },
  {
    title: "STATION WAGON",
    value: "STATIONWAGON",
    id: 8,
  },
  {
    title: "PICKUP TRUCK",
    value: "PICKUPTRUCK",
    id: 9,
  },
];

const fuelTypes = [
  {
    title: "DIESEL",
    value: "DIESEL",
    id: 0,
  },
  {
    title: "GASOLINE",
    value: "GASOLINE",
    id: 1,
  },
  {
    title: "HYBRID",
    value: "HYBRID",
    id: 2,
  },
  {
    title: "ELECTRIC",
    value: "ELECTRIC",
    id: 3,
  },
];

const licensePlateRegex = /^([0-9]{1,2})\s*([A-Z]{1,3})\s*([0-9]{2,4})$/;

export default function EditVehicleInformationScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [fuelPickerOpen, setFuelPickerOpen] = useState(false);
  const [type, setType] = React.useState(route.params.item.carType);
  const [fuelType, setFuelType] = React.useState(route.params.item.fuelType);
  const [licensePlate, setLicensePlate] = React.useState("");
  const [isValidLicensePlate, setIsValidLicensePlate] = React.useState(false);
  const [model, setModel] = React.useState(route.params.item.model);

  const originalLicensePlate = route.params.item.plate;

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const togglePicker = () => {
    setPickerOpen(!pickerOpen);
  };

  const toggleFuelPicker = () => {
    setFuelPickerOpen(!fuelPickerOpen);
  };

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
      <ScrollView>
        <Text style={styles.header}>Edit vehicle</Text>
        <TextInput
          style={styles.input}
          placeholder={formatLicensePlate(route.params.item.plate)}
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
          placeholder={route.params.item.model}
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={model}
          onChangeText={(model) => setModel(model)}
        />

        <Text style={styles.subheader}>Edit vehicle type</Text>
        <RadioButton.Group
          onValueChange={(type) => {
            setType(type);
            togglePicker();
          }}
          value={type}
        >
          <View style={styles.radioButton}>
            <RadioButton.Item
              label={type}
              value={type}
              color={lime60}
              labelStyle={styles.radioButtonTextSelected}
            />
          </View>
        </RadioButton.Group>

        {pickerOpen ? (
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            style={{ fontSize: 16 }}
            itemStyle={{ fontSize: 16 }}
          >
            {vehicleTypes.map((item) => {
              return (
                <Picker.Item
                  label={item.title}
                  value={item.value}
                  color={lime60}
                  labelStyle={
                    type == item.value
                      ? styles.radioButtonTextSelected
                      : styles.radioButtonTextUnselected
                  }
                />
              );
            })}
          </Picker>
        ) : null}

        <Text style={styles.subheader}>Choose fuel type</Text>

        <RadioButton.Group
          onValueChange={(fuelType) => {
            setFuelType(fuelType);
            toggleFuelPicker();
          }}
          value={fuelType}
        >
          <View style={styles.radioButton}>
            <RadioButton.Item
              label={fuelType}
              value={fuelType}
              color={lime60}
              labelStyle={styles.radioButtonTextSelected}
            />
          </View>
        </RadioButton.Group>

        {fuelPickerOpen ? (
          <Picker
            selectedValue={fuelType}
            onValueChange={(itemValue, itemIndex) => setFuelType(itemValue)}
            style={{ fontSize: 16 }}
            itemStyle={{ fontSize: 16 }}
          >
            {fuelTypes.map((item) => {
              return (
                <Picker.Item
                  label={item.title}
                  value={item.value}
                  color={lime60}
                  labelStyle={
                    type == item.value
                      ? styles.radioButtonTextSelected
                      : styles.radioButtonTextUnselected
                  }
                />
              );
            })}
          </Picker>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Make Changes",
              "Are you sure you want to change vehicle?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    const plate =
                      !isValidLicensePlate || !licensePlate
                        ? originalLicensePlate
                        : licensePlate;
                    dispatch(
                      editVehicle({
                        id: route.params.item.id,
                        plate: plate.replace(/\s/g, ""),
                        carType: type,
                        model: model,
                        fuelType: fuelType,
                      })
                    );
                    navigation.navigate({
                      name: profileScreenName,
                    });
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Make changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            Alert.alert(
              "Delete Vehicle",
              "Are you sure you want to delete vehicle?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    dispatch(deleteVehicle(route.params.item.id));
                    navigation.navigate({
                      name: profileScreenName,
                      params: { id: route.params.item.id, isDelete: true },
                      merge: true,
                    });
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonTextDelete}>Delete vehicle</Text>
        </TouchableOpacity>
      </ScrollView>
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
  buttonDelete: {
    width: "100%",
    backgroundColor: "#d32f2f",
    alignItems: "center",
    height: 42,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  buttonTextDelete: {
    color: darkgrey,
    fontWeight: "700",
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
