import React, { Component } from 'react';
import { View, ScrollView, Text, Modal, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFeather from 'react-native-vector-icons/Feather'
import ImageViewer from 'react-native-image-zoom-viewer'
import moment from 'moment'

import CapService from '../services/CapService'
import FeedbackService from '../services/FeedbackService'

import { ContainerGray } from './styles/MainStyled'
import { Row, Column, RowBar, BigBox, Circle, MediumBoxWhite, MediumBoxOrange, CircleMedim, LargeBox, HeaderBox, CardScroll, LeftBoxCard, Gallery, BoxEmptyImage } from './styles/DashboardStyled';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {

	state = {
		numberCaps: 0,
		feedbackCap: [],
		today: new Date(),
		lastWeek: new Date(),
		cardData: {
			quantityPeople: 0,
			quantityConversion: 0,
			quantityMiracles: 0,
			images: []
		},
		isImageViewVisible: false,
		urlImages: []
	}

	componentDidMount() {
		this.listInformation()
	}

	listInformation = () => {
		CapService.NumberActiveCaps(quantityCaps => {
			this.setState({ numberCaps: quantityCaps });
		})

		let today = new Date()
		let lastWeek = new Date()
		lastWeek.setDate(today.getDate() - 7)

		this.setState({ today, lastWeek })

		FeedbackService.GetInformationPeriod(lastWeek, today, feedback => {
			this.setState({ cardData: feedback })
		})
	}

	createObjectUrlsImages = () => {
		let urls = []

		this.state.cardData.images.map(img => {
			if(img) {
				urls.push({ url: img })
			}
		})

		this.setState({ urlImages: urls })
	}

	showImages = () =>
		<Modal visible={this.state.isImageViewVisible} transparent={true}>
			<ImageViewer
				imageUrls={this.state.urlImages}
				enableSwipeDown={true}
				onSwipeDown={() => this.setState({ isImageViewVisible: false })}
			/>
		</Modal>

	render() {
		const { today } = this.state
		const { lastWeek } = this.state
		const { cardData } = this.state

		return (
			<ContainerGray>
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
					<Text style={{ fontSize: 15, textTransform: "uppercase", color: '#000' }}>Informações de <Text style={{ fontWeight: 'bold' }}>{moment(lastWeek).format('DD/MM/YYYY')}</Text> à <Text style={{ fontWeight: 'bold' }}>{moment(today).format('DD/MM/YYYY')}</Text></Text>
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
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<Icon name="ios-people" color="#f68121" size={50} />
								<Text style={{ fontSize: 22, textTransform: "uppercase", color: '#000', marginLeft: 10 }}>{cardData.quantityPeople} pessoas</Text>
							</View>
						</LargeBox>
					</Row>
					<Row>
						<CardScroll>
							<LeftBoxCard>
								<Icon name="ios-images" size={30} color="#fff" />
							</LeftBoxCard>
							{this.state.cardData.images.length > 0 ?
								<Gallery horizontal={true}>
									{this.state.cardData.images.map((image, index) => {
										if (image) {
											return <Image key={index} style={{ width: 300, height: '100%', marginRight: 5 }} source={{ uri: image }} />
										}
									})}
								</Gallery>
								:
								<BoxEmptyImage>
									<IconFeather name="camera-off" size={32} color="#969696" />
									<Text style={{ color: '#969696', fontSize: 16 }}>Nenhum upload de</Text>
									<Text style={{ color: '#969696', fontSize: 16 }}>foto nessa semana!</Text>
								</BoxEmptyImage>
							}
						</CardScroll>
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
				{this.showImages()}
			</ContainerGray>
		);
	}
}