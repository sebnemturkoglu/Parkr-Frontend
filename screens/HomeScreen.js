import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyPlaces, getSearchPlaces } from "../actions/places";
import ParkingPlaceCard from "../components/ParkingPlaceCard";
import SearchBar from "../components/SearchBar";
import { darkgrey, lime } from "../constants/colors";
import { parkingdata as data } from "../constants/dummyData";
import { mapStackName, mapScreenName } from "../constants/screenNames";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({}).then((locVal) => {
        let latitude = locVal.coords.latitude;
        let longitude = locVal.coords.longitude;
        console.log("loca values", { latitude, longitude });
        dispatch(getNearbyPlaces({ latitude, longitude }));
      });
      setLocation(loc);
    })();
    
  }, [location]);

  const places = useSelector((state) => state.places);

  const handleSearch = (latitude, longitude) => {
    dispatch(getSearchPlaces({ latitude, longitude }));
    navigation.navigate(mapStackName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Text style={styles.header}>Find your parking spot</Text>
        {/* <SearchBar /> */}
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(
              "Searched place:",
              details.geometry.location.lat,
              details.geometry.location.lng
            );
            handleSearch(details.geometry.location.lat, details.geometry.location.lng);
            
          }}
          query={{
            key: "AIzaSyAgu7UnTtb-9hS2Aspkv6lp_n4Xu6Qm7ks",
            language: "en",
            components: "country:tr",
          }}
          styles={{
            listView: {
              backgroundColor: "white",
              position: "absolute",
              marginTop: 50,
            },
          }}
        />
      </View>
      <View>
        <Text style={styles.subheader}>Nearby Places</Text>
        <ScrollView horizontal={true}>
          {places.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.placeID}>
                <ParkingPlaceCard
                  image={item.image}
                  name={item.name}
                  capacity={item.capacity}
                  occupancy={item.occupancy}
                  rating={item.rating}
                  lowestfare={item.lowestFare}
                  distance={item.distance}
                  coordinates={item.coordinates}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.subheader}>Recent Places</Text>
        <ScrollView horizontal={true}>
          {data.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.id}>
                <ParkingPlaceCard
                  image={item.image}
                  name={item.name}
                  capacity={item.capacity}
                  occupancy={item.occupancy}
                  rating={item.rating}
                  lowestfare={item.fares[0].fare}
                  distance={item.distance}
                  coordinates={item.coordinates}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    backgroundColor: darkgrey,
    height: "100%",
    width: "100%",
    flex: 1,
  },
  searchbar: {
    marginTop: 30,
    marginBottom: 45,
    marginHorizontal: 20,
    flex: 0,
    // position: "absolute",
    // width: "100%",
    zIndex: 1,
  },
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "26",
    letterSpacing: "0.3%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  subheader: {
    color: lime,
    fontWeight: "600",
    fontSize: "16",
    letterSpacing: "0.3%",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  cardContainer: {
    width: 260,
    marginHorizontal: 10,
  },
});
