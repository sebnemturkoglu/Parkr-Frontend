import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ParkCard from "../components/ParkCard";
import SearchBar from "../components/SearchBar";
import { darkgrey, lime, white } from "../constants/colors";
import { parkingdata as data } from "../constants/dummyData";
import { mapViewScreenName, placeDetailsScreenName } from "../constants/screenNames";

export default function MapScreen({ navigation, route }) {

  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <SearchBar />
        <View style={styles.filterContainer} >
        <TouchableOpacity style={styles.buttonFilter}>
        <Text style={styles.buttonTextFilter}>Filter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonFilter}>
        <Text style={styles.buttonTextFilter}>Sort</Text>
      </TouchableOpacity>
     
        </View>
        <Text style={styles.header}>Nearest Parking Places</Text>
        <ScrollView style={styles.scrollView}>
          {places.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.id} >
                <ParkCard
                  image={item.image}
                  name={item.name}
                  capacity={item.capacity}
                  occupancy={item.occupancy}
                  rating={item.rating}
                  lowestfare={item.lowestfare}
                  distance={item.distance}
                  onPress={() => navigation.navigate(placeDetailsScreenName, {data: item})}
                />
              </View>
            );
          })}
        </ScrollView>

      </View>
      <View style={styles.fabContainer} >
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
    flex: 1,
  },
  searchbar: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  scrollView: {
    // flex: 1,
    height:"80%",
  },
  scrollContainer:{
    flex:1
  },
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "20",
    letterSpacing: "0.3%",
    marginTop: "8%",
    marginBottom: "3%"
  },
  cardContainer: {
    marginVertical: "1%",
  },
  fab: {
    position: "absolute",
    marginLeft: 10,
    // left: 0,
    bottom: 42,
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
    marginTop: 24
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
  }
});
