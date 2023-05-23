import * as React from "react";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Map from "../components/Map";
import ParkCard from "../components/ParkCard";
import { placeDetailsScreenName } from "../constants/screenNames";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const MapViewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();

    if (location) {
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;
      dispatch(getNearbyPlaces({ latitude, longitude }));
    }
  }, []);

  const places = useSelector((state) => state.places);

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onCardPress = () => {
    console.log("id:", places[0].placeID);
    navigation.navigate({
      name: placeDetailsScreenName,
      params: { id: places[0].placeID },
      merge: true,
    });
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.container}>
          <Map
            multipleMarkers={true}
            places={places}
            setSelectedIndex={setSelectedIndex}
            selectedIndex={selectedIndex}
          />
          <View style={styles.cardContainer}>
            <ParkCard
              image={places[selectedIndex].image}
              name={places[selectedIndex].name}
              capacity={places[selectedIndex].capacity}
              occupancy={places[selectedIndex].occupancy}
              rating={places[selectedIndex].rating}
              lowestfare={places[selectedIndex].lowestFare}
              distance={places[selectedIndex].distance}
              onPress={onCardPress}
            />
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
    bottom: 60,
  },
});

export default MapViewScreen;
