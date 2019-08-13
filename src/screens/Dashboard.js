import React, { Component } from 'react';
import { View, ScrollView, Text, Animated  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'

import CapService from '../services/CapService'
import FeedbackService from '../services/FeedbackService'

import { Container, Row, Column, RowBar, BigBox, Circle, MediumBoxWhite, MediumBoxOrange, CircleMedim, LargeBox, HeaderBox } from './styles/DashboardStyled';

export default class Dashboard extends Component {

	state = {
		numberCaps: 0,
		feedbackCap: [],
		today: new Date(),
		lastWeek: new Date(),
		cardData: {
			quantityPeople: 0,
			quantityConversion: 0,
			quantityMiracles: 0
		}
	}

	componentDidMount() {
		CapService.numberCaps(quantityCaps => {
			this.setState({ numberCaps: quantityCaps });
		})

		let today = new Date()
		let lastWeek = new Date()
		lastWeek.setDate(today.getDate() - 7)

		this.setState({ today, lastWeek })

		FeedbackService.getInformationPeriod(lastWeek, today, feedback => {
			this.setState({ cardData : feedback })
		})
	}

	render() {
		const { today } = this.state
		const { lastWeek } = this.state
		const { cardData } = this.state
		
		return (
			<Container>
				<Row>
					<BigBox>
						<Circle>
							<Icon name="ios-home" color="#fff" size={60} />
						</Circle>
						<Column>
							<Text style={{ fontSize: 35 }}>{this.state.numberCaps}</Text>
							<Text style={{ fontSize: 20, textTransform: "uppercase" }}>Casas de Paz </Text>
						</Column>
					</BigBox>
				</Row>
				<RowBar>
					<Text style={{ fontSize: 15, textTransform: "uppercase", color: '#000' }}>Informações de <Text style={{ fontWeight: 'bold' }}>{`${lastWeek.getDate()}/${lastWeek.getMonth() + 1}/${lastWeek.getFullYear()}`}</Text> à <Text style={{ fontWeight: 'bold' }}>{`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</Text></Text>
				</RowBar>


				<ScrollView>
					<Row>
						<MediumBoxOrange>
							<Row>
								<CircleMedim>
									<IconAnt name="linechart" color="#fff" size={35} />
								</CircleMedim>
								<Column>
									<Text style={{ fontSize: 22, color: '#fff' }}>{cardData.quantityConversion}</Text>
									<Text style={{ fontSize: 12, textTransform: "uppercase", color: '#fff' }}>conversões</Text>
								</Column>
							</Row>
						</MediumBoxOrange>
						<MediumBoxOrange>
							<Row>
								<CircleMedim>
									<IconAnt name="barschart" color="#fff" size={40} />
								</CircleMedim>
								<Column>
									<Text style={{ fontSize: 22, color: '#fff' }}>{cardData.quantityMiracles}</Text>
									<Text style={{ fontSize: 12, textTransform: "uppercase", color: '#fff' }}>milagres</Text>
								</Column>
							</Row>
						</MediumBoxOrange>
					</Row>
					<Row>
						<LargeBox>
							<HeaderBox>
								<Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold' }}>N° de Frequentadores das Cap's</Text>
							</HeaderBox>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
								<Icon name="ios-people" color="#f68121" size={50} />
								<Text style={{ fontSize: 22, textTransform: "uppercase", color: '#000', marginLeft: 10 }}>{cardData.quantityPeople} pessoas</Text>
							</View>
						</LargeBox>
					</Row>
					<Row>
						<MediumBoxWhite />
						<MediumBoxWhite />
					</Row>
					<Row>
						<MediumBoxWhite />
						<MediumBoxWhite />
					</Row>
					<Row>
						<LargeBox />
					</Row>
					<Row>
						<LargeBox />
					</Row>
				</ScrollView>
			</Container>
		);
	}
}