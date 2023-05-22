import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ParkCard from "../components/ParkCard";
import { darkgrey, lime, white } from "../constants/colors";
import {
  mapViewScreenName,
  placeDetailsScreenName,
} from "../constants/screenNames";
import { getSearchPlaces } from "../actions/places";

export default function MapScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  const handleSearch = (latitude, longitude) => {
    dispatch(getSearchPlaces({ latitude, longitude }));
  };

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
  const searchData = useSelector((state) => state.searchPlaces);


  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
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
              flex: 1,
            },
          }}
        />


        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.buttonFilter}>
            <Text style={styles.buttonTextFilter}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonFilter}>
            <Text style={styles.buttonTextFilter}>Sort</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.header}>Nearest Parking Places</Text>
        <ScrollView style={styles.scrollView}>
          {searchData.isSearch && searchData !== null
          ? searchData.data.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.placeID}>
                <ParkCard
                  image={item.image}
                  name={item.name}
                  capacity={item.capacity}
                  occupancy={item.occupancy}
                  rating={item.rating}
                  lowestfare={item.lowestfare}
                  distance={item.distance}
                  hasAgreement={item.hasAggreement}
                  onPress={() =>
                    navigation.navigate(placeDetailsScreenName, { placeID: item.placeID })
                  }
                />
              </View>
            );
          })
        : places.map((item) => {
          return (
            <View style={styles.cardContainer} key={item.placeID}>
              <ParkCard
                image={item.image}
                name={item.name}
                capacity={item.capacity}
                occupancy={item.occupancy}
                rating={item.rating}
                lowestfare={item.lowestfare}
                distance={item.distance}
                onPress={() =>
                  navigation.navigate(placeDetailsScreenName, { placeID: item.placeID })
                }
              />
            </View>
          );
        })}
        </ScrollView>
      
      <View style={styles.fabContainer}>
        <FAB
          size="small"
          color={darkgrey}
          label="Map View"
          style={styles.fab}
          onPress={() => navigation.navigate(mapViewScreenName)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    backgroundColor: "#1F1F1F",
    height: "100%",
    width: "100%",
    flex: 0,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  searchbar: {
    marginVertical: 30,
    flex:0,
    zIndex:1,
  },
  scrollView: {
    flex: 0,
    // flex: 1,
    // height: "80%",
  },
  scrollContainer: {
    // flex: 1,
  },
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "20",
    letterSpacing: "0.3%",
    marginTop: "8%",
    marginBottom: "3%",
  },
  cardContainer: {
    marginVertical: "1%",
  },
  fab: {
    position: "absolute",
    marginLeft: 10,
    bottom: 0,
    borderRadius: 32,
    backgroundColor: lime,
  },
  fabContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 1,
  },
  filterContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  buttonFilter: {
    width: "48%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: white,
    paddingVertical: 4,
    marginHorizontal: 4,
  },
  buttonTextFilter: {
    fontSize: 14,
    color: white,
  },
});

