import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { darkgrey, white } from '../constants/colors';
import { homeScreenName, profileStackName, ticketsStackName, mapStackName } from "../constants/screenNames";


// screens
import HomeScreen from "../screens/HomeScreen";
import ProfileStack from "./ProfileStack";
import MapStack from "./MapStack";
import TicketStack from "./TicketStack";

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
            } else if (routeName === profileStackName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (routeName === mapStackName) {
              iconName = focused ? "map" : "map-outline";
            } else if (routeName === ticketsStackName) {
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
        <Tab.Screen name={mapStackName} component={MapStack} />
        <Tab.Screen name={ticketsStackName} component={TicketStack} />
        <Tab.Screen name={profileStackName} component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
