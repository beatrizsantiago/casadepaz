import React from 'react';

import firebase from 'react-native-firebase'

export class UserService {

    login = (email, password) => (
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
    )

    logout = () => firebase.auth().signOut()
    
}

export default new UserService()