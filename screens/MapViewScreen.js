import * as React from "react";
import Map from "../components/Map";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";
import ParkCard from "../components/ParkCard";
import { parkingdata as data } from "../constants/dummyData";
import { placeDetailsScreenName } from "../constants/screenNames";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MapViewScreen = ({ navigation }) => {
  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const onCardPress = () => {
    navigation.navigate(placeDetailsScreenName, {data: data[0]});
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.container}>
          <Map multipleMarkers={true} places={data}/>
          <View style={styles.cardContainer}>
            <ParkCard
              image={data[0].image}
              name={data[0].name}
              capacity={data[0].capacity}
              occupancy={data[0].occupancy}
              rating={data[0].rating}
              lowestfare={data[0].fares[0].fare}
              distance={data[0].distance}
              onPress={onCardPress}
            />
          </View>
          <View style={styles.searchbar}>
            <SearchBar />
          </View>
          <BackButton onClick={onBackButtonClick} />
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#1F1F1F",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  searchbar: {
    marginVertical: 20,
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
    position: "absolute",
    padding: 10,
    height: "15%",
    bottom: 140,
  },
});

export default MapViewScreen;
