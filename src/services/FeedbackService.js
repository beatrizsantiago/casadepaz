import React from 'react'

import firebase from 'react-native-firebase'

export class FeedbackService {

    getAllInformation = () => {

    }

    getInformationPeriod = (initialDate, finalDate, callback) => {
        firebase.firestore().collection('feedback').where('dateCap', '>', initialDate).where('dateCap', '<=', finalDate).onSnapshot(snapshot => {
            snapshot.forEach(info => callback({id: info.id, ...info.data()}))
        })
    }
}

export default new FeedbackService()