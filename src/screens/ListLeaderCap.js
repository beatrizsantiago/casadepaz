import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LeaderService from '../services/LeaderService'

import { ContainerGray } from './styles/MainStyled'
import { LeaderCard, ViewImageProfile, ViewInfo, LargeField, TextField, ViewButtons, ButtonEnable, ButtonDisable } from './styles/ListLeaderStyled'

export default ListLeaderCap = () => {

    const [leaders, setLeaders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        listLeader()
    }, [])

    const listLeader = () => {
        LeaderService.GetAllLeaders()
            .then(listLeaders => {
                setLeaders(listLeaders)
                setLoading(false)
            })
    }

    const enableOrDisableLeader = (idDoc, bool) => {
        LeaderService.UpdateStateLeader(idDoc, bool)
            .then(() => listLeader())
    }

    return (
        <ContainerGray>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f68121" />
                    </View>
                    :
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        {
                            leaders.map(leader => (
                                <LeaderCard key={leader.UID}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <ViewImageProfile>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: leader.photoProfile || 'https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png' }} />
                                        </ViewImageProfile>
                                        <ViewInfo>
                                            <LargeField>
                                                <Icon name="account" color="#f68121" size={30} />
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
                                        </ViewInfo>
                                    </View>
                                    {leader.active ?
                                        <ViewButtons>
                                            <ButtonDisable onPress={() => enableOrDisableLeader(leader.id, false)}>
                                                <Text style={{ fontSize: 18, color: '#f68121' }}>Desativar</Text>
                                            </ButtonDisable>
                                        </ViewButtons>
                                        :
                                        <ViewButtons>
                                            <ButtonEnable onPress={() => enableOrDisableLeader(leader.id, true)}>
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