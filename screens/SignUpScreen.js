import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { darkgrey, darkgrey40, lime60, white, lime } from "../constants/colors";
import logo from "../assets/logo.png";
import { TextInput } from "react-native-paper";

const SignUpPage = (props) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logo} />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.header}>Sign up</Text>
      <Text style={styles.text}>
        Already have an account?{" "}
        <Text
          onPress={() => props.setIsSignUp(false)}
          style={styles.textColored}
        >
          Login
        </Text>{" "}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-enter Password"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.textCentered}>
        By clicking Register, you agree to our{" "}
        <Text style={styles.textColored}>
          Terms and Data Policy.
        </Text>{" "}
      </Text>
    </View>
  </View>
);

const LoginPage = (props) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} source={logo} />
    </View>
    <View style={styles.contentContainer}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.text}>
        Don't have an account?{" "}
        <Text
          onPress={() => props.setIsSignUp(true)}
          style={styles.textColored}
        >
          Sign up
        </Text>{" "}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
      />
      <TouchableOpacity style={styles.button} onPress={() => props.setIsLoggedIn(true)} >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function SignUpScreen(props) {
  const [isSignUp, setIsSignUp] = useState(true);

  return isSignUp ? (
    <SignUpPage setIsSignUp={setIsSignUp} />
  ) : (
    <LoginPage setIsSignUp={setIsSignUp} setIsLoggedIn={props.setIsLoggedIn} />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkgrey,
    width: "100%",
    height: "100%",
    paddingTop: 70,
    paddingHorizontal: 25,
  },
  logoContainer: {
    // width: "100%",
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
    fontSize: 36,
    fontWeight: "600",
    color: white,
    marginVertical: 20,
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
});
