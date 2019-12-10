import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Modal, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Collapsible from 'react-native-collapsible'
import ImageViewer from 'react-native-image-zoom-viewer'

import { ContainerGray } from './styles/MainStyled'
import { BigCard, Row, CardLeft, LargeCard, Circle, ItemIcon, TextCard, SimpleCard, HeaderCard, Description, ImgCard, ButtonClose } from './styles/FeedbackDetailsStyled'
import { } from 'react-native-gesture-handler'

export default function FeedbackDetails(props) {

    const [collapsed, setCollapsed] = useState(true)
    const [feedback, setFeedback] = useState({})
    const [isImageViewVisible, setIsImageViewVisible] = useState(false)
    const [imageSource, setImageSource] = useState([])

    useEffect(() => {
        const { feedback } = props.navigation.state.params
        setFeedback(feedback)
        setImageSource([{ url: feedback.photoCap }])
    }, [])

    const showImage = () => imageSource ?
        <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer
                imageUrls={imageSource}
                enableSwipeDown={true}
                onSwipeDown={() => setIsImageViewVisible(false)}
            />
        </Modal> : null

    const toggleExpanded = () => {
        setCollapsed(!collapsed)
    }

    return (
        <ContainerGray>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <BigCard>
                    <Text style={{ fontSize: 15 }}>Líder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.leader}</Text></Text>
                    {feedback.subLeader ? <Text style={{ fontSize: 15 }}>Sublíder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.subLeader}</Text></Text> : null}
                    <Text style={{ fontSize: 15 }}>Supervisor: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{feedback.supervisor}</Text></Text>
                </BigCard>
                <Row>
                    <CardLeft>
                        <ItemIcon>
                            <Icon name="users" size={22} color="#f68121" />
                        </ItemIcon>
                        <TextCard>{feedback.quantityPeople} pessoas</TextCard>
                    </CardLeft>
                    <CardLeft>
                        <ItemIcon>
                            <Icon name="bar-chart-2" size={25} color="#f68121" />
                        </ItemIcon>
                        <TextCard>{feedback.quantityConversion} Conversões</TextCard>
                    </CardLeft>
                </Row>
                {
                    feedback.quantityMiracles > 0 ?
                        <View>
                            <LargeCard>
                                <Circle>
                                    <IconFontAwesome name="smile-o" size={30} color="#f68121" />
                                </Circle>
                                <TextCard>{feedback.quantityMiracles} milagres</TextCard>
                            </LargeCard>
                            <SimpleCard>
                                <HeaderCard onPress={() => toggleExpanded()}>
                                    <Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold' }}>Descrição dos Milagres</Text>
                                    <IconIonicon name={collapsed ? "ios-arrow-down" : "ios-arrow-up"} size={22} color="#fff" />
                                </HeaderCard>
                                <Collapsible style={{ backgroundColor: '#fff' }} collapsed={collapsed} duration={500}>
                                    <Description>{feedback.descriptionMiracles ? feedback.descriptionMiracles : "Não há nenhuma descrição"}</Description>
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
                        feedback.photoCap ?
                            <TouchableOpacity onPress={() => setIsImageViewVisible(true)} style={{ width: '100%', height: 200 }}>
                                <Image style={{ width: '100%', height: 200 }} source={{ uri: feedback.photoCap }} />
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