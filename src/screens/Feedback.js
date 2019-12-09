import React, { Component } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedbackService from '../services/FeedbackService'
import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField } from './styles/FeedbackStyled'

export default class Feedback extends Component {

    state = {
        caps: [],
        feedbacks: [],
    }

    componentDidMount() {
        CapService.GetCaps(cap => {
            let oldCaps = this.state.caps
            oldCaps.push(cap)
            this.setState({ caps: oldCaps })
        })

        FeedbackService.GetAllInformation(feedback => {
            let resp = this.state.feedbacks
            resp.push(feedback)
            this.setState({ feedbacks: resp })
        })
    }

    handlePress = idCap => {
        let filterFeedback = this.state.feedbacks
        let filterResult = filterFeedback.filter(filterFeedback => filterFeedback.idRefCap.includes(idCap))
        
        this.props.navigation.navigate('FeedbackList', {feedbacks: filterResult})
    }

    render() {
        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    {
                        this.state.caps.map(cap => (
                            <CapCard key={cap.id} onPress={() => this.handlePress(cap.id)}>
                                <LargeField>
                                    <Icon name="home-map-marker" color="#f68121" size={30} />
                                    <Text style={{ fontSize: 18, width: '88%' }}>{cap.local}</Text>
                                </LargeField>
                                <LargeField>
                                    <Icon name="account-circle" color="#f68121" size={30} />
                                    <Text style={{ fontSize: 18, width: '88%' }}>{cap.leader}</Text>
                                </LargeField>
                                <LargeField>
                                    <Icon name="calendar-multiselect" color="#f68121" size={30} />
                                    <Text style={{ fontSize: 18, width: '37%' }}>{cap.day}</Text>
                                    <Icon name="clock-outline" color="#f68121" size={30} />
                                    <Text style={{ fontSize: 18, width: '37%' }}>{cap.hour}</Text>
                                </LargeField>
                            </CapCard>
                        ))
                    }
                </ScrollView>
            </ContainerGray>
        )
    }
}