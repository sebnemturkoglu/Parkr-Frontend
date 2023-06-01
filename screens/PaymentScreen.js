import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { darkgrey, white, lime, lime60, darkgrey40 } from "../constants/colors";
import { TextInput } from "react-native-paper";
import { FAB } from "react-native-paper";
import { makePayment } from "../actions/user";
import { useSelector, useDispatch } from "react-redux";

const phoneNumberRegex = /\b\d{4}(?:[ -]?\d{4}){3}\b/;

export default function PaymentScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleInputChange = (text) => {
    const input = text.replace(/\D/g, ""); // Remove non-digit characters
    const formattedInput = formatCreditCardNumber(input);
    setCreditCardNumber(formattedInput);
  };

  const formatCreditCardNumber = (input) => {
    const regex = /(\d{1,4})/g;
    const formattedInput = input.replace(regex, "$1 ").trim();
    const truncatedInput = formattedInput.slice(0, 19);
    return truncatedInput;
  };

  const handleSubmit = (e) => {
    dispatch(makePayment({ carID: route.params?.carID }));
  };

  const handleExpirationInputChange = (text) => {
    const input = text.replace(/\D/g, ""); // Remove non-digit characters
    const formattedInput = formatExpirationDate(input);
    const truncatedInput = formattedInput.slice(0, 5); // Restrict to "mm/yy" format
    setExpirationDate(truncatedInput);
  };

  const formatExpirationDate = (input) => {
    const regex = /(\d{1,2})(\d{0,2})/;
    const formattedInput = input.replace(regex, (match, p1, p2) => {
      let formattedDate = p1;
      if (p2) {
        formattedDate += `/${p2}`;
      }
      return formattedDate;
    });
    return formattedInput;
  };

  console.log(creditCardNumber, name, expirationDate, cvv);

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

      <View style={styles.contentContainer}>
        <Text style={styles.header}>Payment Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter credit card number"
          keyboardType="phone-pad"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={creditCardNumber}
          onChangeText={handleInputChange}
        />
        {creditCardNumber && creditCardNumber.length < 19 ? (
          <Text style={styles.alert}>
            Please enter a valid credir card number.
          </Text>
        ) : null}

        <TextInput
          name="name"
          style={styles.input}
          placeholder="Credit Card Owner's Name"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          name="expiration"
          style={styles.input}
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={expirationDate}
          onChangeText={handleExpirationInputChange}
          maxLength={5} // Allow 5 characters (mm/yy)
          keyboardType="numeric"
          placeholder="Enter expiration date (mm/yy)"
        />
        <TextInput
          name="cvv"
          style={styles.input}
          placeholder="CVV"
          keyboardType="number-pad"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={cvv}
          onChangeText={(cvv) => setCvv(cvv)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkgrey,
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
  },
  contentContainer: {
    height: "80%",
    justifyContent: "center",
  },
  logo: {
    width: "20%",
    height: 30,
    resizeMode: "contain",
    margin: 0,
  },
  header: {
    fontSize: 24,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginTop: "30%",
    marginBottom: 10,
    // textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: darkgrey40,
  },
  textColored: {
    color: lime60,
  },
  textCentered: {
    fontSize: 16,
    fontWeight: "500",
    color: darkgrey40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "transparent",
    borderColor: darkgrey40,
    marginVertical: 8,
  },
  button: {
    width: "100%",
    backgroundColor: lime,
    alignItems: "center",
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 48,
    marginBottom: 8,
  },
  buttonText: {
    color: darkgrey,
    fontWeight: "600",
    fontSize: 16,
  },
  alert: {
    color: alert,
    fontSize: "14",
    letterSpacing: "0.3%",
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
});
