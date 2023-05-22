import React, {useEffect, useState, useContext} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { darkgrey, darkgrey60, lime, lime60, white } from "../constants/colors";
import { List, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addVehicleScreenName, editVehicleInformationScreenName } from "../constants/screenNames";
import { AuthContext } from "../AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../actions/user";

const listItems = [
  {
    title: "Edit profile information",
    icon: "account-cog",
    onClick: "",
    id: 0,
  },
  {
    title: "Settings",
    icon: "cog",
    onClick: "",
    id: 1,
  }
];


export default function ProfileScreen({ navigation, route }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
  }, []);

  const vehicles = useSelector((state) => state.vehicles);

  const { logout } = useContext(AuthContext);




  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <List.Section>
        {listItems.map((item) => {
          return (
            <TouchableOpacity key={item.id} >
              <List.Item
                title={item.title}
                titleStyle={styles.listItem}
                left={() => <List.Icon color={white} icon={item.icon} />}
                right={() => <List.Icon color={white} icon="chevron-right" />}
              />
            </TouchableOpacity>
          );
        })}
            <TouchableOpacity onPress={() => {logout();}} >
              <List.Item
                title="Logout"
                titleStyle={styles.listItem}
                left={() => <List.Icon color={white} icon="cog" />}
                right={() => <List.Icon color={white} icon="chevron-right" />}
    
              />
            </TouchableOpacity>
      </List.Section>

      <Text style={styles.subheader} >My Vehicles</Text>
      <List.Section>
        {vehicles.map((item) => {
          return (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate(editVehicleInformationScreenName, {item})}>
              <List.Item
                title={item.plate}
                titleStyle={styles.listItem}
                left={() => <List.Icon color={white} icon="car" />}
                right={() => <List.Icon color={white} icon="chevron-right" />}
              />
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate(addVehicleScreenName)}>
        <Text style={styles.buttonText}>Add a vehicle</Text>
      </TouchableOpacity>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    backgroundColor: darkgrey,
    height: "100%",
    width: "100%",
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  header: {
    color: lime,
    fontWeight: "600",
    fontSize: "26",
    letterSpacing: "0.3%",
    marginTop: "10%",
    marginBottom: "5%",
  },
  listItem: {
    color: white,
  },
  subheader: {
    color: lime,
    fontWeight: "600",
    fontSize: "20",
    letterSpacing: "0.3%",
    marginVertical: 30
  },
  button: {
    width: "100%",
    backgroundColor: darkgrey,
    borderColor: lime60,
    alignItems: "center",
    height: 42,
    borderRadius: 4,
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 8,
    marginRight: "auto",
    borderWidth: 1
  },
  buttonText: {
    color: lime,
    fontWeight: "600",
    fontSize: 16,
  },
});
