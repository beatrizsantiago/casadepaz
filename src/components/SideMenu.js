import React, { useState, useEffect } from 'react'
import { View, ScrollView, Alert, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NetInfo from "@react-native-community/netinfo"

import UserService from '../services/UserService'

import Routes from '../config/navigation/routes'
import { Container, Header, Item, Title } from './styles/DrawerContainerStyled'

export default function SideNavigation(props) {

    logout = async () => {
        let net = await NetInfo.fetch()
        if (net.isConnected) {
            await UserService.Logout()
                .then(() => props.navigation.navigate('Login'))
        } else {
            return Alert.alert('Atenção!', 'O aplicativo está offline. É necessário conexão com a internet.', [{ text: 'OK' }])
        }
    }

    handlePress = () => {
        Alert.alert(
            'Atenção!',
            'Realmente deseja sair do aplicativo?',
            [
                { text: 'Cancelar', onPress: () => props.navigation.navigate('Dashboard') },
                { text: 'OK', onPress: () => logout() },
            ],
            { cancelable: true }
        )
    }

    const menuItemPressed = async item => {
        let net = await NetInfo.fetch()
        if (net.isConnected) {
            props.navigation.navigate(item.id)
        } else {
            return Alert.alert('Atenção!', 'O aplicativo está offline. É necessário conexão com a internet.', [{ text: 'OK' }])
        }
    }

    const renderMenuItem = item => (
        <Item key={item.id} onPress={() => menuItemPressed(item)}>
            <Icon name={item.icon} size={26} />
            <Title>{item.title}</Title>
        </Item>
    )

    const renderMenu = () => Routes.filter(route => !route.hide).map(renderMenuItem)

    return (
        <Container>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderMenu()}
                <Item onPress={() => this.handlePress()}>
                    <Icon name="logout" size={26} />
                    <Title>Sair</Title>
                </Item>
            </ScrollView>
        </Container>
    )
}
