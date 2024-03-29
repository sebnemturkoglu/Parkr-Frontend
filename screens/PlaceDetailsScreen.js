import Ionicons from "@expo/vector-icons/Ionicons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceDetails } from "../actions/places";
import { getRoutes } from "../actions/routes";
import Map from "../components/Map";
import { darkgrey, lime, lime60, white } from "../constants/colors";
import { mapDirecrtionsScreenName } from "../constants/screenNames";

export default function PlaceDetailsScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const place_id = route.params?.id;
    dispatch(getPlaceDetails({ placeID: place_id }));
  }, []);

  const placeDetails = useSelector((state) => state.placeDetails);
  const routeInfo = useSelector((state) => state.route);
  console.log("place details", placeDetails);
  console.log("marker", placeDetails.coordinates);

  const [routeLoading, setRouteLoading] = useState(false);

  const onClickNavigate = async () => {
    console.log("info", routeInfo);
    setRouteLoading(true);

    let loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low,
    }).then((locVal) => {
      let latitude = locVal.coords.latitude;
      let longitude = locVal.coords.longitude;

      dispatch(
        getRoutes({
          originLatitude: latitude,
          originLongitude: longitude,
          destinationPlaceID: placeDetails.placeID,
          carID: -1,
        })
      );

      navigation.navigate({
        name: mapDirecrtionsScreenName,
        params: { marker: placeDetails.coordinates },
        merge: true,
      });
    });
  };

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
      {placeDetails == null || Object.keys(placeDetails).length === 0 ? null : (
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <Map
              scrollDisabled={true}
              fixedMarker={true}
              marker={placeDetails.coordinates}
              hasAgreement={placeDetails.hasAggreement}
              availability={
                placeDetails.hasAggreement
                  ? placeDetails.capacity - placeDetails.occupancy
                  : -1
              }
            />
          </View>
          <Text style={styles.header}>{placeDetails.name}</Text>
          <Text style={styles.ratingText}>
            {placeDetails.numOfRatings === 0
              ? "Not rated"
              : placeDetails.rating + "/5 points"}
          </Text>
          {placeDetails.hasAggreement ? (
            <View style={styles.iconGroupContainer}>
              <View style={styles.iconGroup}>
                <Ionicons name="car-sport-sharp" size={16} color={white} />
                <Text style={styles.iconText}>
                  {placeDetails.occupancy}/{placeDetails.capacity}
                </Text>
              </View>
              <View style={styles.iconGroup}>
                <Ionicons name="logo-usd" size={16} color={white} />
                <Text style={styles.iconText}>
                  {placeDetails.fares
                    ? placeDetails.lowestFare === 0
                      ? "Free"
                      : "from " + placeDetails.lowestFare + "₺"
                    : "fare information missing"}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.faresGroup}>
            {placeDetails.lowestFare === 0 ? null : (
              <Text style={styles.faresHeader}>Fares</Text>
            )}
            {placeDetails.hasAggreement ? (
              placeDetails.fares ? (
                Object.keys(placeDetails.fares).map((field, index) => (
                  <View style={styles.fareLineGroup} key={index}>
                    <Text style={styles.textFares}>{field}</Text>
                    <Text style={styles.textFares}>
                      {placeDetails.fares[field]}₺
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.fareLineGroup}>
                  <Text style={styles.textFares}>
                    Fare information missing.
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.fareLineGroup}>
                <Text style={styles.textFares}>
                  This establishment currently does not have agreement with
                  Parkr.
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.fabContainer}>
        <FAB
          size="small"
          color={darkgrey}
          label="Navigate"
          style={styles.fab}
          onPress={onClickNavigate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    bottom: 100,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    // Add other styles as needed
  },
});
