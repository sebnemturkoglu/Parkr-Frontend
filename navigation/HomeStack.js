import { createStackNavigator } from "@react-navigation/stack";
import {
  homeScreenName,
  placeDetailsScreenName,
  mapDirecrtionsScreenName,
} from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import HomeScreen from "../screens/HomeScreen";
import PlaceDetailsScreen from "../screens/PlaceDetailsScreen";
import MapDirectionsScreen from "../screens/MapNavigationScreen";

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={homeScreenName} component={HomeScreen} />
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
