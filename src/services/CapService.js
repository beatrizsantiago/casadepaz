import firebase from 'react-native-firebase'

export function Register(local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor) {
    try {
        let cap = { local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor }
    
        firebase.firestore()
            .collection('caps').add(cap)

        return true
    } catch (error) {
        console.warn("Error Register: ", error);
        throw error        
    }
}

export function GetCaps(callback) {
    try {
        firebase.firestore().collection('caps').onSnapshot(snapshot => {
            snapshot.forEach(cap => callback({ id: cap.id, ...cap.data() }))
        })
    } catch (error) {
        console.warn("Error GetCaps: ", error);
        throw error       
    }
}

export function NumberCaps(callback) {
    try {
        firebase.firestore().collection('caps').onSnapshot(snapshot => callback(snapshot.size));
        
    } catch (error) {
        console.warn("Error NumberCaps: ", error);
        throw error
    }
}

export default { Register, GetCaps, NumberCaps }