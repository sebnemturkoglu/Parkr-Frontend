import * as React from 'react';
import { View, StyleSheet } from 'react-native';

const ParkCard = () => (
    <View style={styles.container}>
        <View style = {styles.textGroup}>
        
        </View>
        <View style = {styles.imageGroup}>

</View>
    </View>
);

styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    textGroup: {
        backgroundColor: '#487489',
        width: '70%',
        height: '100%'
    },
    imageGroup: {
        backgroundColor: '#292837',
        width: '30%',
        height: '100%'
    }
})

export default ParkCard;