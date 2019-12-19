import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField, ViewButtons, ButtonEnable, ButtonDisable } from './styles/ListCapsStyled'

export default class ListCaps extends Component {
    state = {
        caps: [],
        loading: true
    }

    componentDidMount() {
        this.listAllCaps()
    }

    listAllCaps() {
        CapService.GetCaps(cap => {
            let oldCaps = this.state.caps
            oldCaps.push(cap)
            this.setState({ caps: oldCaps })
        })

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    enableOrDisableCap = (idCap, bool) => {
        CapService.UpdateStateCap(idCap, bool)
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
                                this.state.caps.map(cap => (
                                    <CapCard key={cap.id}>
                                        <LargeField>
                                            <Icon name="home-map-marker" color="#f68121" size={30} />
                                            <Text style={{ fontSize: 18, width: '88%' }}>{cap.local}</Text>
                                        </LargeField>
                                        <LargeField>
                                            <Icon name="account-circle" color="#f68121" size={30} />
                                            <Text style={{ fontSize: 18, width: '88%' }}>{cap.leader.name}</Text>
                                        </LargeField>

                                        <ViewButtons>
                                            {cap.active ?
                                                <ButtonDisable onPress={() => this.enableOrDisableCap(cap.id, false)}>
                                                    <Text style={{ fontSize: 18, color: '#f68121' }}>Desativar</Text>
                                                </ButtonDisable>
                                                :
                                                <ButtonEnable onPress={() => this.enableOrDisableCap(cap.id, true)}>
                                                    <Text style={{ fontSize: 18, color: '#fff' }}>Ativar</Text>
                                                </ButtonEnable>
                                            }
                                            <ButtonEnable onPress={() => this.props.navigation.push('Cadastrar Cap', { capId: cap.id })}>
                                                <Text style={{ fontSize: 18, color: '#fff' }}>Editar</Text>
                                            </ButtonEnable>
                                        </ViewButtons>
                                    </CapCard>
                                ))
                            }
                        </ScrollView>
                }
            </ContainerGray>
        )
    }
}