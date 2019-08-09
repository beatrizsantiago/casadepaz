import React, { Component } from 'react'

import { StyleSheet, View, TouchableOpacity, Text, Picker, Animated, Easing } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconLocal from 'react-native-vector-icons/Entypo'

import CapService from '../services/CapService'

import { Container, SearchContainer, AutocompleteContainer, SelectContainer, Select, ButtonClose, ButtonCloseCard, LargeInput, TextLarge, MediumInput, TextMedim } from './styles/SearchCapStyled'

export default class SearchCap extends Component {

    state = {
        caps: [],
        visibleCaps: [],
        searchLocale: '',
        searchDay: '',
        searching: false,
        hideResults: true,
        region: {
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
        },
        animatedValue: new Animated.Value(400),
        idCapSelected: '',
        dataCapSelected: {},
    }

    setCurrentPosition = () => {
        Geolocation.getCurrentPosition(info => {
            this.setState({ region: { latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 } })
        });
    }

    componentDidMount() {
        CapService.getCaps(cap => {
            let oldCaps = this.state.caps
            oldCaps.push(cap)
            this.setState({ caps: oldCaps })
        })

        this.setCurrentPosition()
    }

    filterLocale = locale => {
        let searchCaps = this.state.caps
        let filterResult = searchCaps.filter(filterCap => filterCap.local.includes(locale))

        return filterResult
    }

    filterDay = day => {
        let searchCaps = this.state.caps
        let filterDayResult = searchCaps.filter(filterCap => filterCap.day.includes(day))

        console.warn(filterDayResult);

        // return filterResult
    }

    handleSearch = resultCap => {
        let result = []
        result.push(resultCap)

        this.setState({
            visibleCaps: result,
            searchLocale: resultCap.local,
            hideResults: true,
            searching: true,
            region: {
                latitude: parseFloat(resultCap.latitude),
                longitude: parseFloat(resultCap.longitude),
                latitudeDelta: 0.002,
                longitudeDelta: 0.002
            }
        })
    }

    clearInput = () => {
        this.setState({ searchLocale: '', searching: false, hideResults: true })
        this.setCurrentPosition()
    }

    callAnimation = (isUp, callback) => {
        this.setState(
            () => {
                Animated.timing(
                    this.state.animatedValue,
                    {
                        toValue: isUp ? 0 : 400,
                        duration: 250,
                        easing: Easing.sin,
                        delay: 0
                    }
                ).start(callback || (() => {}))
            }
        )
    }

    cardToggleHandle = selectedCap => {
        if(!this.state.idCapSelected && selectedCap) {
            this.setState({ dataCapSelected: selectedCap, idCapSelected: selectedCap.id }, () => {
                this.callAnimation(true)
            })
        } else if(this.state.idCapSelected == selectedCap.id) {
            this.setState({ dataCapSelected: {}, idCapSelected: undefined }, () => {
                this.callAnimation(false)
            })
        } else if(this.state.idCapSelected != selectedCap.id) {
            this.callAnimation(false, () => {
                this.setState({ dataCapSelected: selectedCap, idCapSelected: selectedCap.id }, () => {
                    this.callAnimation(true)
                })
            })
        }
    }

    render() {
        const data = this.filterLocale(this.state.searchLocale);

        return (
            <Container>
                <MapView style={styles.map} region={this.state.region} showsUserLocation={true} >
                    {
                        this.state.searching == true ?
                            this.state.visibleCaps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} onPress={() => this.cardToggleHandle(cap)} pinColor="#f68121">
                                    <Callout>
                                        <Text>{cap.local}</Text>
                                    </Callout>
                                </Marker>
                            ))
                            :
                            this.state.caps.map(cap => (
                                <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} onPress={() => { this.cardToggleHandle(cap); this.setState({ region: { latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude), latitudeDelta: 0.03, longitudeDelta: 0.03 } }) }} pinColor="#f68121">
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
                            listContainerStyle={{ position: 'absolute', marginTop: 42, zIndex: 10 }}
                            renderItem={({ item, i }) => (
                                <TouchableOpacity style={styles.buttonItem} onPress={() => this.handleSearch(item)}>
                                    <Text style={{ fontSize: 16 }}>{item.local}</Text>
                                </TouchableOpacity>
                            )}
                            inputContainerStyle={styles.inputSearch}
                            placeholder="Digite o endereço / bairro / CEP da cap..." />

                        {this.state.searchLocale ?
                            <ButtonClose onPress={() => this.clearInput()}>
                                <Icon name="window-close" color="#fff" size={30} />
                            </ButtonClose>
                            :
                            <View></View>
                        }
                    </AutocompleteContainer>
                    <SelectContainer>
                        <Select>
                            <Picker style={styles.select} onValueChange={day => this.setState({ searchDay: day })} selectedValue={this.state.searchDay} >
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
                                <Picker.Item label="18h" value="" />
                                <Picker.Item label="18:30h" value="" />
                                <Picker.Item label="19:30h" value="" />
                                <Picker.Item label="20h" value="" />
                                <Picker.Item label="20:30h" value="" />
                            </Picker>
                        </Select>
                    </SelectContainer>
                </SearchContainer>

                <Animated.View style={[styles.card, { transform: [{ translateY: this.state.animatedValue }] }]}>
                    <View style={styles.viewBtn}>
                        <ButtonCloseCard onPress={() => this.setState({ dataCapSelected: {}, idCapSelected: undefined }, () => this.callAnimation(false) )}>
                            <Icon name="close-circle-outline" color="#f68121" size={25} />
                        </ButtonCloseCard>
                    </View>
                    <LargeInput>
                        <IconLocal name="location" color="#f68121" size={25} style={{ marginRight: 8 }} />
                        <TextLarge>{this.state.dataCapSelected.local}</TextLarge>
                    </LargeInput>
                    <MediumInput>
                        <TextMedim><Icon name="calendar-today" color="#f68121" size={25} /> {this.state.dataCapSelected.day}</TextMedim>
                        <TextMedim><Icon name="timer" color="#f68121" size={25} /> {this.state.dataCapSelected.hour}</TextMedim>
                    </MediumInput>
                    <LargeInput>
                        <Icon name="phone-classic" color="#f68121" size={25} style={{ marginRight: 8 }} />
                        <TextLarge>{this.state.dataCapSelected.telephone}</TextLarge>
                    </LargeInput>
                    <LargeInput>
                        <TextLarge>{`Líder: ${this.state.dataCapSelected.leader}`}</TextLarge>
                    </LargeInput>
                    <LargeInput>
                        <TextLarge>{`Supervisor: ${this.state.dataCapSelected.supervisor}`}</TextLarge>
                    </LargeInput>
                </Animated.View>
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
    },
    card: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        height: 200,
        bottom: 0,
        padding: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    viewBtn: {
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end'
    }
})