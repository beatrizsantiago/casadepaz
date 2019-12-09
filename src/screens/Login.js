import React, { useState, useEffect } from 'react'
import { Text, KeyboardAvoidingView, Alert, PermissionsAndroid, Platform, Image, Modal, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import UserService from '../services/UserService'

import StoreKeys from '../config/storeKeys'

import { Container, ViewModal } from './styles/MainStyled'
import { Header, Label, InputText, Button, Footer } from './styles/LoginStyled'
import Logo from '../assets/img/logo.png'

export default function LoginScreen(props) {

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		permissions()
	}, [])

	const permissions = async () => {
		if (Platform.OS = "android") {
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
			await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
		}
	}

	const errorLogin = () => Alert.alert('Atenção!', 'E-mail e/ou senha inválidos', [{ text: 'OK' }])

	const handleLogin = () => {
		if (!login || !password) {
			errorLogin()
		} else {
			setLoading(true)
			UserService.Login(login, password)
				.then(async uid => {
					setLogin(false)
					await AsyncStorage.setItem(StoreKeys.UidLogin, uid)
					props.navigation.navigate('App')
				})
		}
	}

	return (
		<Container>
			<KeyboardAvoidingView behavior="position" enabled>

				<Header>
					<Image style={{ width: 150, height: 170 }} source={Logo} />
				</Header>

				<Label>E-mail</Label>
				<InputText onChangeText={email => setLogin(email)} value={login} />

				<Label>Senha</Label>
				<InputText secureTextEntry onChangeText={password => setPassword(password)} value={password} />

				<Button onPress={handleLogin} >
					<Text style={{ fontSize: 20, color: '#fff' }}>LOGIN</Text>
				</Button>

				<Footer>
					<Text style={{ fontSize: 18 }}>Esqueceu a Senha?</Text>
				</Footer>

			</KeyboardAvoidingView>

			<Modal animationType="fade" transparent={true} visible={loading}>
				<ViewModal>
					<ActivityIndicator size="large" color="#fff" />
					<Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>Verificando Credenciais...</Text>
				</ViewModal>
			</Modal>
		</Container>
	)
}

LoginScreen.navigationOptions = ({ navigation }) => {
	return ({
		header: null
	})
}