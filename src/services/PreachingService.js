import firebase from 'react-native-firebase'
import moment from 'moment'

let ref = firebase.storage().ref('pdfs-palavra-cap')
let collectionPreachings = firebase.firestore().collection('preachings')

export async function UploadFilePreaching(pathFile, nameFile) {
    try {
        let file = await ref.child(new Date).child(nameFile)
        await file.put(pathFile)
        
        let url = await file.getDownloadURL()
        console.warn("URL: ", url);

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
        console.warn("UPDATE: " , idPreaching, url);
        
        await collectionPreachings.doc(idPreaching).update({
            urlPdfPreaching: url
        })
        return true
        
    } catch (error) {
        console.warn("Error UpdatePreaching: ", error);
        throw error
    }
}

export async function GetAllFiles() {
    try {
        let listFiles = []
        let files = await collectionPreachings.orderBy("dateUpload", "desc").get()

        files.docs.forEach(file => {
            listFiles.push({ id: file.id, ...file.data() })
        })

        return listFiles
    } catch (error) {
        console.warn("Error GetAllFiles: ", error);
        throw error
    }
}

export async function Resend(idPreaching) {
    try {
        await collectionPreachings.doc(idPreaching).update({
            dateUpload: new Date()
        })
        return true
        
    } catch (error) {
        console.warn("Error Resend: ", error);
        throw error
    }
}

export default { UploadFilePreaching, RegisterPreaching, UpdatePreaching, GetAllFiles, Resend }