import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { mapScreenName, mapViewScreenName } from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import MapScreen from "../screens/MapScreen";
import MapViewScreen from "../screens/MapViewScreen";

export default function MapStack() {
    return(
        // <NavigationContainer>
            <Stack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
              })}>
                <Stack.Screen 
                name={mapScreenName}
                component={MapScreen} />
                <Stack.Screen 
                name={mapViewScreenName}
                component={MapViewScreen} />
            </Stack.Navigator>
        // </NavigationContainer>
    )
}