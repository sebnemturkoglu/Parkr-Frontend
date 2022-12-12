import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const BackButton = (props) => (
  <FAB
   size='small'
    color='#fff'
    icon="keyboard-backspace"
    style={styles.fab}
    onPress={props.onClick}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginLeft: 10,
    marginVertical: 60,
    left: 0,
    top: 0,
    borderRadius: 32,
    backgroundColor: '#1F1F1F',
  },
})

export default BackButton;