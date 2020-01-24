import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'

import FeedbackService from '../services/FeedbackService'

import { ContainerGray } from './styles/MainStyled'
import { DateFeedbackCard, EmptyFeedback, TextEmptyFeedback } from './styles/FeedbackListStyled'

export default function FeedbackList(props) {

    const [feedbacksCap, setFeedbacksCap] = useState([])
    const [loading, setLoading] = useState(true)

    const { capId, leader, subLeader, supervisor } = props.navigation.state.params

    useEffect(() => {
        FeedbackService.GetAllInformation(capId)
            .then(feedbacks => {
                setFeedbacksCap(feedbacks)
                setLoading(false)
            })
    }, [])

    const handlePress = feedback => {
        props.navigation.navigate('Detalhes do Feedback', { capId, leader, subLeader, supervisor, feedback })
    }

    return (
        <ContainerGray>

            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f68121" />
                    </View>
                    :
                    feedbacksCap.length == 0 ?
                        <EmptyFeedback>
                            <IconAntDesign name="exception1" size={100} color="#c7c7c7" style={{ marginBottom: 5 }} />
                            <TextEmptyFeedback>Ainda não há feedback</TextEmptyFeedback>
                            <TextEmptyFeedback>para esta Casa de Paz!</TextEmptyFeedback>
                        </EmptyFeedback>
                        :
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            {
                                feedbacksCap.map(feedback => (
                                    <DateFeedbackCard key={feedback.id} onPress={() => handlePress(feedback)}>
                                        <Text style={{ fontSize: 16 }}>{moment(feedback.dateFeedback.seconds * 1000).format('DD/MM/YYYY [às] hh:mm')}</Text>
                                        <Icon name="arrow-right" size={16} color="#f68121" />
                                    </DateFeedbackCard>
                                ))
                            }
                        </ScrollView>
            }
        </ContainerGray>
    )
}