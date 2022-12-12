import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { darkgrey, white } from '../constants/colors';


// screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import TicketsScreen from "../screens/TicketsScreen";

// screen names
const homeScreenName = "Home";
const profileScreenName = "Profile";
const ticketsScreenName = "Tickets";
const mapScreenName = "Map";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeScreenName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routeName = route.name;

            if (routeName === homeScreenName) {
              iconName = focused ? "home" : "home-outline";
            } else if (routeName === profileScreenName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (routeName === mapScreenName) {
              iconName = focused ? "map" : "map-outline";
            } else if (routeName === ticketsScreenName) {
              iconName = focused ? "film" : "film-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarStyle: {
            backgroundColor: darkgrey,
          },
          tabBarInactiveTintColor: white,
          tabBarActiveTintColor: white,
        })}
      >
        <Tab.Screen name={homeScreenName} component={HomeScreen} />
        <Tab.Screen name={mapScreenName} component={MapScreen} />
        <Tab.Screen name={ticketsScreenName} component={TicketsScreen} />
        <Tab.Screen name={profileScreenName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
