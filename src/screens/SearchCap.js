import React, { Component } from 'react'

import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
    }

    async componentDidMount() {
        let caps = await CapService.getCaps()
        this.setState({ caps })
    }

    render() {
        return (
            <Container>
                <MapView style={styles.map} initialRegion={{ latitude: -3.71214, longitude: -38.5539, latitudeDelta: 0.03, longitudeDelta: 0.03 }}>
                    {
                        this.state.caps.map(cap => (
                            <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} />
                        ))
                    }
                </MapView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})