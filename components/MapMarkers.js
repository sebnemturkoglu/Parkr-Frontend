import React from "react";
import { Marker } from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  darkgrey,
  lime,
  alert,
  ok,
  warning,
  darkgrey40,
  white,
} from "../constants/colors";

export default function MapMarkers(props) {
  const markerColor = () => {
    const occupancyRatio = props.occupancyRatio;

    if (props.colorsDisabled) {
      return markerSelected;
    } else if (occupancyRatio >= 0.9) {
      return styles.markerAlert;
    } else if (occupancyRatio >= 0.8) {
      return styles.markerWarning;
    } else {
      return styles.markerOk;
    }
  };

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
        props.setSelectedIndex(props.index);
      }}
    >
      <View
        style={
          props.index == props.selectedIndex
            ? styles.markerSelected
            : props.hasAgreement
            ? markerColor()
            : styles.markerDisabled
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
            <Ionicons
              name="caret-down"
              size={12}
              color={props.index == props.selectedIndex ? lime : white}
            />
          </Text>
        )}
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  text: {
    color: white,
    fontWeight: "bold",
  },
  markerSelected: {
    backgroundColor: darkgrey,
    padding: 5,
    borderRadius: 5,
  },
  textSelected: {
    color: lime,
    fontWeight: "bold",
  },
  markerDisabled: {
    backgroundColor: darkgrey40,
    padding: 5,
    borderRadius: 5,
  },
  markerAlert: {
    backgroundColor: alert,
    padding: 5,
    borderRadius: 5,
  },
  markerWarning: {
    backgroundColor: warning,
    padding: 5,
    borderRadius: 5,
  },
  markerOk: {
    backgroundColor: ok,
    padding: 5,
    borderRadius: 5,
  },
});
