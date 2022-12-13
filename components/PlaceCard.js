import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {  darkgrey60, lime, lime60, white } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Map from "./Map";

const PlaceCard = (props) => (
  <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <View style={styles.headerGroup}>
          <View style={styles.headerGroupLeft}>
            <Text style={styles.textHeader}>{props.name}</Text>
            <Text style={styles.textBody}>{props.distance}</Text>
          </View>
          <View>
            <Ionicons name="chevron-forward" size={20} color={white} />
          </View>
        </View>
        <Text style={styles.textBody}>{props.rating}/5 points</Text>
      </View>
      <View style={styles.mapContainer}>
        <Map scrollDisabled={true} />
      </View>
    </View>
  </TouchableOpacity>
);

styles = StyleSheet.create({
  container: {
    width: 260,
    height: 160,
    backgroundColor: darkgrey60,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  headerGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  headerGroupLeft: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textGroup: {
    width: "90%"
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
  mapContainer: {
    width: "90%",
    height: "50%",
    borderRadius: 26,
    marginVertical: 10,
  },
});

export default PlaceCard;