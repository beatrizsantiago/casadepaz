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
                active: true,
                email: email,
                name: name,
                photoProfile: '',
                telephone: telephone
            })

        return true

    } catch (error) {
        console.warn("Error RegisterLeader: ", error);
        throw error
    }
}

export async function GetLeaderCap(idCap) {
    try {
        let caps = await firebase.firestore().collection('caps').get();
        let dataCap = {}
        caps.docs.map(cap => {
            if (cap.id == idCap) {
                dataCap = { id: cap.id, ...cap.data() }
            }
        })

        let infoLeader = await dataCap.leader.get()
        let leader = {id: infoLeader.id, ...infoLeader.data()}

        return leader        
    } catch (error) {
        console.warn("Error GetLeaderCap: ", error);
        throw error
    }
}

export async function GetActiveLeaders() {
    try {
        let listLeaders = [];

        let leaders = await firebase.firestore().collection('leaders').where('active', '==', true).get()
        
        leaders.docs.forEach(leader => {
            listLeaders.push({id: leader.id, ...leader.data()})
        })

        return listLeaders
    } catch (error) {
        console.warn("Error GetActiveLeaders: ", error);
        throw error
    }
}

export async function GetNumberActiveLeaders() {
    try {
        let leaders = await firebase.firestore().collection('leaders').where('active', '==', true).get()
        
        let numberLeaders = leaders.size

        return numberLeaders
    } catch (error) {
        console.warn("Error GetNumberActiveLeaders: ", error);
        throw error
    }
}

export async function GetAllLeaders(callback) {
    try {
        firebase.firestore().collection('leaders').onSnapshot(snapshot => {
            snapshot.forEach(async info => {
                callback({id: info.id, ...info.data()})
            })
        })
    } catch (error) {
        console.warn("Error GetAllLeaders: ", error);
        throw error
    }
}

export async function UpdateStateLeader(idDoc, bool) {
    try {
        await firebase.firestore().collection('leaders').doc(idDoc).update({
            active: bool
        })
        return true

    } catch (error) {
        console.warn("Error UpdateStateLeader: ", error);
        throw error
    }
}

export default { CreateUser, RegisterLeader, GetLeaderCap, GetActiveLeaders, GetNumberActiveLeaders, GetAllLeaders, UpdateStateLeader }