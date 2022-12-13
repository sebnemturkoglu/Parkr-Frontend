import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import Map from "../components/Map";
import { darkgrey, white, lime, lime60 } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FAB } from "react-native-paper";

export default function PlaceDetailsScreen({ navigation, route }) {
  const onBackButtonClick = () => {
    navigation.goBack();
  };

  console.log(route.params.data);

  return (
    <View style={styles.container}>
      <FAB
        mode="flat"
        size="small"
        color="#fff"
        icon="keyboard-backspace"
        style={styles.backButton}
        onPress={onBackButtonClick}
      />
      <View style={styles.mapContainer}>
        <Map scrollDisabled={true} />
      </View>
      <Text style={styles.header}>{route.params.data.name}</Text>
      <Text style={styles.ratingText}>{route.params.data.rating}/5 points</Text>
      <View style={styles.iconGroupContainer}>
        <View style={styles.iconGroup}>
          <Ionicons name="car-sport-sharp" size={16} color={white} />
          <Text style={styles.iconText}>
            {route.params.data.occupancy}/{route.params.data.capacity}
          </Text>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons name="logo-usd" size={16} color={white} />
          <Text style={styles.iconText}>
            from {route.params.data.fares[0].fare}
          </Text>
        </View>
      </View>
      <View style={styles.faresGroup}>
        <Text style={styles.faresHeader}>Fares</Text>
        {route.params.data.fares.map((item) => {
          return (
            <View style={styles.fareLineGroup}>
              <Text style={styles.textFares}>{item.range}</Text>
              <Text style={styles.textFares}>{item.fare}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.fabContainer}>
        <FAB
          size="small"
          color={darkgrey}
          label="Navigate"
          style={styles.fab}
          //   onPress={() => navigation.navigate(mapViewScreenName)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkgrey,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  mapContainer: {
    width: "85%",
    height: "20%",
    marginTop: "30%",
    borderRadius: 26,
  },
  iconGroupContainer: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    marginTop: "1%",
  },
  iconGroup: {
    flexDirection: "row",
  },
  header: {
    fontSize: 24,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginTop: "10%",
  },
  ratingText: {
    fontSize: 16,
    color: lime60,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginTop: "1%",
  },
  iconText: {
    color: white,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: "500",
  },
  faresGroup: {
    width: "85%",
    alignItems: "flex-start",
    marginVertical: "10%",
  },
  faresHeader: {
    fontSize: 16,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginBottom: "1%",
  },
  fareLineGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textFares: {
    fontSize: 16,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  fab: {
    borderRadius: 32,
    backgroundColor: lime,
  },
  fabContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
  },
  backButton: {
    position: "absolute",
    marginLeft: 10,
    marginVertical: 60,
    left: 0,
    top: 0,
    borderRadius: 32,
    backgroundColor: "#1F1F1F",
  },
});
