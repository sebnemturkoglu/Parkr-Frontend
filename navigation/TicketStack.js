import { createStackNavigator } from "@react-navigation/stack";
import {
  oldTicketDetailsScreenName,
    ticketsScreenName,
    currentTicketDetailsScreenName
} from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import TicketsScreen from "../screens/TicketsScreen";
import OldTicketDetailsScreen from "../screens/OldTicketDetailsScreen";
import CurrentTicketDetailsScreen from "../screens/CurrentTicketDetailsScreen";

export default function TicketStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={ticketsScreenName} component={TicketsScreen} />
      <Stack.Screen name={oldTicketDetailsScreenName} component={OldTicketDetailsScreen} />
      <Stack.Screen name={currentTicketDetailsScreenName} component={CurrentTicketDetailsScreen} />
    </Stack.Navigator>
  );
}
