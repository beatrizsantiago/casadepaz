import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField, ViewButtons, ButtonEnable, ButtonDisable } from './styles/ListCapsStyled'

export default ListCaps = (props) => {

    const [caps, setCaps] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false)

    useEffect(() => {
        listAllCaps()
    }, [])

    const listAllCaps = () => {
        CapService.GetCaps()
            .then(caps => {
                setCaps(caps)
                setLoading(false)
            })
    }

    const enableOrDisableCap = (idCap, bool) => {
        setLoading(true)
        CapService.UpdateStateCap(idCap, bool)
            .then(() => {
                listAllCaps()
                setLoading(false)
            })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        listAllCaps()
        setRefreshing(false)
    }, [refreshing])

    return (
        <ContainerGray>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f68121" />
                    </View>
                    :
                    <ScrollView style={{ flex: 1, width: '100%' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                        {
                            caps.map(cap => (
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
                                            <ButtonDisable onPress={() => enableOrDisableCap(cap.id, false)}>
                                                <Text style={{ fontSize: 18, color: '#f68121' }}>Desativar</Text>
                                            </ButtonDisable>
                                            :
                                            <ButtonEnable onPress={() => enableOrDisableCap(cap.id, true)}>
                                                <Text style={{ fontSize: 18, color: '#fff' }}>Ativar</Text>
                                            </ButtonEnable>
                                        }
                                        <ButtonEnable onPress={() => props.navigation.push('Cadastrar Cap', { capId: cap.id })}>
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