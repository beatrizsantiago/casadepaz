import React, { Component } from 'react';
import { Text, KeyboardAvoidingView, Alert } from 'react-native'

import UserService from '../services/UserService'
import firebase from 'react-native-firebase'

import { Container } from './styles/MainStyled'
import { Header, Label, InputText, Button, Footer } from './styles/LoginStyled'

export default class Login extends Component {

    state = {
        login: '',
        password: ''
    }

    static navigationOptions = {
        header: null,
    }

    validateLogin = () => (
        Alert.alert(
            'Atenção!',
            'E-mail e/ou senha inválidos',
            [{ text: 'OK', onPress: () => this.props.navigation.pop() }],
            { cancelable: false }
        )
    )

    handleLogin = async () => {
        const { email, password } = this.state;

        try {

            if (!email || !password) {
                this.validateLogin()
            } else {
                await UserService.login(email, password)
                    .then(() => this.props.navigation.navigate('App'))
                    .catch(() => this.validateLogin)
            }

        } catch (e) {
            console.warn("Erro login: ", e);
        }
    }

    render() {
        return (
            <Container>
                <KeyboardAvoidingView behavior="position" enabled>

                    <Header />

                    <Label>E-mail</Label>
                    <InputText onChangeText={email => this.setState({ email })} value={this.state.email} />

                    <Label>Senha</Label>
                    <InputText secureTextEntry onChangeText={password => this.setState({ password })} value={this.state.password} />

                    <Button onPress={this.handleLogin} >
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