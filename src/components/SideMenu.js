import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Routes from '../config/navigation/routes'

import { Container, Header, Item, Title } from './styles/DrawerContainerStyled'

export default function SideNavigation(props) {

    const menuItemPressed = item => {
        props.navigation.navigate(item.id)
    }

    const renderMenuItem = item => (
        <Item key={item.id} onPress={() => menuItemPressed(item)}>
            <Icon name={item.icon} size={26} />
            <Title>{item.title}</Title>
        </Item>
    )

    const renderMenu = () => Routes.filter(route => !route.hide).map(renderMenuItem)

    logoutPress = () => {
        props.navigation.navigate('Login')
    }

    return (
        <Container>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderMenu()}
                <Item>
                    <Icon name="logout" size={26} />
                    <Title>Sair</Title>
                </Item>
            </ScrollView>
        </Container>
    )
}
