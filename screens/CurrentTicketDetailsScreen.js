import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkgrey, white, lime, lime60 } from "../constants/colors";
import { FAB } from "react-native-paper";

const propTicket = {
  name: "Bilka Park",
  date: "11.11.2022",
  time: "10.23",
  fee: "20₺",
  rating: "4.7",
};

export default function CurrentTicketDetailsScreen({ navigation, route }) {
  const [ticket, setTicket] = useState(propTicket);

  const onBackButtonClick = () => {
    navigation.goBack();
  };

  id = 0;

  return (
    <View style={styles.container}>
      <FAB
        mode="flat"
        size="small"
        color="#fff"
        icon="keyboard-backspace"
        style={styles.backButton}
        onPress={onBackButtonClick}
      />
      <Text style={styles.header}>{ticket.name} Ticket</Text>
      <Text style={styles.ratingText}>{ticket.rating}/5 points</Text>
      <View style={styles.faresGroup}>
        <Text style={styles.faresHeader}>Details</Text>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Date</Text>
          <Text style={styles.textFares}>{ticket.date}</Text>
        </View>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Parking started at</Text>
          <Text style={styles.textFares}>{ticket.time}</Text>
        </View>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Current fee</Text>
          <Text style={styles.textFares}>{ticket.fee}</Text>
        </View>
      </View>
      <View style={styles.fabContainer}>
      <FAB
            size="small"
            color={darkgrey}
            label="Pay via Parkr"
            style={styles.fab}
            //   onPress={() => navigation.navigate(mapDirecrtionsScreenName)}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkgrey,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginTop: "30%",
  },
  ratingText: {
    fontSize: 16,
    color: lime60,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginTop: "1%",
  },
  faresGroup: {
    width: "85%",
    alignItems: "flex-start",
    marginVertical: "10%",
  },
  faresHeader: {
    fontSize: 16,
    color: lime,
    fontWeight: "600",
    letterSpacing: "0.3%",
    marginBottom: "1%",
  },
  fareLineGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textFares: {
    fontSize: 16,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  fab: {
    borderRadius: 32,
    backgroundColor: lime,
  },
  fabContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
  },
  backButton: {
    position: "absolute",
    marginLeft: 10,
    marginVertical: 60,
    left: 0,
    top: 0,
    borderRadius: 32,
    backgroundColor: "#1F1F1F",
  },
});
