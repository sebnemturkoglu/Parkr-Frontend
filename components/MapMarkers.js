import React from "react";
import { Marker } from 'react-native-maps';

const MapMarkers = (props) => (
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
/>
  );
  
export default MapMarkers;