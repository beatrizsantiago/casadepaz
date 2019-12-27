import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Modal, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

import LeaderService from '../services/LeaderService'

import { Container, ViewModal } from './styles/MainStyled'
import { Label, InputText, Button, TextButton, RedText } from './styles/RegisterStyled'

export default function RegisterLeaderCap() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [loading, setLoading] = useState(false)
    const [textLoading, setTextLoading] = useState('')

    const showMessage = message => {
        Alert.alert('Atenção!', message, [{ text: 'Ok' }])
    }

    const clearData = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setName('')
        setTelephone('')
    }

    handlePressRegister = async () => {
        if (email == '') {
            return showMessage('Por favor, informe um e-mail válido.')
        } else if (password == '' || password.length < 6) {
            return showMessage('Por favor, informe uma senha válida.')
        } else if (confirmPassword != password) {
            return showMessage('A confirmação da senha não coincide com a senha.')
        } else if (name == '') {
            return showMessage('Por favor, informe o nome do(a) líder.')
        } else if (telephone == '') {
            return showMessage('Por favor, informe o telefone do(a) líder.')

        } else {
            setTextLoading('Cadastrando líder....')
            setLoading(true)
            LeaderService.RegisterLeader(email, password, name, telephone)
                .then(() => {
                    clearData()
                    setLoading(false)
                    return Alert.alert('Sucesso!', 'Líder cadastrado.', [{ text: 'Ok' }])
                })
                .catch(error => {
                    setLoading(false)

                    if (error.code == "auth/invalid-email") {
                        return Alert.alert('Falha!', 'O e-mail é inválido, certifique-se de que o digitou corretamente.', [{ text: 'Ok' }])

                    } else if (error.code == "auth/email-already-in-use") {
                        return Alert.alert('Falha!', 'O e-mail informado já está em uso.', [{ text: 'Ok' }])

                    }
                })
        }
    }

    return (
        <Container>
            <ScrollView>
                <Label>E-mail <RedText>*</RedText></Label>
                <InputText onChangeText={email => setEmail(email)} value={email} />

                <Label>Senha <Text style={{ fontSize: 14 }}>(mínimo de 6 caracteres)</Text> <RedText>*</RedText></Label>
                <InputText onChangeText={password => setPassword(password)} value={password} secureTextEntry />

                <Label>Confirmar Senha <RedText>*</RedText></Label>
                <InputText onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} value={confirmPassword} secureTextEntry />

                <Label>Nome <RedText>*</RedText></Label>
                <InputText onChangeText={name => setName(name)} value={name} />

                <Label>Telefone <RedText>*</RedText></Label>
                <TextInputMask style={styles.inputMask} type={'cel-phone'} options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }} onChangeText={telephone => setTelephone(telephone)} value={telephone} keyboardType="numeric" />

                <Button onPress={() => handlePressRegister()}>
                    <TextButton>Cadastrar</TextButton>
                </Button>
            </ScrollView>
            <Modal animationType="fade" transparent={true} visible={loading}>
                <ViewModal>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>{textLoading}</Text>
                </ViewModal>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    inputMask: {
        height: 40,
        marginHorizontal: 12,
        padding: 1,
        fontSize: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#9c9c9c',
    }
})