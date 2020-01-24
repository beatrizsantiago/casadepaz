import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField } from './styles/ListCapsStyled'

export default Feedback = (props) => {

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

    const handlePress = cap => {
        props.navigation.navigate('Listar Feedbacks', { capId: cap.id, leader: cap.leader.name, subLeader: cap.subLeader, supervisor: cap.supervisor })
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
                    <ScrollView style={{ flex: 1, width: '100%' }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {
                            caps.map(cap => (
                                <CapCard key={cap.id} onPress={() => handlePress(cap)}>
                                    <LargeField>
                                        <Icon name="home-map-marker" color="#f68121" size={30} />
                                        <Text style={{ fontSize: 18, width: '88%' }}>{cap.local}</Text>
                                    </LargeField>
                                    <LargeField>
                                        <Icon name="account-circle" color="#f68121" size={30} />
                                        <Text style={{ fontSize: 18, width: '88%' }}>{cap.leader.name}</Text>
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
            }
        </ContainerGray>
    )
}