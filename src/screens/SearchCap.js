import React from 'react';

import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';

import { Container } from './styles/MainStyled'

export default SearchCap = () => {

    return (
        <Container>
            <MapView
            style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})