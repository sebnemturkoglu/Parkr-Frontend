import React, { useState } from "react";
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

const vehicleTypes = [
  {
    title: "Type A",
    value: "a",
    id: 0,
  },
  {
    title: "Type B",
    value: "b",
    id: 1,
  },
  {
    title: "Type C",
    value: "c",
    id: 2,
  },
];


export default function AddVehicleScreen({ navigation, route }) {
  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const [type, setType] = React.useState('a');
  const [licensePlate, setLicensePlate] = React.useState("");

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
        value={licensePlate}
        onChangeText={licensePlate => setLicensePlate(licensePlate)}
      />
    
    <Text style={styles.subheader} >Choose vehicle type</Text>
    <RadioButton.Group onValueChange={type => setType(type)} value={type} >
    {
        vehicleTypes.map((item) => {
            return(
                <View style={styles.radioButton} key={item.id} >
                <RadioButton.Item label={item.title} value={item.value} color={lime60} labelStyle={type == item.value ? styles.radioButtonTextSelected : styles.radioButtonTextUnselected} />
                </View>
            )
        })
    }
    </RadioButton.Group>

    <TouchableOpacity style={styles.button} 
        onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate({
              name: profileScreenName,
              params: { licensePlate: licensePlate, vehicleType: type },
              merge: true,
            });
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
});
