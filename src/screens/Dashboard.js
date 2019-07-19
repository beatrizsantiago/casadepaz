import React, { Component } from 'react';
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

import { Container, Row, BigBox, Circle, MediumBox, LargeBox } from './styles/DashboardStyled';

export default class Dashboard extends Component {

	render() {
		return (
			<Container>
				<Row>
					<BigBox>
						<Circle>
							<Icon name="ios-home" color="#fff" size={60} />
						</Circle>
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