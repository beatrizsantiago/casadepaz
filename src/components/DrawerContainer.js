import React from 'react'

import { Container, Header, Item, Title } from './styles/DrawerContainerStyled'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default DrawerContainer = ({ navigation }) => {

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
        </Container>
    )
}