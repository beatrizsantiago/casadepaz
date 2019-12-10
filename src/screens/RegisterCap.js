import React, { useState } from 'react'
import { Picker, TimePickerAndroid, ScrollView, TouchableOpacity, Text, StyleSheet, Modal, ActivityIndicator, Alert } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInputMask } from 'react-native-masked-text'

import CapService from '../services/CapService'

import { Container, ViewModal } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, Button, TextButton, RowHour, RedText } from './styles/RegisterCapStyled'

export default function RegisterCap() {

	const [local, setLocal] = useState('')
	const [latitude, setLatitude] = useState(null)
	const [longitude, setLongitude] = useState(null)
	const [day, setDay] = useState('')
	const [hour, setHour] = useState('0:00h')
	const [telephone, setTelephone] = useState('')
	const [leader, setLeader] = useState('')
	const [subLeader, setSubLeader] = useState('')
	const [houseOwner, setHouseOwner] = useState('')
	const [supervisor, setSupervisor] = useState('')
	const [loading, setLoading] = useState(false)

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
		setTelephone('')
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
		} else if (telephone == '') {
			return showMessage('Por favor, insira um telefone.')
		} else if (leader == '') {
			return showMessage('Por favor, selecione o líder da Casa de Paz.')
		} else if (supervisor == '') {
			return showMessage('Por favor, selecione o supervisor da Casa de Paz.')
		} else {
			setLoading(true)

			let successRegister = await CapService.Register(local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor)

			if (successRegister) {
				clearData()
				setLoading(false)
				return Alert.alert('Sucesso!', 'Casa de Paz cadastrada.', [{ text: 'Ok' }])
			}
		}
	}

	return (
		<Container>
			<ScrollView>
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
							<Picker.Item label="Terça" value="Terca" />
							<Picker.Item label="Quarta" value="Quarta" />
							<Picker.Item label="Quinta" value="Quinta" />
							<Picker.Item label="Sexta" value="Sexta" />
							<Picker.Item label="Sábado" value="Sabado" />
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

				<Label>Telefone <RedText>*</RedText></Label>
				<TextInputMask style={styles.inputMask} type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }} onChangeText={telephone => setTelephone(telephone)} value={telephone} keyboardType="numeric" />

				<Label>Líder <RedText>*</RedText></Label>
				<InputText onChangeText={leader => setLeader(leader)} value={leader} />

				<Label>Sublíder</Label>
				<InputText onChangeText={subLeader => setSubLeader(subLeader)} value={subLeader} />

				<Label>Anfitrião</Label>
				<InputText onChangeText={houseOwner => setHouseOwner(houseOwner)} value={houseOwner} />

				<Label>Supervisor <RedText>*</RedText></Label>
				<InputText onChangeText={supervisor => setSupervisor(supervisor)} value={supervisor} />

				<Button onPress={() => handlePressRegister()}>
					<TextButton>Cadastrar</TextButton>
				</Button>
			</ScrollView>
			<Modal animationType="fade" transparent={true} visible={loading}>
				<ViewModal>
					<ActivityIndicator size="large" color="#fff" />
					<Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>Cadastrando Casa de Paz...</Text>
				</ViewModal>
			</Modal>
		</Container>
	)
}

const styles = StyleSheet.create({
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
	}
})