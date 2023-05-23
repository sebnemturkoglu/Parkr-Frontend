import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import MapMarkers from "./MapMarkers";
import MapViewDirections from "react-native-maps-directions";
import { darkgrey, lime } from "../constants/colors";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data;
    const location = locations[0];
    if (location) {
      console.log("Location in background", location.coords);
    }
  }
});

export default function Map(props) {
  // Define position state: {latitude: number, longitude: number}
  const [position, setPosition] = useState(null);

  // Request permissions right after starting the app
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync();
      if (foreground.granted)
        await Location.requestBackgroundPermissionsAsync();
    };
    requestPermissions();
    startForegroundUpdate();
  }, []);

  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        setPosition(location.coords);
      }
    );
  };

  // Stop location tracking in foreground
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    setPosition(null);
  };

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME);
    if (!isTaskDefined) {
      console.log("Task is not defined");
      return;
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      console.log("Already started");
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    });
  };

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TASK_NAME
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      console.log("Location tacking stopped");
    }
  };

  const GOOGLE_MAPS_APIKEY = "AIzaSyAgu7UnTtb-9hS2Aspkv6lp_n4Xu6Qm7ks";
 
  return (
    <View style={styles.container}>
      <MapView
        scrollEnabled={props.scrollDisabled ? false : true}
        region={
          props.fixedMarker
          ? {
                latitude: props.marker.latitude,
                longitude: props.marker.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
          }
          : (!position
            ? {
                latitude: 74,
                longitude: 18,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : {
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              })
        }
        style={styles.map}
      >
        {
          props.fixedMarker
          ? <MapMarkers position={props.marker} />
          : (
            props.multipleMarkers
            ? props.places.map((item) => {
              return (
                <MapMarkers position={item.coordinates} key={item.placeID} />
              );
            })
            : <MapMarkers position={position} />
          )
        }
        {
          props.directions
          ?   <MapViewDirections
          origin={props.origin}
          destination={props.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
    strokeColor={darkgrey}
        />
        : null
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
