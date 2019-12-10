import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'

import { ContainerGray } from './styles/MainStyled'
import { DateFeedbackCard, EmptyFeedback, TextEmptyFeedback } from './styles/FeedbackListStyled'

export default function FeedbackList(props) {

    const [feedbacksCap, setFeedbacksCap] = useState([])

    useEffect(() => {
        const { feedbacks } = props.navigation.state.params
        setFeedbacksCap(feedbacks)
    }, [])

    const handlePress = feedback => {
        props.navigation.navigate('FeedbackDetails', { feedback })
    }

    return (
        <ContainerGray>
            {
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
                                    <Text style={{ fontSize: 16 }}>{moment(feedback.dateFeedback.seconds * 1000).format('DD/MM/YYYY [às] HH:MM')}</Text>
                                    <Icon name="arrow-right" size={16} color="#f68121" />
                                </DateFeedbackCard>
                            ))
                        }
                    </ScrollView>
            }
        </ContainerGray>
    )
}