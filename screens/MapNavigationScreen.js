import Polyline from "@mapbox/polyline";
import * as React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Map from "../components/Map";
import { darkgrey60, lime, lime60, white, darkgrey } from "../constants/colors";
import { useEffect } from "react";

const timeData = {
  name: "Kardeşler Park",
  reaminingTime: "9 min",
  ocupancy: 9,
  capacity: 25,
  remainingDistance: "7 km",
  arrivalTime: "9.50",
};

const MapDirectionsScreen = ({ navigation, route }) => {
  const [isFull, setIsFull] = useState(false);
  const [coords, setCoords] = React.useState([]);

  const routeInfo = useSelector((state) => state.route);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsFull(true);
  //   }, 5000);
  // });

  useEffect(() => {
    if (routeInfo != null && routeInfo.loaded) {
      let points = Polyline.decode(routeInfo.data[0].polyline);
      let coordinates = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      setCoords(coordinates);
      console.log(coords);
    }
  }, [routeInfo]);

  const onBackButtonClick = () => {
    Alert.alert("Quit Route", "Do you want to quit the directions page?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  function convertSecondsToMinutes(timeString) {
    const seconds = parseInt(timeString, 10);
    const minutes = Math.floor(seconds / 60); // or Math.round(seconds / 60) for rounding to the nearest integer

    return minutes;
  }

  function getCurrentTimeAndAddMinutes(minutesToAdd) {
    const currentTime = new Date();

    // Convert the minutesToAdd value to a number and add it to the current minutes
    const updatedMinutes = currentTime.getMinutes() + Number(minutesToAdd);

    // Create a new Date object with the updated minutes
    const updatedTime = new Date(currentTime.getTime());
    updatedTime.setMinutes(updatedMinutes);

    // Get the updated hour and minute values
    const updatedHours = String(updatedTime.getHours()).padStart(2, "0");
    const updatedMinutesString = String(updatedTime.getMinutes()).padStart(
      2,
      "0"
    );

    // Combine the updated hours and minutes with a dot separator
    const updatedTimeString = `${updatedHours}.${updatedMinutesString}`;

    return updatedTimeString;
  }

  return routeInfo.loaded ? (
    <View style={styles.container}>
      <Map
        directions={true}
        coordinates={coords}
        fixedMarker={true}
        marker={route.params?.marker}
      />
      <View style={styles.textGroupContainer}>
        <View style={styles.textGroup}>
          <Text style={styles.mainText}>
            {convertSecondsToMinutes(routeInfo.data[0].duration)} min
          </Text>
          <Text style={styles.sideText}>
            {routeInfo.data.ocupancy
              ? routeInfo.data[0].ocupancy + "/" + routeInfo.data.capacity
              : null}
          </Text>
        </View>
        <Text style={styles.bottomText}>
          {routeInfo.data[0].distance.toFixed(1)} km •{" "}
          {getCurrentTimeAndAddMinutes(
            convertSecondsToMinutes(routeInfo.data[0].duration)
          )}
        </Text>
      </View>
      {isFull ? (
        <View style={styles.redirectionPopupContainer}>
          <View style={styles.redirectionPopup}>
            <Text style={styles.redirectionText}>
              All the spots are full at {timeData.name} Redirecting to the
              nearest available parking lot
            </Text>
          </View>
        </View>
      ) : null}
      <BackButton onClick={onBackButtonClick} />
    </View>
  ) : (
    <View style={styles.loadContainer}>
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={lime} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#1F1F1F",
    height: "100%",
    width: "100%",
  },
  textGroupContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  textGroup: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
  },
  mainText: {
    fontWeight: "600",
    fontSize: 24,
    color: lime,
  },
  sideText: {
    fontWeight: "600",
    fontSize: 20,
    color: white,
  },
  bottomText: {
    fontWeight: "600",
    fontSize: 20,
    color: lime60,
  },
  redirectionPopupContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 120,
  },
  redirectionPopup: {
    backgroundColor: darkgrey60,
    width: "85%",
    borderRadius: 26,
    borderColor: lime60,
    borderStyle: "solid",
    borderWidth: 3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  redirectionText: {
    fontWeight: "600",
    fontSize: 14,
    color: white,
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    // Add other styles as needed
  },
  loadContainer: {
    flex: 1,
    backgroundColor: darkgrey,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export default MapDirectionsScreen;
