import { createStackNavigator } from "@react-navigation/stack";
import {
  mapScreenName,
  mapViewScreenName,
  placeDetailsScreenName,
  mapDirecrtionsScreenName,
} from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import MapScreen from "../screens/MapScreen";
import MapViewScreen from "../screens/MapViewScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import MapDirectionsScreen from "../screens/MapNavigationScreen";

export default function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={mapScreenName} component={MapScreen} />
      <Stack.Screen name={mapViewScreenName} component={MapViewScreen} />
      <Stack.Screen
        name={placeDetailsScreenName}
        component={PlaceDetailsScreen}
      />
      <Stack.Screen
        name={mapDirecrtionsScreenName}
        component={MapDirectionsScreen}
      />
    </Stack.Navigator>
  );
}
