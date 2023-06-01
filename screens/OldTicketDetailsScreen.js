import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkgrey, white, lime, lime60 } from "../constants/colors";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";

const formatTime = (time) => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Month starts from 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export default function OldTicketDetailsScreen({ navigation, route }) {
  const onBackButtonClick = () => {
    navigation.goBack();
  };

  const pastParkingData = useSelector((state) => state.pastParkingData);

  const [ticket, setTicket] = useState(pastParkingData[route.params?.index]);

  console.log(ticket);

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
      <View style={styles.faresGroup}>
        <Text style={styles.faresHeader}>Details</Text>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Start Date and Time:</Text>
          <Text style={styles.textFares}>{formatTime(ticket.startTime)}</Text>
        </View>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>End Date and Time</Text>
          <Text style={styles.textFares}>{formatTime(ticket.endTime)}</Text>
        </View>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Fee:</Text>
          <Text style={styles.textFares}>{ticket.fee}₺</Text>
        </View>
        <View style={styles.fareLineGroup}>
          <Text style={styles.textFares}>Payment:</Text>
          <Text style={styles.textFares}>{ticket.status}</Text>
        </View>
      </View>
      <View style={styles.fabContainer}>
        {/* {ticket.userRated ? (
          <View style={styles.faresGroup}>
            <View style={styles.fareLineGroup}>
              <Text style={styles.textFares}>You rated:</Text>
              <Text style={styles.textFares}>{ticket.userRating} points</Text>
            </View>
          </View>
        ) : (
          <FAB
            size="small"
            color={darkgrey}
            label="Rate your experience"
            style={styles.fab}
            //   onPress={() => navigation.navigate(mapDirecrtionsScreenName)}
          />
        )} */}
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
