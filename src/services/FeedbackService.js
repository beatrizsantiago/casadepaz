import firebase from 'react-native-firebase'

export function GetAllInformation(callback) {
    try {
        firebase.firestore().collection('feedback').onSnapshot(snapshot => {
            snapshot.forEach(async info => {
                let feedbackData = info.data()
                let snap = await feedbackData.idCap.get()
                let refCap = snap.data()
                let idRefCap = snap.id
                // console.warn({leader: { ...snap.data() }});
                
                // let leaderData = await refCap.leader.get()
                // let refLeader = leaderData.data()
                // console.warn(leaderData.data());

                let feedbackInfo = info.data()
                delete feedbackInfo.idCap

                callback({ id: info.id, ...feedbackInfo, idRefCap, ...refCap })
                //, leaderCap: { ...refLeader }
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
            snapshot.forEach(info => {
                quantityPeople += info.data().quantityPeople
                quantityMiracles += info.data().quantityMiracles
                quantityConversion += info.data().quantityConversion
            })
            callback({ quantityPeople, quantityConversion, quantityMiracles })
        })
    } catch (error) {
        console.warn("Error GetInformationPeriod: ", error);
        throw error
    }
}

export default { GetAllInformation, GetInformationPeriod }