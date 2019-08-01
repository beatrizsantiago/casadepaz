import React, { Component } from 'react'

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Autocomplete from 'react-native-autocomplete-input';

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
    }

    componentDidMount() {
        CapService.getCaps(cap => {
            let oldCaps = this.state.caps;
            oldCaps.push(cap)
            this.setState({ caps: oldCaps });
        })
    }

    render() {
        return (
            <Container>
                <MapView style={styles.map} initialRegion={{ latitude: -3.71214, longitude: -38.5539, latitudeDelta: 0.03, longitudeDelta: 0.03 }} showsUserLocation>
                    {
                        this.state.caps.map(cap => (
                            <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#ff6028" />
                        ))
                    }
                </MapView>

                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        placeholder="Digite o endereço da cap..." />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    autocompleteContainer: {
        position: 'absolute',
        width: '100%',
        padding: 18
    }
})