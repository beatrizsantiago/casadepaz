import firebase from 'react-native-firebase'
import moment from 'moment'

let ref = firebase.storage().ref('pdfs-palavra-cap')
let collectionPreachings = firebase.firestore().collection('preachings')

export async function UploadFilePreaching(pathFile, nameFile) {
    try {
        let file = await ref.child(new Date).child(nameFile)
        await file.put(pathFile)
        
        let url = await file.getDownloadURL()
        console.warn(url);
        

        return url

    } catch (error) {
        console.warn("Error UploadFilePreaching: ", error);
        throw error
    }
}

export async function RegisterPreaching(title, urlVideo) {
    try {
        let preaching = {
			dateUpload: new Date(),
            title: title,
            urlPdfPreaching: '',
            urlVideo: urlVideo
        }
        
        let register = await collectionPreachings.add(preaching)

        return register.id

    } catch (error) {
        console.warn("Error RegisterPreaching: ", error);
        throw error
    }
}

export async function UpdatePreaching(idPreaching, url) {
    try {
        await collectionPreachings.doc(idPreaching).update({
            urlPdfPreaching: url
        })
        return true
        
    } catch (error) {
        console.warn("Error UpdatePreaching: ", error);
        throw error
    }
}

export function GetAllFiles(callback) {
    try {
        collectionPreachings.orderBy("dateUpload", "desc").onSnapshot(snapshot => {
            snapshot.forEach(info => {
                callback({ id: info.id, ...info.data() })
            })
        })
    } catch (error) {
        console.warn("Error GetAllFiles: ", error);
        throw error
    }
}

export default { UploadFilePreaching, RegisterPreaching, UpdatePreaching, GetAllFiles }