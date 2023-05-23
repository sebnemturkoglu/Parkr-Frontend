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
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  useEffect(() => {

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      
    })();

    if(location){
      let latitude = location.coords.latitude;
      let longitude = location.coords.longitude;
      dispatch(getNearbyPlaces({ latitude, longitude}))
    }

  }, []);

  const places = useSelector((state) => state.places);

  const onBackButtonClick = () => {
    navigation.goBack();
  };

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
          <Map multipleMarkers={true} places={places}/>
          <View style={styles.cardContainer}>
            <ParkCard
              image={places[0].image}
              name={places[0].name}
              capacity={places[0].capacity}
              occupancy={places[0].occupancy}
              rating={places[0].rating}
              lowestfare={places[0].lowestFare}
              distance={places[0].distance}
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
