import { createStackNavigator } from "@react-navigation/stack";
import {
  oldTicketDetailsScreenName,
  ticketsScreenName,
  currentTicketDetailsScreenName,
  paymentScreenName,
} from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import TicketsScreen from "../screens/TicketsScreen";
import OldTicketDetailsScreen from "../screens/OldTicketDetailsScreen";
import CurrentTicketDetailsScreen from "../screens/CurrentTicketDetailsScreen";
import PaymentScreen from "../screens/PaymentScreen";

export default function TicketStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={ticketsScreenName} component={TicketsScreen} />
      <Stack.Screen
        name={oldTicketDetailsScreenName}
        component={OldTicketDetailsScreen}
      />
      <Stack.Screen
        name={currentTicketDetailsScreenName}
        component={CurrentTicketDetailsScreen}
      />
      <Stack.Screen name={paymentScreenName} component={PaymentScreen} />
    </Stack.Navigator>
  );
}
