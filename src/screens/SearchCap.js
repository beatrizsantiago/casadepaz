import React, { Component } from 'react'

import { StyleSheet, View, TouchableOpacity, Text, Picker } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'
import { SearchContainer, AutocompleteContainer, SelectContainer, Select, ButtonClose } from './styles/SearchCapStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
        visibleCaps: [],
        searchLocale: '',
        searching: false,
        hideResults: true,
        region: {
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
        }
    }

    componentDidMount() {
        CapService.getCaps(cap => {
            let oldCaps = this.state.caps
            oldCaps.push(cap)
            this.setState({ caps: oldCaps })
        })

        Geolocation.getCurrentPosition(info => {
            console.warn(info.coords.latitude)
            console.warn(info.coords.longitude);
            this.setState({ region: { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 } })
        });
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
        this.setState({ searchLocale: '', searching: false, hideResults: true })
    }

    render() {
        const data = this.filterLocale(this.state.searchLocale);

        return (
            <Container>
                <MapView style={styles.map} region={this.state.region} showsUserLocation={true} >
                    {
                        this.state.searching == true ?
                            this.state.visibleCaps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121">
                                    <Callout>
                                        <Text>{cap.local}</Text>
                                    </Callout>
                                </Marker>
                            ))
                            :
                            this.state.caps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121">
                                    <Callout>
                                        <Text>{cap.local}</Text>
                                    </Callout>
                                </Marker>
                            ))
                    }
                </MapView>

                <SearchContainer>
                    <AutocompleteContainer>
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
                            <ButtonClose onPress={() => this.clearInput()}>
                                <Icon name="ios-close" color="#fff" size={40} />
                            </ButtonClose>
                            :
                            <View></View>
                        }
                    </AutocompleteContainer>
                    <SelectContainer>
                        <Select>
                            <Picker style={styles.select} >
                                <Picker.Item label="Dia" value="" />
                                <Picker.Item label="Segunda" value="Segunda" />
                                <Picker.Item label="Terça" value="Terca" />
                                <Picker.Item label="Quarta" value="Quarta" />
                                <Picker.Item label="Quinta" value="Quinta" />
                                <Picker.Item label="Sexta" value="Sexta" />
                                <Picker.Item label="Sábado" value="Sabado" />
                                <Picker.Item label="Domingo" value="Domingo" />
                            </Picker>
                        </Select>
                        <Select>
                            <Picker style={styles.select} >
                                <Picker.Item label="Hora" value="" />
                                <Picker.Item label="18h" value="Segunda" />
                                <Picker.Item label="18:30h" value="Segunda" />
                                <Picker.Item label="19h" value="Segunda" />
                                <Picker.Item label="19:30h" value="Terca" />
                                <Picker.Item label="20h" value="Quarta" />
                                <Picker.Item label="20:30h" value="Quinta" />
                            </Picker>
                        </Select>
                    </SelectContainer>
                </SearchContainer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
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
    select: {
        width: '97%',
        height: 38,
        backgroundColor: '#fff',
    }
})