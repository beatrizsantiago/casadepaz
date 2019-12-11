import React from 'react'
import { Alert } from 'react-native'

import UserService from '../services/UserService'

import { Container, Header, Item, Title } from './styles/DrawerContainerStyled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default DrawerContainer = ({ navigation }) => {

    logout = async () => {
        await UserService.Logout()
            .then(() => navigation.navigate('Login'))
    }

    handlePress = () => {
        Alert.alert(
            'Atenção!',
            'Realmente deseja sair do aplicativo?',
            [
                { text: 'Cancelar', onPress: () => navigation.navigate('Dashboard') },
                { text: 'OK', onPress: () => this.logout() },
            ],
            { cancelable: true }
        )
    }

    return (
        <Container>
            <Header />
            <Item onPress={() => navigation.navigate('Dashboard')}>
                <Icon name="view-dashboard-outline" size={32} color="#000" />
                <Title>Dashboard</Title>
            </Item>
            <Item onPress={() => navigation.navigate('SearchCap')}>
                <Icon name="map-search-outline" size={32} color="#000" />
                <Title>Pesquisar Cap</Title>
            </Item>
            <Item onPress={() => navigation.navigate('RegisterCap')}>
                <Icon name="pin-outline" size={32} color="#000" />
                <Title>Cadastrar Cap</Title>
            </Item>
            <Item onPress={() => navigation.navigate('Feedback')}>
                <Icon name="ballot-recount-outline" size={32} color="#000" />
                <Title>Feedback</Title>
            </Item>
            <Item onPress={() => navigation.navigate('ListLeader')}>
                <Icon name="account-settings" size={32} color="#000" />
                <Title>Líder de Cap</Title>
            </Item>
            <Item onPress={this.handlePress}>
                <Icon name="logout" size={32} color="#000" />
                <Title>Sair</Title>
            </Item>
        </Container>
    )
}