import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { lime, lime60, white } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const ParkCard = (props) => (
  <View style={styles.container}>
    <View style={styles.textGroup}>
      <View style={styles.infoGroup} >
        <View style={styles.headerGroup}>
          {/* <Text > */}
          <Text style={styles.textHeader}>{props.name}</Text>
          <Text style={styles.textBody}>{props.distance}</Text>
          {/* </Text> */}
        </View>
        <Text style={styles.textBody}>{props.rating}/5 points</Text>
      </View>
      <View style={styles.iconGroupContainer}>
        <View style={styles.iconGroup}>
          <Ionicons name="car-sport-sharp" size={16} color={white} />
          <Text style={styles.iconText}>
            {props.occupancy}/{props.capacity}
          </Text>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons name="logo-usd" size={16} color={white} />
          <Text style={styles.iconText}>from {props.lowestfare}</Text>
        </View>
      </View>
    </View>
    <View style={styles.imageGroup}>
      <Image style={styles.image} source={props.image} />
    </View>
  </View>
);

styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 125,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  headerGroup: {
    flexDirection: "row",
    width: "70%",
    alignItems: "flex-end",
  },
  textGroup: {
    width: "70%",
    height: "100%",
    padding: 12,
    flexDirection: 'column',
    justifyContent: "space-evenly"
  },
  imageGroup: {
    width: "30%",
    height: "100%",
    padding: 6,
  },
  iconGroupContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  iconGroup: {
    flexDirection: "row",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 26,
  },
  textHeader: {
    fontSize: 16,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginRight: 6,
  },
  textBody: {
    fontSize: 12,
    color: lime60,
    fontWeight: "600",
    letterSpacing: "0.3%",
  },
  iconText: {
    color: white,
    fontSize: 14,
    marginRight: 6,
  },
});

export default ParkCard;
