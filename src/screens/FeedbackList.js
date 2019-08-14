import React, { Component } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/SimpleLineIcons'

import { ContainerGray } from './styles/MainStyled'
import { DateFeedbackCard } from './styles/FeedbackListStyled'

export default class FeedbackList extends Component {
    render() {
        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                    <DateFeedbackCard>
                        <Text style={{ fontSize: 16 }}>00/00/00 00:00h</Text>
                        <Icon name="arrow-right" size={16} color="#f68121" />
                    </DateFeedbackCard>
                </ScrollView>
            </ContainerGray>
        )
    }
}