import React from "react";
import { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

import { useState } from "react";
import { darkgrey, lime } from "../constants/colors";

export default function MapMarkers(props) {
  // const [selected, isSelected] = useState(false);

  return (
    <Marker
      coordinate={
        !props.position
          ? {
              latitude: 74,
              longitude: 18,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
          : {
              latitude: props.position.latitude,
              longitude: props.position.longitude,
              latitudeDelta: 0.932,
              longitudeDelta: 0.0421,
            }
      }
      onPress={() => {
        console.log(props.index);
        props.setSelectedIndex(props.index);
      }}
    >
      <View
        style={
          props.index == props.selectedIndex
            ? styles.markerSelected
            : styles.marker
        }
      >
        {props.hasAgreement ? (
          <Text
            style={
              props.index == props.selectedIndex
                ? styles.textSelected
                : styles.text
            }
          >
            {props.availability}
          </Text>
        ) : (
          <Text
            style={
              props.index == props.selectedIndex
                ? styles.textSelected
                : styles.text
            }
          >
            -
          </Text>
        )}
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  markerSelected: {
    backgroundColor: lime,
    padding: 5,
    borderRadius: 5,
  },
  textSelected: {
    color: darkgrey,
    fontWeight: "bold",
  },
});
