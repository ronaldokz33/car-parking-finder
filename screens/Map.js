import React, { Component } from 'react';

import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Picker, TouchableWithoutFeedback } from 'react-native';
import MapView from 'react-native-maps'


import { Ionicons } from '@expo/vector-icons';

const { Marker } = MapView;
const { height, width } = Dimensions.get('screen');

const parkings = [
    {
        id: 1,
        title: 'Parking 1',
        price: 5,
        rating: 5,
        spots: 20,
        free: 10,
        coordinate: {
            latitude: 37.76825,
            longitude: -122.4824,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    },
    {
        id: 2,
        title: 'Parking 2',
        price: 6,
        rating: 4.2,
        spots: 25,
        free: 10,
        coordinate: {
            latitude: 37.77745,
            longitude: -122.4044
        }
    },
    {
        id: 3,
        title: 'Parking 3',
        price: 3,
        rating: 2.2,
        spots: 12,
        free: 10,
        coordinate: {
            latitude: 37.76815,
            longitude: -122.4314
        }
    },
    {
        id: 4,
        title: 'Parking 4',
        price: 4,
        rating: 3.2,
        spots: 10,
        free: 10,
        coordinate: {
            latitude: 37.78865,
            longitude: -122.4364
        }
    }
];

export default class screens extends Component {
    state = {
        hours: 1,
        active: null
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={{ fontSize: 20, color: '#B40B15' }}>Header</Text>
            </View>
        );
    }

    renderParking = (item) => {
        const { hours } = this.state;

        return (
            <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })}>
                <View style={[styles.parking, styles.shadow]}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 14 }}>x{item.spots} {item.title}</Text>
                        {/* 
                        <Text style={{ fontSize: 14 }}>5:00 hrs</Text>
                     */}
                        <View style={{ borderRadius: 6, width: 110, borderColor: 'grey', alignItems: 'center', borderWidth: 0.5, padding: 4 }}>
                            <Picker

                                selectedValue={this.state.hours}
                                style={{ height: 50, fontSize: 12, width: 100, alignItems: 'center', backgroundColor: 'white' }}
                                itemStyle={{ fontSize: 8 }}
                                onValueChange={(itemValue, itemIndex) => {
                                    this.setState({ hours: itemValue })
                                }}
                            >
                                <Picker.Item label="01:00" value={1}></Picker.Item>
                                <Picker.Item label="02:00" value={2}></Picker.Item>
                                <Picker.Item label="03:00" value={3}></Picker.Item>
                                <Picker.Item label="04:00" value={4}></Picker.Item>
                                <Picker.Item label="05:00" value={5}></Picker.Item>
                                <Picker.Item label="06:00" value={6}></Picker.Item>
                                <Picker.Item label="07:00" value={7}></Picker.Item>
                                <Picker.Item label="08:00" value={8}></Picker.Item>
                                <Picker.Item label="09:00" value={9}></Picker.Item>
                                <Picker.Item label="10:00" value={10}></Picker.Item>
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flex: 1.5, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 14 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons size={12} color="#7DB1BA" name="ios-pricetag" />
                                <Text style={{ paddingLeft: 12 }}>${item.price}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Ionicons size={12} color="#7DB1BA" name="ios-star" />
                                <Text style={{ paddingLeft: 12 }}>{item.rating}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.buy}>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: 'white' }}>${item.price * hours}</Text>
                                <Text style={{ color: 'white', fontSize: 9 }}>${item.price}x{hours}hrs</Text>
                            </View>
                            <View style={{ flex: 0.75, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>></Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View >
            </TouchableWithoutFeedback>
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

                    style={styles.map}>
                    {
                        parkings.map((item) => (
                            <Marker
                                key={`marker-${item.id}`}
                                coordinate={item.coordinate}
                            >
                                <TouchableWithoutFeedback onPress={() => this.setState({ active: item.id })}>
                                    <View style={[styles.marker, styles.shadow, this.state.active === item.id ? styles.active : null]}>
                                        <Text style={{ color: '#B40B15', fontWeight: 'bold' }}>${item.price}</Text>
                                        <Text style={{ color: '#7DB1BA' }}> ({item.free}/{item.spots})</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </Marker>
                        ))
                    }
                </MapView>
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
        justifyContent: 'center',
        paddingHorizontal: 24,
        alignItems: 'center'
    },
    map: {
        flex: 3
    },
    parkings: {
        position: 'absolute',
        right: 0,
        left: 0,
        bottom: 0,
        paddingBottom: 24
    },
    parking: {
        flexDirection: 'row',
        width: width - (24 * 2),
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 12,
        marginHorizontal: 24
    },
    buy: {
        flex: 2,
        backgroundColor: '#B40B15',
        padding: 12,
        borderRadius: 6,
        flexDirection: 'row'
    },
    marker: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 0.5,
        borderColor: '#FFF'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 12
        },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    active: {
        borderColor: '#B40B15'
    }
}); 