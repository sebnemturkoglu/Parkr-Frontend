import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import { darkgrey, lime } from "../constants/colors";
import { parkingdata as data } from "../constants/dummyData";
import ParkingPlaceCard from "../components/ParkingPlaceCard";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Text style={styles.header}>Find your parking spot</Text>
        <SearchBar />
      </View>
      <View>
        <Text style={styles.subheader} >Nearby Places</Text>
        <ScrollView horizontal={true}>
          {data.map((item) => {
            console.log(item.coordinates);
            return (
              <View style={styles.cardContainer} key={item.id} >
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
      <View>
        <Text style={styles.subheader} >Recent Places</Text>
        <ScrollView horizontal={true}>
          {data.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.id} >
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
    marginVertical: 30,
    marginHorizontal: 20,
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
    marginVertical: 30,
    marginHorizontal: 20,
  },
  cardContainer: {
    width: 260,
    marginHorizontal: 10,
  }
});
