import React, { Component } from 'react'

import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
        visibleCaps: [],
        searchLocale: '',
        searching: false,
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
        let searchCaps = this.state.caps
        let filterResult = searchCaps.filter(filterCap => filterCap.local.includes(locale))

        return filterResult
    }

    handleSearch = resultCap => {
        let result = []
        result.push(resultCap)

        this.setState({ visibleCaps: result, searchLocale: resultCap.local, hideResults: true, searching: true })
    }

    clearInput = () => {
        this.setState({ searchLocale: '', searching: false })
    }

    render() {
        const data = this.filterLocale(this.state.searchLocale);

        return (
            <Container>
                <MapView style={styles.map} initialRegion={{ latitude: -3.71214, longitude: -38.5539, latitudeDelta: 0.03, longitudeDelta: 0.03 }} showsUserLocation>
                    {
                        this.state.searching == true ?
                            this.state.visibleCaps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121" />
                            ))
                            :
                            this.state.caps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121" />
                            ))
                    }
                </MapView>

                <View style={styles.autocompleteContainer}>
                    <Autocomplete
                        onBlur={() => this.setState({ hideResults: true, searching: this.state.searchLocale ? true : false })}
                        hideResults={this.state.hideResults}
                        data={data}
                        defaultValue={this.state.searchLocale}
                        onChangeText={text => this.setState({ searchLocale: text, hideResults: false })}
                        renderItem={({ item, i }) => (
                            <TouchableOpacity style={styles.buttonItem} onPress={() => this.handleSearch(item)}>
                                <Text style={{ fontSize: 16 }}>{item.local}</Text>
                            </TouchableOpacity>
                        )}
                        inputContainerStyle={styles.inputSearch}
                        placeholder="Digite o endereço / bairro / CEP da cap..." />

                    {this.state.searchLocale ?
                        <TouchableOpacity style={styles.buttonClose} onPress={() => this.clearInput()}>
                            <Icon name="ios-close" color="#fff" size={40} />
                        </TouchableOpacity>
                        :
                        <View></View>
                    }
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
        display: 'flex',
        flexDirection: 'row',
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
    },
    buttonClose: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 46,
        height: 42,
        borderRadius: 5,
        backgroundColor: '#f68121',
    }
})