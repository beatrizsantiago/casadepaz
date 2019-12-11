import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LeaderService from '../services/LeaderService'

import { ContainerGray } from './styles/MainStyled'
import { LeaderCard, LargeField, TextField, ViewButtons, ButtonAlter, ButtonRemove } from './styles/ListLeaderStyled'

export default class ListLeaderCap extends Component {
    state = {
        leaders: [{
            id: 1,
            name: "Ana Beatriz Santiago dos Santos",
            email: 'bia@email.com',
            telephone: '(00) 00000-0000'
        }],
        loading: true
    }

    componentDidMount() {

        LeaderService.GetAllLeaders()

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    render() {
        return (
            <ContainerGray>
                {
                    this.state.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#f68121" />
                        </View>
                        :
                        <ScrollView style={{ flex: 1, width: '100%' }}>
                            {
                                this.state.leaders.map(leader => (
                                    <LeaderCard key={leader.id}>
                                        <LargeField>
                                            <Icon name="account-circle" color="#f68121" size={30} />
                                            <TextField>{leader.name}</TextField>
                                        </LargeField>
                                        <LargeField>
                                            <Icon name="email" color="#f68121" size={30} />
                                            <TextField>{leader.email}</TextField>
                                        </LargeField>
                                        <LargeField>
                                            <Icon name="phone" color="#f68121" size={30} />
                                            <TextField>{leader.telephone}</TextField>
                                        </LargeField>
                                        <ViewButtons>
                                            <ButtonRemove>
                                                <Text style={{ fontSize: 20, color: '#f68121', marginLeft: 5 }}>Excluir</Text>
                                            </ButtonRemove>
                                            <ButtonAlter>
                                                <Text style={{ fontSize: 20, color: '#fff' }}>Alterar</Text>
                                            </ButtonAlter>
                                        </ViewButtons>
                                    </LeaderCard>
                                ))
                            }
                        </ScrollView>
                }
            </ContainerGray>
        )
    }
}