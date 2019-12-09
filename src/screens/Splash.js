import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

import Logo from '../assets/img/logo_cap.png'

export default class Splash extends Component {
    async componentDidMount() {
        let hasUser = await AsyncStorage.getItem(StoreKeys.UidLogin)
        
        if(hasUser) {
            this.props.navigation.navigate('App')
        } else {
            this.props.navigation.navigate('Login')
        }
    }

    static navigationOptions = {
        header: null,
    }

    render = () => (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 23,
        width: 320,
        height: 170,
    }
})