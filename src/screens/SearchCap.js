import React, { Component } from 'react'

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Autocomplete from 'react-native-autocomplete-input';

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
        searchLocale: '',
        hideResults: true
    }

    componentDidMount() {
        CapService.getCaps(cap => {
            let oldCaps = this.state.caps
            oldCaps.push(cap)
            this.setState({ caps: oldCaps })
        })
    }

    filterLocale = locale => {
        let search = this.state.caps
        let filterResult = search.filter(filterCap => filterCap.local.includes(locale))
        let filter = filterResult.map(cap => cap.local)
        return filter        
    }

    handleSearch = localCap => {
        this.setState({ searchLocale: localCap, hideResults: true })
    }

    render() {
        const data = this.filterLocale(this.state.searchLocale);

        return (
            <Container>
                <MapView style={styles.map} initialRegion={{ latitude: -3.71214, longitude: -38.5539, latitudeDelta: 0.03, longitudeDelta: 0.03 }} showsUserLocation>
                    {
                        this.state.caps.map(cap => (
                            <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121" />
                        ))
                    }
                </MapView>

                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        // onFocus={() => this.setState({ hideResults: false })}    
                        onBlur={() => this.setState({ hideResults: true })}
                        hideResults={this.state.hideResults}
                        data={data}
                        defaultValue={this.state.searchLocale}
                        onChangeText={text => this.setState({ searchLocale: text, hideResults: false })}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity style={styles.buttonItem} onPress={() => this.handleSearch(item)}>
                                <Text style={{ fontSize: 16 }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        inputContainerStyle={styles.inputSearch}
                        placeholder="Digite o endereço / bairro / CEP da cap..." />
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
    },
    buttonItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8'
    }, 
    inputSearch: {
        paddingHorizontal: 6,
        backgroundColor: '#fff',
        borderRadius: 5
    }
})