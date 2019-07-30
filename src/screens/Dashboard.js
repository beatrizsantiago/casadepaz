import React, { Component } from 'react';
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

import CapService from '../services/CapService'

import { Container, Row, Column, BigBox, Circle, MediumBox, LargeBox } from './styles/DashboardStyled';

export default class Dashboard extends Component {

	state = {
		numberCaps: 0
	}

	componentDidMount() {
		CapService.numberCaps(quantityCaps => {
			this.setState({ numberCaps: quantityCaps});
		})
	}

	render() {
		return (
			<Container>
				<Row>
					<BigBox>
						<Circle>
							<Icon name="ios-home" color="#fff" size={60} />
						</Circle>
						<Column>
							<Text style={{ fontSize: 15, textTransform: "uppercase" }}>Quantidade: </Text>
							<Text style={{ fontSize: 30 }}>{this.state.numberCaps} Casas de Paz</Text>
						</Column>
					</BigBox>
				</Row>
				<Row>
					<MediumBox />
					<MediumBox />
				</Row>
				<Row>
					<LargeBox />
				</Row>
				<Row>
					<MediumBox />
					<MediumBox />
				</Row>
			</Container>
		);
	}
}