import React, { useState, useEffect } from 'react'
import { View, Picker, TimePickerAndroid, ScrollView, TouchableOpacity, Text, StyleSheet, Modal, ActivityIndicator, Alert } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import IconSimple from 'react-native-vector-icons/SimpleLineIcons'
import Autocomplete from 'react-native-autocomplete-input'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import RNGooglePlaces from 'react-native-google-places'

import CapService from '../services/CapService'
import LeaderService from '../services/LeaderService'

import { ContainerGray, ViewModal } from './styles/MainStyled'
import { Label, InputText, ViewAutoComplete, MediumInput, ColMediumInput, Button, TextButton, RowHour, RedText, ViewButtons, ButtonBack, ButtonAlter } from './styles/RegisterStyled'

export default function RegisterCap(props) {

	const [local, setLocal] = useState('')
	const [latitude, setLatitude] = useState(null)
	const [longitude, setLongitude] = useState(null)
	const [day, setDay] = useState('')
	const [hour, setHour] = useState('0:00h')
	const [listLeaders, setListLeaders] = useState([])
	const [leader, setLeader] = useState('')
	const [dataLeader, setDataLeader] = useState({})
	const [subLeader, setSubLeader] = useState('')
	const [houseOwner, setHouseOwner] = useState('')
	const [supervisor, setSupervisor] = useState('')
	const [loading, setLoading] = useState(false)
	const [textLoading, setTextLoading] = useState('')
	const [capIdEdit, setCapIdEdit] = useState(null)
	const [hideResults, setHideResults] = useState(true)
	const [place, setPlace] = useState('')

	useEffect(() => {
		listDataEdit()
		listAllLeaders()
	}, [])

	const listDataEdit = () => {
		if (props.navigation.state.params) {
			setTextLoading('Buscando dados...')
			setLoading(true)

			const { capId } = props.navigation.state.params
			CapService.GetDataCap(capId).then(cap => {
				setLocal(cap.dataCap.local)
				setLatitude(cap.dataCap.latitude)
				setLongitude(cap.dataCap.longitude)
				setDay(cap.dataCap.day)
				setHour(cap.dataCap.hour)
				setLeader(cap.leader.name)
				setSubLeader(cap.dataCap.subLeader)
				setHouseOwner(cap.dataCap.houseOwner)
				setSupervisor(cap.dataCap.supervisor)
				setCapIdEdit(cap.dataCap.id)
				setLoading(false)
			})
		}
	}

	const listAllLeaders = () => {
		LeaderService.GetActiveLeaders()
			.then(resp => setListLeaders(resp))
	}

	const showMessage = message => {
		Alert.alert('Atenção!', message, [{ text: 'Ok' }])
	}

	const changeSetHour = async () => {
		const { action, hour, minute } = await TimePickerAndroid.open({
			hour: hour,
			minute: minute,
			is24Hour: true,
		})

		if (action === TimePickerAndroid.timeSetAction) {
			setHour(`${hour}:${minute == 0 ? '00' : minute}h`)
		}
	}

	const clearData = () => {
		setLocal('')
		setLatitude('')
		setLongitude('')
		setDay('')
		setHour('0:00h')
		setLeader('')
		setSubLeader('')
		setHouseOwner('')
		setSupervisor('')
	}

	const handlePressRegister = async () => {
		if (local == '') {
			return showMessage('O campo "Local" não pode estar vazio. Por favor, preencha-o.')
		} else if (day == '') {
			return showMessage('Por favor, selecione o dia da Casa de Paz.')
		} else if (hour == '0:00h') {
			return showMessage('Por favor, informe a hora da Casa de Paz.')
		} else if (leader == '') {
			return showMessage('Por favor, selecione o líder da Casa de Paz.')
		} else if (supervisor == '') {
			return showMessage('Por favor, selecione o supervisor da Casa de Paz.')

		} else if (capIdEdit) {
			setTextLoading('Alterando Casa de Paz...')
			setLoading(true)

			let successEdit = await CapService.UpdateCap(capIdEdit, local, latitude, longitude, day, hour, dataLeader, subLeader, houseOwner, supervisor)

			if (successEdit) {
				props.navigation.goBack()
				setLoading(false)
				return Alert.alert('Sucesso!', 'Casa de Paz alterada.', [{ text: 'Ok' }])
			}
		} else {
			setTextLoading('Cadastrando Casa de Paz...')
			setLoading(true)

			let successRegister = await CapService.Register(local, latitude, longitude, day, hour, dataLeader, subLeader, houseOwner, supervisor)

			if (successRegister) {
				clearData()
				setLoading(false)
				return Alert.alert('Sucesso!', 'Casa de Paz cadastrada.', [{ text: 'Ok' }])
			}
		}
	}

	const handlePressLeader = resultLeader => {
		setDataLeader(resultLeader)
		setLeader(resultLeader.name)
		setHideResults(true)
	}

	const dataLeaders = listLeaders.filter(filter => filter.name.includes(leader))

	const openSearchModal = () => {
		RNGooglePlaces.openAutocompleteModal({ useOverlay: true })
			.then((place) => {
				setPlace(place)

				// this.setState({ place: place })
				// this._map.fitToCoordinates([{ latitude: place.latitude, longitude: place.longitude }], {
				// 	edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
				// 	animated: true,
				// });
				console.warn(place)
			})
			.catch(error => console.warn(error.message));
	}

	return (
		<ContainerGray>
			{/* <Text numberOfLines={1} style={{ color: '#acbcbb', fontSize: 14 }} onPress={() => openSearchModal()}>
				{place ? place.name : 'Press to pick a place'}
			</Text>
			<GooglePlacesAutocomplete
				placeholder='Search'
				minLength={2} // minimum length of text to search
				autoFocus={true}
				fetchDetails={true}
				onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
					console.warn(data);
					console.warn(details);
				}}
				getDefaultValue={() => {
					return ''; // text input default value
				}}
				query={{
					key: 'AIzaSyDM2GFtFcYVci3s_P1UGOs8NLAnsQTbrZg',
					language: 'en', // language of the results
				}}
				styles={{
					description: {
						fontWeight: 'bold',
					},
					predefinedPlacesDescription: {
						color: '#1faadb',
					},
				}}

				currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
				currentLocationLabel="Current location"
				nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
				GooglePlacesSearchQuery={{
					rankby: 'distance',
					types: 'food',
				}}
				GooglePlacesDetailsQuery={{
					fields: 'formatted_address',
				}}

				filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

				predefinedPlacesAlwaysVisible={true}
			/> */}

			<ViewAutoComplete>
				<Label>Líder <RedText>*</RedText></Label>
			</ViewAutoComplete>
			<Autocomplete
				onBlur={() => setHideResults(true)}
				hideResults={hideResults}
				data={dataLeaders}
				defaultValue={leader}
				onChangeText={text => { setLeader(text); setHideResults(false) }}
				listContainerStyle={{ position: 'absolute', width: '97%', left: '-48.5%', marginTop: 42, zIndex: 100 }}
				renderItem={({ item, i }) => (
					<TouchableOpacity style={styles.buttonItem} onPress={() => handlePressLeader(item)}>
						<Text style={{ fontSize: 16 }}>{item.name}</Text>
					</TouchableOpacity>
				)}
				inputContainerStyle={styles.inputAutoContainer}
				style={styles.inputAutoComplete}
			/>

			<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
				<Label>Local <RedText>*</RedText></Label>
				<InputText onChangeText={local => setLocal(local)} value={local} />

				<MediumInput>
					<ColMediumInput>
						<Label>Latitude</Label>
						<InputText onChangeText={latitude => setLatitude(latitude)} value={latitude} />
					</ColMediumInput>

					<ColMediumInput>
						<Label>Longitude</Label>
						<InputText onChangeText={longitude => setLongitude(longitude)} value={longitude} />
					</ColMediumInput>
				</MediumInput>

				<MediumInput>
					<ColMediumInput>
						<Label>Dia <RedText>*</RedText></Label>
						<Picker onValueChange={day => setDay(day)} selectedValue={day} style={{ marginLeft: 12, fontSize: 20 }}>
							<Picker.Item label="Selecione" value="" />
							<Picker.Item label="Segunda" value="Segunda" />
							<Picker.Item label="Terça" value="Terça" />
							<Picker.Item label="Quarta" value="Quarta" />
							<Picker.Item label="Quinta" value="Quinta" />
							<Picker.Item label="Sexta" value="Sexta" />
							<Picker.Item label="Sábado" value="Sábado" />
							<Picker.Item label="Domingo" value="Domingo" />
						</Picker>
					</ColMediumInput>

					<ColMediumInput>
						<Label>Hora <RedText>*</RedText></Label>
						<RowHour>
							<Text style={{ fontSize: 20 }}>{hour}</Text>
							<TouchableOpacity onPress={() => changeSetHour()} style={styles.hourButton}>
								<Icon name="md-time" size={35} color="#fff" />
							</TouchableOpacity>
						</RowHour>
					</ColMediumInput>
				</MediumInput>

				<Label>Sublíder</Label>
				<InputText onChangeText={subLeader => setSubLeader(subLeader)} value={subLeader} />

				<Label>Anfitrião</Label>
				<InputText onChangeText={houseOwner => setHouseOwner(houseOwner)} value={houseOwner} />

				<Label>Supervisor <RedText>*</RedText></Label>
				<InputText onChangeText={supervisor => setSupervisor(supervisor)} value={supervisor} />

				{
					!capIdEdit ?
						<Button onPress={() => handlePressRegister()}>
							<TextButton>Cadastrar</TextButton>
						</Button>
						:
						<ViewButtons>
							<ButtonBack onPress={() => props.navigation.goBack()}>
								<IconSimple name="arrow-left" size={18} color="#f68121" />
								<Text style={{ fontSize: 20, color: '#f68121', marginLeft: 5 }}>Voltar</Text>
							</ButtonBack>
							<ButtonAlter onPress={() => handlePressRegister()}>
								<Text style={{ fontSize: 20, color: '#fff' }}>Alterar</Text>
							</ButtonAlter>
						</ViewButtons>
				}
				<Modal animationType="fade" transparent={true} visible={loading}>
					<ViewModal>
						<ActivityIndicator size="large" color="#fff" />
						<Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>{textLoading}</Text>
					</ViewModal>
				</Modal>
			</ScrollView>
		</ContainerGray>
	)
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		width: '97%',
		position: 'absolute',
		top: 106,
		left: '1.5%',
		bottom: 0,
		right: 0,
		backgroundColor: '#fff'
	},
	inputMask: {
		height: 40,
		marginHorizontal: 12,
		padding: 1,
		fontSize: 20,
		borderBottomWidth: 2,
		borderBottomColor: '#9c9c9c',
	},
	hourButton: {
		backgroundColor: '#f68121',
		paddingHorizontal: 5,
		paddingVertical: 2,
		borderRadius: 4
	},
	buttonItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#e8e8e8'
	},
	inputAutoComplete: {
		position: 'relative',
		height: 42,
		borderBottomColor: '#9c9c9c',
		borderBottomWidth: 2,
		backgroundColor: '#fff',
		fontSize: 20,
		marginBottom: 10,
	},
	inputAutoContainer: {
		position: 'absolute',
		left: '-48.5%',
		width: '97%',
		paddingHorizontal: 10,
		backgroundColor: '#fff',
		borderColor: '#fff',
	},
})