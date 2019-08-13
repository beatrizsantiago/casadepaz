import React from 'react'

import firebase from 'react-native-firebase'

export class FeedbackService {

    getAllInformation = () => {

    }

    getInformationPeriod = (initialDate, finalDate, callback) => {
        firebase.firestore().collection('feedback').where('dateFeedback', '>', initialDate).where('dateFeedback', '<=', finalDate).onSnapshot(snapshot => {
            let quantityPeople = 0
            let quantityMiracles = 0
            let quantityConversion = 0
            snapshot.forEach(info => {
                quantityPeople += info.data().quantityPeople
                quantityMiracles += info.data().quantityMiracles
                quantityConversion += info.data().quantityConversion
            })
            callback({quantityPeople, quantityConversion, quantityMiracles})
        })
    }
}

export default new FeedbackService()