import firebase from 'react-native-firebase'

export async function CreateUser(email, password) {
    try {
        let dataUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.warn(dataUser.user.uid);
        
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

export default { CreateUser, RegisterLeader }