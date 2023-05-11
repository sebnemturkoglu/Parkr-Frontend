import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { darkgrey, darkgrey40, lime60, white, lime } from "../constants/colors";
import logo from "../assets/logo.png";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AuthContext } from "../AuthContext";


const SignUpPage = (props) => {

  dispatch = useDispatch();
  const { register } = useContext(AuthContext);

  const[name, setName] = useState('');
  const[mail, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[phoneNumber, setPhoneNumber] = useState('');


const handleSubmit = (e) => {
  register(mail, password, phoneNumber, name);
  // dispatch(signUp({...initialBS, name, mail: mail, password, phone: phoneNumber}, props.setIsLoggedIn));
  // props.setIsLoggedIn(true); // bu her zaman olmayabilir
};

  return (
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
          name='name'
          style={styles.input}
          placeholder="Your Name"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={name}
          onChangeText={name => setName(name)}
        />
        <TextInput
          name='email'
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={mail}
          onChangeText={mail => setEmail(mail)}
        />
        <TextInput
          name='password'
          style={styles.input}
          placeholder="Password"
          keyboardType="email-address"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={password}
          onChangeText={password => setPassword(password)}
        />
        <TextInput
          name='phonenumber'
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          mode="outlined"
          activeOutlineColor={lime60}
          textColor={white}
          value={phoneNumber}
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        />
        <TouchableOpacity style={styles.button}
        onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.textCentered}>
          By clicking Register, you agree to our{" "}
          <Text style={styles.textColored}>Terms and Data Policy.</Text>{" "}
        </Text>
      </View>
    </View>
  );
};

const LoginPage = (props) => {
  
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const { login } = useContext(AuthContext);


const handleSubmit = (e) => {
  login(email, password);

};
  
  return (
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
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="email-address"
        mode="outlined"
        activeOutlineColor={lime60}
        textColor={white}
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Text
            style={styles.textColored}
          >
            Forgot your password?
          </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  </View>
)};



export default function SignUpScreen() {
  const [isSignUp, setIsSignUp] = useState(true);

  return isSignUp ? (
    <SignUpPage setIsSignUp={setIsSignUp}  />
  ) : (
    <LoginPage setIsSignUp={setIsSignUp} />
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
