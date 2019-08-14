import React, { Component } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

import { ContainerGray } from './styles/MainStyled'
import { DateFeedbackCard } from './styles/FeedbackListStyled'

export default class FeedbackList extends Component {

    state = {
        feedbacks: []
    }

    componentDidMount() {
        const { feedbacks } = this.props.navigation.state.params
        this.setState({ feedbacks })
    }

    handlePress = feedback => {
        this.props.navigation.navigate('FeedbackDetails', { feedback })
    }

    render() {
        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    {
                        this.state.feedbacks.map(feedback => (
                            <DateFeedbackCard key={feedback.id} onPress={() => this.handlePress(feedback)}>
                                <Text style={{ fontSize: 16 }}>{moment(feedback.dateFeedback.seconds*1000).format('DD/MM/YYYY [às] HH:MM')}</Text>
                                <Icon name="arrow-right" size={16} color="#f68121" />
                            </DateFeedbackCard>
                        ))
                    }
                </ScrollView>
            </ContainerGray>
        )
    }
}