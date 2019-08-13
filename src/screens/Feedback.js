import React, { Component } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Container, CapCard, LargeField, MediumField } from './styles/FeedbackStyled'

export default class Feedback extends Component {
    render() {
        return (
            <Container>
                <ScrollView>
                <CapCard>
                    <LargeField>
                        <Icon name="home-map-marker" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Rua dos bobos, 0 - Sapiranga, Fortaleza CE</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="account-circle" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Alvo Percival Dumbledore</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="calendar-clock" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>09/08/2019 às 19:30h</Text>
                    </LargeField>
                </CapCard>
                <CapCard>
                    <LargeField>
                        <Icon name="home-map-marker" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Rua dos bobos, 0 - Sapiranga, Fortaleza CE</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="account-circle" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Alvo Percival Dumbledore</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="calendar-clock" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>09/08/2019 às 19:30h</Text>
                    </LargeField>
                </CapCard>
                <CapCard>
                    <LargeField>
                        <Icon name="home-map-marker" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Rua dos bobos, 0 - Sapiranga, Fortaleza CE</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="account-circle" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Alvo Percival Dumbledore</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="calendar-clock" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>09/08/2019 às 19:30h</Text>
                    </LargeField>
                </CapCard>
                <CapCard>
                    <LargeField>
                        <Icon name="home-map-marker" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Rua dos bobos, 0 - Sapiranga, Fortaleza CE</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="account-circle" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>Alvo Percival Dumbledore</Text>
                    </LargeField>
                    <LargeField>
                        <Icon name="calendar-clock" color="#f68121" size={30} />
                        <Text style={{ fontSize: 18, width: '88%' }}>09/08/2019 às 19:30h</Text>
                    </LargeField>
                </CapCard>
                </ScrollView>
            </Container>
        )
    }
}