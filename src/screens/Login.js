import React, { Component } from 'react';
import { Text } from 'react-native' 

import { Container } from './styles/MainStyled'
import { Header, Main, Label, InputText, Button, Footer } from './styles/LoginStyled'

export default class Login extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container>
                <Header />

                <Main>

                    <Label>E-mail</Label>
                    <InputText />

                    <Label>Senha</Label>
                    <InputText />

                    <Button onPress={() => this.props.navigation.navigate('App')} >
                        <Text style={{ fontSize: 20 }}>LOGIN</Text>
                    </Button>
                </Main>

                <Footer />
            </Container>
        );
    }
}