import React, { Component } from 'react'
import { View, ScrollView, Text, Modal, Image, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFeather from 'react-native-vector-icons/Feather'
import ImageViewer from 'react-native-image-zoom-viewer'
import moment from 'moment'

import CapService from '../services/CapService'
import FeedbackService from '../services/FeedbackService'
import LeaderService from '../services/LeaderService'

import { ContainerGray, ButtonCloseModal } from './styles/MainStyled'
import {
	Row, Column, RowBar, BigBox, Circle, MediumBoxWhite, MediumBoxOrange, CircleMedim, CircleMediumOrange, LargeBox, HeaderBox, CardScroll,
	LeftBoxCard, Gallery, BoxEmptyImage, TitleInfo, TitleQuantity, SubtitleQuantity, TitleQuantityOrange, SubtitleQuantityOrange, TitleHeaderBox, TitleBox
} from './styles/DashboardStyled'

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
			images: [],
			quantityFeedbacks: 0
		},
		urlImages: [],
		indexImageVisible: 0,
		isImageViewVisible: false,
		numberActiveLeaders: 0,
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
			this.createObjectUrlsImages()
		})

		LeaderService.GetNumberActiveLeaders()
			.then(resp => this.setState({ numberActiveLeaders: resp  }))
	}

	createObjectUrlsImages = () => {
		let urls = []

		this.state.cardData.images.map(img => {
			if (img) {
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
				index={this.state.indexImageVisible}
			/>
			<ButtonCloseModal onPress={() => this.setState({ isImageViewVisible: false })}>
				<IconAnt name="closecircle" size={26} color="#fff" />
			</ButtonCloseModal>
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
					<TitleInfo>Informações de <Text style={{ fontWeight: 'bold' }}>{moment(lastWeek).format('DD/MM/YYYY')}</Text> à <Text style={{ fontWeight: 'bold' }}>{moment(today).format('DD/MM/YYYY')}</Text></TitleInfo>
				</RowBar>

				<ScrollView showsVerticalScrollIndicator={false}>
					<Row>
						<MediumBoxOrange>
							<CircleMedim>
								<IconAnt name="linechart" color="#fff" size={35} />
							</CircleMedim>
							<Column>
								<TitleQuantity>{cardData.quantityConversion}</TitleQuantity>
								<SubtitleQuantity>conversões</SubtitleQuantity>
							</Column>
						</MediumBoxOrange>
						<MediumBoxOrange>
							<CircleMedim>
								<IconAnt name="barschart" color="#fff" size={40} />
							</CircleMedim>
							<Column>
								<TitleQuantity>{cardData.quantityMiracles}</TitleQuantity>
								<SubtitleQuantity>milagres</SubtitleQuantity>
							</Column>
						</MediumBoxOrange>
					</Row>
					<Row>
						<LargeBox>
							<HeaderBox>
								<TitleHeaderBox>N° de Frequentadores das Cap's</TitleHeaderBox>
							</HeaderBox>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<Icon name="ios-people" color="#f68121" size={50} />
								<TitleBox>{cardData.quantityPeople} pessoas</TitleBox>
							</View>
						</LargeBox>
					</Row>
					<Row>
						<CardScroll>
							<LeftBoxCard>
								<Icon name="ios-images" size={30} color="#fff" />
							</LeftBoxCard>
							{this.state.urlImages.length > 0 ?
								<Gallery horizontal={true}>
									{this.state.urlImages.map((image, index) =>
										<TouchableOpacity key={index} onPress={() => this.setState({ indexImageVisible: index, isImageViewVisible: true })}>
											<Image style={{ width: 300, height: '100%', marginRight: 5 }} source={{ uri: image.url }} />
										</TouchableOpacity>
									)}
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
						<MediumBoxWhite>
							<CircleMediumOrange>
								<IconAnt name="retweet" color="#f68121" size={35} />
							</CircleMediumOrange>
							<Column>
								<TitleQuantityOrange>{cardData.quantityFeedbacks}</TitleQuantityOrange>
								<SubtitleQuantityOrange>Feedbacks</SubtitleQuantityOrange>
							</Column>
						</MediumBoxWhite>
						<MediumBoxWhite>
							<CircleMediumOrange>
								<IconAnt name="user" color="#f68121" size={35} />
							</CircleMediumOrange>
							<Column>
								<TitleQuantityOrange>{this.state.numberActiveLeaders}</TitleQuantityOrange>
								<SubtitleQuantityOrange>Líderes Ativos</SubtitleQuantityOrange>
							</Column>
						</MediumBoxWhite>
					</Row>
				</ScrollView>
				{this.showImages()}
			</ContainerGray>
		);
	}
}