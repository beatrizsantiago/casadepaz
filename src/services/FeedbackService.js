import React from 'react'

import firebase from 'react-native-firebase'

export class FeedbackService {

    getAllInformation = callback => {
        firebase.firestore().collection('feedback').onSnapshot(snapshot => {
            snapshot.forEach(async info => {
                let feedbackData = info.data()
                let snap = await feedbackData.idCap.get()
                let refCap = snap.data()

                let feedbackInfo = info.data()
                delete feedbackInfo.idCap
                
                callback({id: info.id, ...feedbackInfo, ...refCap})
            })
        })
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