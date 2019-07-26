import React from 'react'

import firebase from 'react-native-firebase'

export class CapService {
    register = (local, day, hour, telephone, leader, subLeader, houseOwner, supervisor) => {
        let cap = { local, day, hour, telephone, leader, subLeader, houseOwner, supervisor }

        firebase.firestore()
            .collection('caps').add(cap)
            .then(() => console.warn("Cap inserida"))
            .catch(e => console.warn("Erro: ", e))
    }

    getCaps = () => {
        let caps = firebase.firestore().collection('cards').get()
        console.warn(caps);
    }
}

export default new CapService()