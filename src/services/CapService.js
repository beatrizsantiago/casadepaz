import React from 'react'

import firebase from 'react-native-firebase'

export class CapService {
    register = (local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor) => {
        let cap = { local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor }

        firebase.firestore()
            .collection('caps').add(cap)
    }

    getCaps = async () => {
        // Com forEach
        // let returnCaps = [];
        // await firebase.firestore().collection('caps').onSnapshot(snapshot => {
        //     console.warn(snapshot);
        //     snapshot.forEach(item => {
        //         console.warn(item.data());
        //     })
        // });
        // return returnCaps

        // let returnCaps = [];
        // let caps = await firebase.firestore().collection('caps').get();
        // caps.docs.forEach(cap => {
        //     returnCaps.push({id: cap.id, ...cap.data()});
        // })
        // return returnCaps

        let caps = await firebase.firestore().collection('caps').get();
        return caps.docs.map(cap => ({id: cap.id, ...cap.data()}))

        // let caps = await firebase.firestore().collection('caps').onSnapshot();
        // return caps.map(cap => ({id: cap.id, ...cap.data()}))
    }

    numberCaps = async () => {
        let numCaps = await firebase.firestore().collection('caps').get()
        return numCaps.size
    }
}

export default new CapService()