import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getPastParkingData, getCurrentParkingData } from "../actions/user";
import { darkgrey, lime, lime60, white } from "../constants/colors";
import {
  currentTicketDetailsScreenName,
  oldTicketDetailsScreenName,
} from "../constants/screenNames";

// currentPark = {
//   name: "Kardeşler Park",
//   startTime: "10.53",
//   fee: "25",
// };

// pastParks = [
//   {
//     id: 1,
//     name: "Bilka Park",
//     date: "11.11.2022",
//     fee: "20",
//   },
//   {
//     id: 2,
//     name: "Kardeşler Park",
//     date: "10.11.2022",
//     fee: "25",
//   },
//   { id: 3, name: "Kardeşler Park", date: "8.11.2022", fee: "25" },
// ];

const formatTime = (time) => {
  const date = new Date(time);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Note: Month starts from 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

const PastLines = (props) => (
  <View style={styles.pastContainer}>
    <Text style={styles.pastHeader}>{props.info.name}</Text>
    <View style={styles.bottomGroup}>
      <Text style={styles.pastBottomLeft}>
        Start Time: {formatTime(props.info.startTime)}
      </Text>
      <Text style={styles.pastBottomRigth}>Fee: {props.info.fee}₺</Text>
    </View>
  </View>
);

const CurrentLines = (props) => (
  <View style={styles.infoContainer}>
    <Text style={styles.currentHeader}>{props.info.name}</Text>
    <View style={styles.bottomGroup}>
      <Text style={styles.currentBottomLeft}>
        Start Time: {formatTime(props.info.startTime)}
      </Text>
      <Text style={styles.currentBottomRigth}>
        Fee: {props.info.fee - props.info.paidAmount}₺
      </Text>
    </View>
  </View>
);

export default function TicketsScreen({ navigation }) {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getPastParkingData());
    dispatch(getCurrentParkingData());
  }, []);

  const pastParkingData = useSelector((state) => state.pastParkingData);
  const currentParkingData = useSelector((state) => state.currentParkingData);

  const onRefresh = async () => {
    setRefreshing(true);

    dispatch(getPastParkingData());
    dispatch(getCurrentParkingData());

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tickets</Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={lime60}
            colors={lime60}
          />
        }
      >
        <View style={styles.currentContainer}>
          <Text style={styles.subheader}>Current Park</Text>

          {currentParkingData != null && currentParkingData.length !== 0 ? (
            currentParkingData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  index={index}
                  onPress={() => {
                    navigation.navigate({
                      name: currentTicketDetailsScreenName,
                      params: { index: index },
                      merge: true,
                    });
                  }}
                >
                  <CurrentLines info={item} navigation={navigation} />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyTextContainer}>
              <Text style={styles.emptyText}>
                No vehicle is currently parked.
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.subheader}>Past Parks</Text>

        {pastParkingData != null && pastParkingData.length !== 0 ? (
          pastParkingData.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navigation.navigate({
                    name: oldTicketDetailsScreenName,
                    params: { index: index },
                    merge: true,
                  });
                }}
              >
                <PastLines info={item} navigation={navigation} />
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.emptyTextContainer}>
            <Text style={styles.emptyText}>No past parking data.</Text>
          </View>
        )}
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
    marginVertical: 4,
  },
  bottomGroup: {
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  infoContainer: {
    width: "100%",
    marginBottom: "5%",
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
    marginBottom: "5%",
  },
  emptyText: {
    fontSize: 14,
    color: white,
    fontWeight: "500",
    letterSpacing: "0.3%",
  },
  emptyTextContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "1%",
  },
});
