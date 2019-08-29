import React, { Component } from 'react';

import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps'

const { height, width } = Dimensions.get('screen');

const parkings = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        ratio: 5,
        spots: 20,
        free: 10,
        location: {
            lat: 37.78835,
            long: -122.4334
        }
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 6,
        ratio: 4.2,
        spots: 25,
        free: 10,
        location: {
            lat: 37.78845,
            long: -122.4344
        }
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 3,
        ratio: 2.2,
        spots: 12,
        free: 10,
        location: {
            lat: 37.78815,
            long: -122.4314
        }
    },
    {
        id: 4,
        title: 'Parking 4',
        price: 4,
        ratio: 3.2,
        spots: 10,
        free: 10,
        location: {
            lat: 37.78865,
            long: -122.4364
        }
    }
];

export default class screens extends Component {
    state = {
        hours: 1
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text>Header</Text>
            </View>
        );
    }

    renderParking = (item) => {
        const { hours } = this.state;

        return (
            <View key={`parking-${item.id}`} style={styles.parking}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text>x{item.spots} {item.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text>{item.price}</Text>
                    <Text>{item.rating}</Text>
                    <TouchableWithoutFeedback>
                        <View>
                            <View>
                                <Text>R${item.price * hours}</Text>
                                <Text>R${item.price}x{hours}hrs</Text>
                            </View>
                            <View>
                                <Text>R${item.price * 2}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    renderParkings = () => {
        return (
            <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal style={styles.parkings}>
                {parkings.map((item) => this.renderParking(item))}
            </ScrollView>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                    style={styles.map} />
                {this.renderParkings()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 0.5,
        justifyContent: 'center'
    },
    map: {
        flex: 3
    },
    parkings: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 24
    },
    parking: {
        flexDirection: 'row',
        width: width - (24 * 2),
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24
    }
});