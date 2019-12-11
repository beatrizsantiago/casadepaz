import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LeaderService from '../services/LeaderService'

import { ContainerGray } from './styles/MainStyled'
import { LeaderCard, LargeField, TextField, ViewButtons, ButtonEnable, ButtonDisable } from './styles/ListLeaderStyled'

export default class ListLeaderCap extends Component {
    state = {
        leaders: [],
        loading: true
    }

    componentDidMount() {
        this.listLeader()
    }

    listLeader() {
        LeaderService.GetAllLeaders(leader => {
            let oldLeaders = this.state.leaders
            oldLeaders.push(leader)
            this.setState({ leaders: oldLeaders })
        })

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    enableOrDisableLeader = (idDoc, bool) => {
        LeaderService.UpdateStateLeader(idDoc, bool)
        this.listLeader()
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
                                    <LeaderCard key={leader.UID}>
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
                                        {leader.active ?
                                            <ViewButtons>
                                                <ButtonDisable onPress={() => this.enableOrDisableLeader(leader.id, false)}>
                                                    <Text style={{ fontSize: 18, color: '#f68121' }}>Desativar</Text>
                                                </ButtonDisable>
                                            </ViewButtons>
                                            :
                                            <ViewButtons>
                                                <ButtonEnable onPress={() => this.enableOrDisableLeader(leader.id, true)}>
                                                    <Text style={{ fontSize: 18, color: '#fff' }}>Ativar</Text>
                                                </ButtonEnable>
                                            </ViewButtons>
                                        }
                                    </LeaderCard>
                                ))
                            }
                        </ScrollView>
                }
            </ContainerGray>
        )
    }
}