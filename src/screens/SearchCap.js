import React, { Component } from 'react'

import { View, Text, Picker, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconLocal from 'react-native-vector-icons/Entypo'

import CapService from '../services/CapService'

import { Container, SearchContainer, AutocompleteContainer, SelectContainer, Select, ButtonClose, ButtonCentralize, ButtonCloseSelect, ButtonCloseCard, LargeInput, TextLarge, MediumInput, TextMedim, IconsInput } from './styles/SearchCapStyled'

export default class SearchCap extends Component {

    state = {
        allCaps: [],
        listCaps: [],
        searchLocale: '',
        hideResults: true,
        searchDay: '',
        searchHour: '',
        inputEditable: true,
        viewSelects: true,
        animatedValue: new Animated.Value(400),
        idCapSelected: '',
        dataCapSelected: {},
        region: {
            latitude: 0.0,
            longitude: 0.0,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
        },
    }

    componentDidMount() {
        this.listAllCaps()
    }

    listAllCaps = () => {
        CapService.GetCaps(cap => {
            let oldCaps = this.state.allCaps
            oldCaps.push(cap)
            this.setState({ allCaps: oldCaps, listCaps: oldCaps })
        })

        this.setCurrentPosition()
    }

    setCurrentPosition = (lat, long, latD, longD) => {
        // Geolocation.getCurrentPosition(info => this.setState({
        //     region: {
        //         latitude: lat ? lat : info.coords.latitude,
        //         longitude: long ? long : info.coords.longitude,
        //         latitudeDelta: latD ? latD : 0.03,
        //         longitudeDelta: longD ? longD : 0.03
        //     }
        // }))

        this.setState({
            region: {
                latitude: lat ? lat : -3.7684145,
                longitude: long ? long : -38.5174,
                latitudeDelta: latD ? latD : 0.03,
                longitudeDelta: longD ? longD : 0.03
            }
        })
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
                ).start(callback || (() => { }))
            }
        )
    }

    cardToggleHandle = selectedCap => {
        if (!this.state.idCapSelected && selectedCap) {
            this.setState({ dataCapSelected: selectedCap, idCapSelected: selectedCap.id }, () => {
                this.callAnimation(true)
            })
        } else if (this.state.idCapSelected == selectedCap.id) {
            this.setState({ dataCapSelected: {}, idCapSelected: undefined }, () => {
                this.callAnimation(false)
            })
        } else if (this.state.idCapSelected != selectedCap.id) {
            this.callAnimation(false, () => {
                this.setState({ dataCapSelected: selectedCap, idCapSelected: selectedCap.id }, () => {
                    this.callAnimation(true)
                })
            })
        }
    }

    clearSelects = (day, hour) => {
        if (!day && !hour) {
            this.setState({ inputEditable: true, listCaps: this.state.allCaps })
            this.setCurrentPosition()

        } else if (day && !hour) {
            let filter = this.state.allCaps.filter(filterCap => filterCap.day == day)
            this.setState({ listCaps: filter })
            this.setCurrentPosition(null, null, 0.15, 0.15)

        } else if (!day && hour) {
            let filterCaps = this.state.allCaps.filter(filterCap => filterCap.hour == hour)
            this.setState({ listCaps: filterCaps })
            this.setCurrentPosition(null, null, 0.15, 0.15)
        }
    }

    handleSearchHour = value => {
        this.setState({ searchHour: value, inputEditable: false })
        this.callAnimation(false)

        if (!value) {
            this.clearSelects(this.state.searchDay, value)

        } else if (this.state.searchDay) {
            let filterCapsHour = this.state.allCaps.filter(filterCap => filterCap.day == this.state.searchDay && filterCap.hour == value)
            this.setState({ listCaps: filterCapsHour })
            this.setCurrentPosition(null, null, 0.15, 0.15)

        } else {
            let filterCapsHour = this.state.allCaps.filter(filterCap => filterCap.hour == value)
            this.setState({ listCaps: filterCapsHour })
            this.setCurrentPosition(null, null, 0.15, 0.15)
        }
    }

    handleSearchDay = value => {
        this.setState({ searchDay: value, inputEditable: false })
        this.callAnimation(false)

        if (!value) {
            this.clearSelects(value, this.state.searchHour)

        } else if (this.state.searchHour) {
            let filterCapsDay = this.state.allCaps.filter(filterCap => filterCap.day == value && filterCap.hour == this.state.searchHour)
            this.setState({ listCaps: filterCapsDay })
            this.setCurrentPosition(null, null, 0.15, 0.15)

        } else {
            let filterCapsDay = this.state.allCaps.filter(filterCap => filterCap.day == value)
            this.setState({ listCaps: filterCapsDay })
            this.setCurrentPosition(null, null, 0.15, 0.15)
        }
    }

    clearInput = () => {
        this.setState({ searchLocale: '', viewSelects: true, hideResults: true, listCaps: this.state.allCaps })
        this.callAnimation(false)
        this.setCurrentPosition()
    }

    handleSearch = resultCap => {
        this.setState({ listCaps: [resultCap], searchLocale: resultCap.local, viewSelects: false, hideResults: true })
        this.setCurrentPosition(parseFloat(resultCap.latitude), parseFloat(resultCap.longitude), 0.002, 0.002)
    }


    render() {
        const dataCaps = this.state.listCaps.filter(filterCap => filterCap.local.includes(this.state.searchLocale))
        return (
            <Container>
                <MapView region={this.state.region} style={{ flex: 1 }} showsUserLocation={true} showsMyLocationButton={false}>
                    {
                        this.state.listCaps.map(cap =>
                            <Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} onPress={() => { this.cardToggleHandle(cap); this.setState({ region: { latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude), latitudeDelta: this.state.region.latitudeDelta, longitudeDelta: this.state.region.longitudeDelta } }) }} pinColor="#f68121" >
                                <Callout>
                                    <Text>{cap.local}</Text>
                                </Callout>
                            </Marker>
                        )
                    }
                </MapView>
                <SearchContainer>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <AutocompleteContainer>
                            <Autocomplete
                                editable={this.state.inputEditable}
                                onBlur={() => this.setState({ hideResults: true })}
                                hideResults={this.state.hideResults}
                                data={dataCaps}
                                defaultValue={this.state.searchLocale}
                                onChangeText={text => this.setState({ searchLocale: text, hideResults: false })}
                                listContainerStyle={{ position: 'absolute', marginTop: 42, zIndex: 10 }}
                                renderItem={({ item, i }) => (
                                    <TouchableOpacity style={styles.buttonItem} onPress={() => this.handleSearch(item)}>
                                        <Text style={{ fontSize: 16 }}>{item.local}</Text>
                                    </TouchableOpacity>
                                )}
                                inputContainerStyle={[styles.inputSearch, { backgroundColor: this.state.inputEditable ? '#fff' : '#f0f0f0' }]}
                                style={{ height: 40, marginBottom: 2, backgroundColor: this.state.inputEditable ? '#fff' : '#f0f0f0' }}
                                placeholder="Digite o endereço / bairro / CEP da cap..." />

                            {
                                this.state.searchLocale ?
                                    <ButtonClose onPress={() => this.clearInput()}>
                                        <Icon name="window-close" color="#fff" size={30} />
                                    </ButtonClose>
                                    : null
                            }
                        </AutocompleteContainer>
                        <ButtonCentralize onPress={() => this.setCurrentPosition()}>
                            <Icon name="crosshairs-gps" color="#404040" size={30} />
                        </ButtonCentralize>
                    </View>

                    {this.state.viewSelects ?
                        <SelectContainer>
                            <Select>
                                <Picker style={styles.select} selectedValue={this.state.searchDay} onValueChange={value => this.handleSearchDay(value)} >
                                    <Picker.Item label="Dia" value="" />
                                    <Picker.Item label="Segunda" value="Segunda" />
                                    <Picker.Item label="Terça" value="Terca" />
                                    <Picker.Item label="Quarta" value="Quarta" />
                                    <Picker.Item label="Quinta" value="Quinta" />
                                    <Picker.Item label="Sexta" value="Sexta" />
                                    <Picker.Item label="Sábado" value="Sabado" />
                                    <Picker.Item label="Domingo" value="Domingo" />
                                </Picker>
                                {this.state.searchDay ?
                                    <ButtonCloseSelect onPress={() => this.handleSearchDay()}>
                                        <Icon name="window-close" color="#fff" size={30} />
                                    </ButtonCloseSelect>
                                    : null}
                            </Select>
                            <Select>
                                <Picker style={styles.select} selectedValue={this.state.searchHour} onValueChange={value => this.handleSearchHour(value)} >
                                    <Picker.Item label="Hora" value="" />
                                    <Picker.Item label="18h" value="18h" />
                                    <Picker.Item label="18:30h" value="18:30h" />
                                    <Picker.Item label="19h" value="19h" />
                                    <Picker.Item label="19:30h" value="19:30h" />
                                    <Picker.Item label="20h" value="20h" />
                                    <Picker.Item label="20:30h" value="20:30h" />
                                </Picker>
                                {this.state.searchHour ?
                                    <ButtonCloseSelect onPress={() => this.handleSearchHour()}>
                                        <Icon name="window-close" color="#fff" size={30} />
                                    </ButtonCloseSelect>
                                    : null}
                            </Select>
                        </SelectContainer>
                        : null}
                </SearchContainer>

                <Animated.View style={[styles.card, { transform: [{ translateY: this.state.animatedValue }] }]}>
                    <View style={styles.viewBtn}>
                        <ButtonCloseCard onPress={() => this.callAnimation(false)}>
                            <Icon name="minus" color="#f68121" size={40} />
                        </ButtonCloseCard>
                    </View>
                    <LargeInput>
                        <IconLocal name="location" color="#f68121" size={25} style={{ marginRight: 8 }} />
                        <TextLarge>{this.state.dataCapSelected.local}</TextLarge>
                    </LargeInput>
                    <MediumInput>
                        <Icon name="calendar-today" color="#f68121" size={25} />
                        <TextMedim>{this.state.dataCapSelected.day}</TextMedim>

                        <Icon name="timer" color="#f68121" size={25} />
                        <TextMedim>{this.state.dataCapSelected.hour}</TextMedim>
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
                    <IconsInput>
                        <TouchableOpacity>
                            <Icon name="square-edit-outline" color="#f68121" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="home-map-marker" color="#f68121" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="share-variant" color="#f68121" size={30} />
                        </TouchableOpacity>
                    </IconsInput>
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
        height: 240,
        bottom: 0,
        padding: 10,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    viewBtn: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    }
})