import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { darkgrey, lime, lime60, white } from "../constants/colors";
import { currentTicketDetailsScreenName, oldTicketDetailsScreenName } from "../constants/screenNames";

currentPark = {
  name: "Kardeşler Park",
  startTime: "10.53",
  fee: "25",
};

pastParks = [
  {
    id:1,
    name: "Bilka Park",
    date: "11.11.2022",
    fee: "20",
  },
  {
    id:2,
    name: "Kardeşler Park",
    date: "10.11.2022",
    fee: "25",
  },
  {id:3,
    name: "Kardeşler Park",
    date: "8.11.2022",
    fee: "25",
  },
];

const PastLines = (props) => (
  <View style={styles.pastContainer}>
    <Text style={styles.pastHeader}>{props.info.name}</Text>
    <View style={styles.bottomGroup}>
      <Text style={styles.pastBottomLeft}>
        Start Time: {props.info.date}
      </Text>
      <Text style={styles.pastBottomRigth}>Fee: {props.info.fee}₺</Text>
    </View>
  </View>
);

export default function TicketsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tickets</Text>
      <View style={styles.currentContainer}>
      <Text style={styles.subheader}>Current Park</Text>
      <TouchableOpacity onPress={() => navigation.navigate(currentTicketDetailsScreenName)}>
      <View style={styles.infoContainer}>
        <Text style={styles.currentHeader}>{currentPark.name}</Text>
        <View style={styles.bottomGroup}>
          <Text style={styles.currentBottomLeft}>
            Start Time: {currentPark.startTime}
          </Text>
          <Text style={styles.currentBottomRigth}>Fee: {currentPark.fee}₺</Text>
        </View>
      </View>
      </TouchableOpacity>
      </View>
      <Text style={styles.subheader}>Past Parks</Text>
      <ScrollView>
      {pastParks.map((item) => {
            return (
              <TouchableOpacity key={item.id} onPress={() => navigation.navigate(oldTicketDetailsScreenName, {data: item.id})} >
                <PastLines info={item} navigation={navigation} />
              </TouchableOpacity>
              
            );
          })}
      </ScrollView>
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
  subheader: {
    color: lime,
    fontWeight: "600",
    fontSize: "16",
    letterSpacing: "0.3%",
    marginVertical: 4
  },
  bottomGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  infoContainer: {
    width: "100%",
  },
  currentHeader: {
    fontSize: 24,
    color: white,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginBottom: 4,
  },
  currentBottomLeft: {
    fontSize: 16,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  currentBottomRigth: {
    fontSize: 16,
    color: lime60,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  pastHeader: {
    fontSize: 18,
    color: white,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginBottom: 4,
  },
  pastBottomLeft: {
    fontSize: 14,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  pastBottomRigth: {
    fontSize: 14,
    color: lime60,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  currentContainer: {
    marginVertical: "10%",
  },
  pastContainer: {
    marginBottom: "5%"
  }
});
