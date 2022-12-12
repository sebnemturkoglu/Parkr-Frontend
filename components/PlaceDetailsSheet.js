import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Animated } from "react-native";

const PlaceDetailsSheet = () => {

  return (
    <View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  searchbar: {
    marginVertical: 30,
    marginHorizontal: 15,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  cardContainer: {
    padding: 10,
    height: '15%'
  }
});

export default PlaceDetailsSheet;