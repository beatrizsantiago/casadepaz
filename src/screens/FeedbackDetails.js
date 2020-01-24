import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Collapsible from 'react-native-collapsible'
import ImageViewer from 'react-native-image-zoom-viewer'

import { ContainerGray, ButtonCloseModal } from './styles/MainStyled'
import { BigCard, Row, CardLeft, LargeCard, Circle, ItemIcon, TextCard, SimpleCard, HeaderCard, Description, ImgCard, ButtonClose } from './styles/FeedbackDetailsStyled'

export default function FeedbackDetails(props) {

    const [collapsed, setCollapsed] = useState(true)
    const [dataFeedback, setDataFeedback] = useState({})
    const [isImageViewVisible, setIsImageViewVisible] = useState(false)
    const [imageSource, setImageSource] = useState([])

    useEffect(() => {
        const { feedback } = props.navigation.state.params
        setDataFeedback(feedback)
        setImageSource([{ url: feedback.photoCap }])
    }, [])

    const showImage = () => imageSource ?
        <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer
                imageUrls={imageSource}
                enableSwipeDown={true}
                onSwipeDown={() => setIsImageViewVisible(false)}
            />
            <ButtonCloseModal onPress={() => setIsImageViewVisible(false)}>
				<IconIonicon name="ios-close-circle" size={32} color="#fff" />
			</ButtonCloseModal>
        </Modal> : null

    const toggleExpanded = () => setCollapsed(!collapsed)

    return (
        <ContainerGray>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <BigCard>
                    <Text style={{ fontSize: 15 }}>Líder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{dataFeedback.dataLeader ? dataFeedback.dataLeader.name : ''}</Text></Text>
                    {dataFeedback.subLeader ? <Text style={{ fontSize: 15 }}>Sublíder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{dataFeedback.subLeader}</Text></Text> : null}
                    <Text style={{ fontSize: 15 }}>Supervisor: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{dataFeedback.supervisor}</Text></Text>
                </BigCard>
                <Row>
                    <CardLeft>
                        <ItemIcon>
                            <Icon name="users" size={22} color="#f68121" />
                        </ItemIcon>
                        <TextCard>{dataFeedback.quantityPeople} pessoas</TextCard>
                    </CardLeft>
                    <CardLeft>
                        <ItemIcon>
                            <Icon name="bar-chart-2" size={25} color="#f68121" />
                        </ItemIcon>
                        <TextCard>{dataFeedback.quantityConversion} Conversões</TextCard>
                    </CardLeft>
                </Row>
                {
                    dataFeedback.quantityMiracles > 0 ?
                        <View>
                            <LargeCard>
                                <Circle>
                                    <IconFontAwesome name="smile-o" size={30} color="#f68121" />
                                </Circle>
                                <TextCard>{dataFeedback.quantityMiracles} {dataFeedback.quantityMiracles == 1 ? 'milagre' : 'milagres'}</TextCard>
                            </LargeCard>
                            <SimpleCard>
                                <HeaderCard onPress={() => toggleExpanded()}>
                                    <Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold' }}>Descrição do(s) Milagre(s)</Text>
                                    <IconIonicon name={collapsed ? "ios-arrow-down" : "ios-arrow-up"} size={22} color="#fff" />
                                </HeaderCard>
                                <Collapsible style={{ backgroundColor: '#fff' }} collapsed={collapsed} duration={500}>
                                    <Description>{dataFeedback.descriptionMiracles ? dataFeedback.descriptionMiracles : "Não há nenhuma descrição"}</Description>
                                </Collapsible>
                            </SimpleCard>
                        </View>
                        :
                        <LargeCard>
                            <Circle>
                                <Icon name="alert-triangle" size={22} color="#f68121" />
                            </Circle>
                            <TextCard>Não houve milagre hoje!</TextCard>
                        </LargeCard>
                }
                <ImgCard>
                    {
                        dataFeedback.photoCap ?
                            <TouchableOpacity onPress={() => setIsImageViewVisible(true)} style={{ width: '100%', height: 200 }}>
                                <Image style={{ width: '100%', height: 200 }} source={{ uri: dataFeedback.photoCap }} />
                            </TouchableOpacity>
                            :
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <IconIonicon name="ios-images" color="#969696" size={20} />
                                <Text style={{ color: '#969696', fontSize: 15 }}> Nenhuma foto foi registrada!</Text>
                            </View>
                    }
                </ImgCard>

                {showImage()}
            </ScrollView>
        </ContainerGray>
    )
}