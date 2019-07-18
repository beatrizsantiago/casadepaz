import React from 'react'
import { Picker, ScrollView } from "react-native"

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, Button, TextButton } from './styles/RegisterCapStyled'

export default RegisterCap = () => (
	<Container>
		<ScrollView>
			<Label>Local</Label>
			<InputText />

			<MediumInput>
				<ColMediumInput>
					<Label>Dia</Label>
					<Picker style={{ marginLeft: 12 }}>
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
					<InputText />
				</ColMediumInput>
			</MediumInput>

			<Label>Telefone</Label>
			<InputText />

			<Label>Líder</Label>
			<InputText />

			<Label>Sublíder</Label>
			<InputText />

			<Label>Anfitrião</Label>
			<InputText />

			<Label>Supervisor</Label>
			<InputText />

			<Button>
				<TextButton>Cadastrar</TextButton>
			</Button>
		</ScrollView>
	</Container>
);