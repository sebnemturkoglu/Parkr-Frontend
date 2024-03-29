import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getNearbyPlaces,
  getRecentPlaces,
  getSearchPlaces,
} from "../actions/places";
import ParkingPlaceCard from "../components/ParkingPlaceCard";
import { darkgrey, lime, white } from "../constants/colors";
import { mapStackName, placeDetailsScreenName } from "../constants/screenNames";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      }).then((locVal) => {
        let latitude = locVal.coords.latitude;
        let longitude = locVal.coords.longitude;
        dispatch(getNearbyPlaces({ latitude, longitude }));
      });
    })();

    dispatch(getRecentPlaces());
  }, []);

  const places = useSelector((state) => state.places);
  const recentPlaces = useSelector((state) => state.recentPlaces);
  const loaded = useSelector((state) => state.loaded);

  const handleSearch = (latitude, longitude) => {
    dispatch(getSearchPlaces({ latitude, longitude }));
    navigation.navigate(mapStackName);
  };

  return loaded.nearbyLoaded && loaded.recentLoaded ? (
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
            handleSearch(
              details.geometry.location.lat,
              details.geometry.location.lng
            );
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
                  numOfRatings={item.numOfRatings}
                  hasAgreement={item.hasAggreement}
                  availability={
                    item.hasAggreement ? item.capacity - item.occupancy : -1
                  }
                  onPress={() => {
                    navigation.navigate({
                      name: placeDetailsScreenName,
                      params: { id: item.placeID },
                      merge: true,
                    });
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.subheader}>Recent Places</Text>
        {recentPlaces !== null && recentPlaces.length !== 0 ? (
          <ScrollView horizontal={true}>
            {recentPlaces.map((item) => {
              return (
                <View style={styles.cardContainer} key={item.id}>
                  <ParkingPlaceCard
                    image={item.image}
                    name={item.name}
                    capacity={item.capacity}
                    occupancy={item.occupancy}
                    rating={item.rating}
                    lowestfare={item.lowestFare}
                    coordinates={item.coordinates}
                    hasAgreement={true}
                    numOfRatings={item.numOfRatings}
                    availability={item.capacity - item.occupancy}
                    onPress={() => {
                      navigation.navigate({
                        name: placeDetailsScreenName,
                        params: { id: item.placeID },
                        merge: true,
                      });
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>No past parking data.</Text>
          </View>
        )}
      </View>
    </View>
  ) : (
    <View style={styles.loadContainer}>
      <ActivityIndicator size="large" color={lime} />
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
  loadContainer: {
    backgroundColor: darkgrey,
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
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
  emptyText: {
    fontSize: 14,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  emptyTextContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "1%",
  },
});
