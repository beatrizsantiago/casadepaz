import firebase from 'react-native-firebase'

export async function GetAllInformation(idCap) {
    try {
        let capRef = firebase.firestore().collection('caps').doc(idCap)

        let listFeedbacks = []
        let feedbacks = await firebase.firestore().collection('feedback').where('idCap', '==', capRef).get()

        feedbacks.docs.forEach(feedback => {
            listFeedbacks.push({ id: feedback.id, ...feedback.data() })
        })

        return listFeedbacks

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