import firebase from 'react-native-firebase'

export function GetAllInformation(callback) {
    try {
        firebase.firestore().collection('feedback').onSnapshot(snapshot => {
            snapshot.forEach(async info => {
                let feedbackData = info.data()
                let snap = await feedbackData.idCap.get()
                let refCap = snap.data()
                let idRefCap = snap.id

                let dataLeader = {}

                let cap = {idRefCap, ...refCap }
                if(cap.leader) {
                    let leader = await cap.leader.get()
                    dataLeader = { id: leader.id, ...leader.data()  }
                }
                
                let feedbackInfo = info.data()
                delete feedbackInfo.idCap

                callback({ id: info.id, ...feedbackInfo, idRefCap, ...refCap, dataLeader })
            })
        })
    } catch (error) {
        console.warn("Error GetAllInformation: ", error);
        throw error
    }
}

export function GetInformationPeriod(initialDate, finalDate, callback) {
    try {
        firebase.firestore().collection('feedback').where('dateFeedback', '>', initialDate).where('dateFeedback', '<=', finalDate).onSnapshot(snapshot => {
            let quantityPeople = 0
            let quantityMiracles = 0
            let quantityConversion = 0
            let images = []
            snapshot.forEach(info => {
                quantityPeople += info.data().quantityPeople
                quantityMiracles += info.data().quantityMiracles
                quantityConversion += info.data().quantityConversion
                images.push(info.data().photoCap)
            })

            callback({ quantityPeople, quantityConversion, quantityMiracles, images, quantityFeedbacks: snapshot.size })
        })
    } catch (error) {
        console.warn("Error GetInformationPeriod: ", error);
        throw error
    }
}

export default { GetAllInformation, GetInformationPeriod }