import firebase from 'react-native-firebase'

export async function CreateUser(email, password) {
    try {
        let dataUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        firebase.auth()
        return dataUser.user.uid

    } catch (error) {
        console.warn("Error CreateUser: ", error);
        throw error
    }
}

export async function RegisterLeader(email, password, name, telephone) {
    try {
        let user = await CreateUser(email, password)

        await firebase.firestore()
            .collection('leaders').add({
                UID: user,
                name: name,
                telephone: telephone
            })

        return true

    } catch (error) {
        console.warn("Error RegisterLeader: ", error);
        throw error
    }
}

export async function GetAllLeaders(callback) {
    try {
        firebase.firestore().collection('leaders').onSnapshot(snapshot => {
            snapshot.forEach(async info => {
                // console.warn(info.data());
                
                
                // let feedbackData = info.data()
                // let snap = await feedbackData.idCap.get()
                // let refCap = snap.data()
                // let idRefCap = snap.id

                // let feedbackInfo = info.data()
                // delete feedbackInfo.idCap

                // callback({ id: info.id, ...feedbackInfo, idRefCap, ...refCap })
            })
        })
    } catch (error) {
        console.warn("Error GetAllLeaders: ", error);
        throw error
    }
}

export default { CreateUser, RegisterLeader, GetAllLeaders }