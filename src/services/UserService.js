import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

export async function Login(email, password) {
    try {
        let dataLogin = await firebase.auth()
            .signInWithEmailAndPassword(email, password)

        return dataLogin.user.uid

    } catch (error) {
        console.warn("Error Login: ", error);
        throw error
    }
}

export async function Logout() {
    try {
        await AsyncStorage.clear()
        await firebase.auth().signOut()
        return true

    } catch (error) {
        console.warn("Error Logout: ", error);
        throw error
    }
}

export default { Login, Logout }