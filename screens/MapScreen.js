import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import { darkgrey, lime } from "../constants/colors";
import ParkCard from "../components/ParkCard";
import { parkingdata as data } from "../constants/dummyData";
import { FAB } from "react-native-paper";

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <SearchBar />
        <Text style={styles.header}>Nearest Parking Places</Text>
        <ScrollView>
          {data.map((item) => {
            return (
              <View style={styles.cardContainer}>
                <ParkCard
                  image={item.image}
                  name={item.name}
                  capacity={item.capacity}
                  occupancy={item.occupancy}
                  rating={item.rating}
                  lowestfare={item.fares[0].fare}
                  distance={item.distance}
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
          onPress={() => console.log("Pressed")}
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
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "20",
    letterSpacing: "0.3%",
    marginTop: "10%",
    marginBottom: "5%"
  },
  cardContainer: {
    marginVertical: "1%",
  },
  fab: {
    position: "absolute",
    marginLeft: 10,
    // left: 0,
    bottom: 2,
    borderRadius: 32,
    backgroundColor: lime,
  },
  fabContainer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center"
  }
});
