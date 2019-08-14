import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { ContainerGray } from './styles/MainStyled'
import { BigCard, Row, CardLeft, CardRight, LargeCard, Circle, ItemIcon, TextCard, SimpleCard, HeaderCard } from './styles/FeedbackDetailsStyled'

export default class FeedbackDetails extends Component {
    render() {
        return (
            <ContainerGray>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <BigCard>
                        <Text style={{ fontSize: 15 }}>Líder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Annabeth Chase</Text></Text>
                        <Text style={{ fontSize: 15 }}>Sublíder: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Hermione Grange</Text></Text>
                        <Text style={{ fontSize: 15 }}>Supervisor: <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Gina Weasley</Text></Text>
                    </BigCard>
                    <Row>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="users" size={22} color="#f68121" />
                            </ItemIcon>
                            <TextCard>10 pessoas</TextCard>
                        </CardLeft>
                        <CardLeft>
                            <ItemIcon>
                                <Icon name="bar-chart-2" size={25} color="#f68121" />
                            </ItemIcon>
                            <TextCard>10 Conversões</TextCard>
                        </CardLeft>
                    </Row>
                    <LargeCard>
                        <Circle>
                            <Icon name="feather" size={22} color="#f68121" />
                        </Circle>
                        <TextCard>10 milagres</TextCard>
                    </LargeCard>
                    <SimpleCard>
                        <HeaderCard>
                            <Text style={{ fontSize: 14, textTransform: "uppercase", color: '#fff', fontWeight: 'bold', marginVertical: 2 }}>Descrição dos Milagres</Text>
                        </HeaderCard>
                        <Text style={{ margin: 4 }}>Descrição dos Milagres</Text>
                    </SimpleCard>
                </ScrollView>
            </ContainerGray>
        )
    }
}