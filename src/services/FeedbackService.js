import React from 'react'

import firebase from 'react-native-firebase'

export class FeedbackService {

    getAllInformation = () => {

    }

    getInformationPeriod = (initialDate, finalDate, callback) => {
        firebase.firestore().collection('feedback').where('dateCap', '>', initialDate).where('dateCap', '<=', finalDate).onSnapshot(snapshot => {
            let cap = 0
            snapshot.forEach(info => {
                cap = cap + info.data().quantityPeople
            })
            callback(cap)
        })
    }
}

export default new FeedbackService()