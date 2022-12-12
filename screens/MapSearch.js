import * as React from 'react';
import Map from '../components/Map';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";
import SearchBar from '../components/SearchBar';
import BackButton from '../components/BackButton';
import ParkCard from '../components/ParkCard';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MapSearch = () => {

  return (
    <DismissKeyboard>
    <KeyboardAvoidingView style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    enabled>
    <View style={styles.container}>
      <Map />
      <View style={styles.searchbar}>
        <SearchBar />
      </View>
      <BackButton />
      {/* <View style = {styles.cardContainer}>
      <ParkCard />
      </View> */}
    </View>
    </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  searchbar: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardContainer: {
    padding: 10,
    height: '15%'
  }
});

export default MapSearch;