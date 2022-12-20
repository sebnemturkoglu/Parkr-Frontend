import { createStackNavigator } from "@react-navigation/stack";
import {
    addVehicleScreenName,
    editVehicleInformationScreenName,
    profileScreenName
} from "../constants/screenNames";

const Stack = createStackNavigator();

// screens
import ProfileScreen from "../screens/ProfileScreen";
import AddVehicleScreen from "../screens/AddVehcileScreen";
import EditVehicleInformationScreen from "../screens/EditVehicleInformationScreen";

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={profileScreenName} component={ProfileScreen} />
      <Stack.Screen name={addVehicleScreenName} component={AddVehicleScreen} />
      <Stack.Screen name={editVehicleInformationScreenName} component={EditVehicleInformationScreen} />
    </Stack.Navigator>
  );
}
