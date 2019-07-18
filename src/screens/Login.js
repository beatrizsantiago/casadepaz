import React, { Component } from 'react';
import { Text, KeyboardAvoidingView } from 'react-native'

import { Container } from './styles/MainStyled'
import { Header, Label, InputText, Button, Footer } from './styles/LoginStyled'

export default class Login extends Component {

    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <Container>
                <KeyboardAvoidingView behavior="position" enabled>

                    <Header />

                    <Label>E-mail</Label>
                    <InputText />

                    <Label>Senha</Label>
                    <InputText secureTextEntry />

                    <Button onPress={() => this.props.navigation.navigate('App')} >
                        <Text style={{ fontSize: 20 }}>LOGIN</Text>
                    </Button>

                    <Footer>
                        <Text style={{ fontSize: 18 }}>Esqueceu a Senha?</Text>
                    </Footer>

                </KeyboardAvoidingView>
            </Container>
        );
    }
}