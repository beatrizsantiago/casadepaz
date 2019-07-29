import React, { Component } from 'react'
import { Picker, TimePickerAndroid, ScrollView } from "react-native"

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, Button, TextButton } from './styles/RegisterCapStyled'

export default class RegisterCap extends Component {

	state = {
		local: '',
		latitude: null,
		longitude: null,
		day: '',
		hour: '',
		minute: 0,
		telephone: '',
		leader: '',
		subLeader: '',
		houseOwner: '',
		supervisor: '',
	}

	setHour = async () => {

		const { hour, minute } = this.state;
		try {
			await TimePickerAndroid.open({
				hour: hour,
				minute: minute,
				is24Hour: true
			})

			console.warn(hour);

		} catch (e) {
			console.warn('Erro TimePicker: ', e)
		}
	}

	clearData = () => {
		this.setState({
			local: '',
			latitude: '',
			longitude: '',
			day: '',
			hour: '',
			minute: 0,
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
							<Picker onValueChange={day => this.setState({ day })} selectedValue={this.state.day} style={{ marginLeft: 12 }}>
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
							<InputText onChangeText={hour => this.setState({ hour })} value={this.state.hour} />
						</ColMediumInput>
					</MediumInput>

					<Label>Telefone</Label>
					<InputText onChangeText={telephone => this.setState({ telephone })} value={this.state.telephone} />

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