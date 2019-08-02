import React, { Component } from 'react'
import { Picker, TimePickerAndroid, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInputMask } from 'react-native-masked-text'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, Button, TextButton, RowHour } from './styles/RegisterCapStyled'

export default class RegisterCap extends Component {

	state = {
		local: '',
		latitude: null,
		longitude: null,
		day: '',
		hour: '00:00h',
		telephone: '',
		leader: '',
		subLeader: '',
		houseOwner: '',
		supervisor: '',
	}

	setHour = async () => {
		const { action, hour, minute } = await TimePickerAndroid.open({
			hour: hour,
			minute: minute,
			is24Hour: true,
		})

		if (action === TimePickerAndroid.timeSetAction) {
			this.setState({ hour: `${hour}:${minute}h` })
		} 
	}

	clearData = () => {
		this.setState({
			local: '',
			latitude: '',
			longitude: '',
			day: '',
			hour: '00:00h',
			telephone: '',
			leader: '',
			subLeader: '',
			houseOwner: '',
			supervisor: '',
		})
	}

	handlePressRegister = async () => {
		const { local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor } = this.state

		await CapService.register(local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor)
		this.clearData()
	}

	render() {
		return (
			<Container>
				<ScrollView>
					<Label>Local</Label>
					<InputText onChangeText={local => this.setState({ local })} value={this.state.local} />

					<MediumInput>
						<ColMediumInput>
							<Label>Latitude</Label>
							<InputText onChangeText={latitude => this.setState({ latitude })} value={this.state.latitude} />
						</ColMediumInput>

						<ColMediumInput>
							<Label>Longitude</Label>
							<InputText onChangeText={longitude => this.setState({ longitude })} value={this.state.longitude} />
						</ColMediumInput>
					</MediumInput>

					<MediumInput>
						<ColMediumInput>
							<Label>Dia</Label>
							<Picker onValueChange={day => this.setState({ day })} selectedValue={this.state.day} style={{ marginLeft: 12, fontSize: 20 }}>
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
							<Label>Hora</Label>
							<RowHour>
								<Text style={{ fontSize: 20 }}>{this.state.hour}</Text>
								<TouchableOpacity onPress={() => this.setHour()} style={styles.hourButton}>
									<Icon name="md-time" size={35} color="#fff" />
								</TouchableOpacity>
							</RowHour>
						</ColMediumInput>
					</MediumInput>

					<Label>Telefone</Label>
					<TextInputMask style={styles.inputMask} type={'cel-phone'} options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}} onChangeText={telephone => this.setState({ telephone })} value={this.state.telephone} keyboardType="numeric" />

					<Label>Líder</Label>
					<InputText onChangeText={leader => this.setState({ leader })} value={this.state.leader} />

					<Label>Sublíder</Label>
					<InputText onChangeText={subLeader => this.setState({ subLeader })} value={this.state.subLeader} />

					<Label>Anfitrião</Label>
					<InputText onChangeText={houseOwner => this.setState({ houseOwner })} value={this.state.houseOwner} />

					<Label>Supervisor</Label>
					<InputText onChangeText={supervisor => this.setState({ supervisor })} value={this.state.supervisor} />

					<Button onPress={() => this.handlePressRegister()}>
						<TextButton>Cadastrar</TextButton>
					</Button>
				</ScrollView>
			</Container>
		)
	}

};

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