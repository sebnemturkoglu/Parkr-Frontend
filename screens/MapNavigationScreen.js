import Polyline from "@mapbox/polyline";
import * as React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Map from "../components/Map";
import { darkgrey60, lime, lime60, white } from "../constants/colors";
import { useEffect } from "react";

const timeData = {
  name: "Kardeşler Park",
  reaminingTime: "9 min",
  ocupancy: 9,
  capacity: 25,
  remainingDistance: "7 km",
  arrivalTime: "9.50",
};

const MapDirectionsScreen = ({ navigation }) => {
  const [isFull, setIsFull] = useState(false);
  const [coords, setCoords] = React.useState([]);

  const origin = { latitude: 39.79548, longitude: 32.712426 };
  const destination = { latitude: 39.866797, longitude: 32.758669 };
  const route = useSelector((state) => state.route);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsFull(true);
  //   }, 5000);
  // });

  useEffect(() => {
    console.log("route", route);

    if (route != null && route.length !== 0) {
      let points = Polyline.decode(route[0].polyline);
      let coordinates = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      setCoords(coordinates);
      console.log(coords);
    }
  }, [route]);

  const onBackButtonClick = () => {
    Alert.alert("Quit Route", "Do you want to quit the directions page?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Map
        origin={origin}
        destination={destination}
        directions={true}
        coordinates={coords}
      />
      <View style={styles.textGroupContainer}>
        <View style={styles.textGroup}>
          <Text style={styles.mainText}>{timeData.reaminingTime}</Text>
          <Text style={styles.sideText}>
            {timeData.ocupancy} / {timeData.capacity}
          </Text>
        </View>
        <Text style={styles.bottomText}>
          {timeData.remainingDistance} • {timeData.arrivalTime}
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
});

export default MapDirectionsScreen;
