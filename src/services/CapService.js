import firebase from 'react-native-firebase'

export function Register(local, latitude, longitude, day, hour, leader, subLeader, houseOwner, supervisor) {
    try {
        let cap = { active: true, local, latitude, longitude, day, hour, leader: firebase.firestore().doc(`leaders/${leader.id}`), subLeader, houseOwner, supervisor }

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
            snapshot.forEach(async cap => {
                let capData = cap.data()
                let snap = await capData.leader.get()
                let refLeader = snap.data()
                let idRefLeader = snap.id

                callback({ id: cap.id, ...capData, leader: { id: idRefLeader, ...refLeader } })
            })
        })
    } catch (error) {
        console.warn("Error GetCaps: ", error);
        throw error
    }
}

export function GetActiveCaps(callback) {
    try {
        firebase.firestore().collection('caps').where('active', '==', true).onSnapshot(snapshot => {
            snapshot.forEach(async cap => {
                let capData = cap.data()
                let snap = await capData.leader.get()
                let refLeader = snap.data()
                let idRefLeader = snap.id

                callback({ id: cap.id, ...capData, leader: { id: idRefLeader, ...refLeader } })
            })
        })
    } catch (error) {
        console.warn("Error GetActiveCaps: ", error);
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

export function NumberActiveCaps(callback) {
    try {
        firebase.firestore().collection('caps').where('active', '==', true).onSnapshot(snapshot => callback(snapshot.size));

    } catch (error) {
        console.warn("Error NumberActiveCaps: ", error);
        throw error
    }
}

export async function GetDataCap(id) {
    try {
        let caps = await firebase.firestore().collection('caps').get();
        let dataCap = {}
        caps.docs.map(cap => {
            if (cap.id == id) {
                dataCap = { id: cap.id, ...cap.data() }
            }
        })

        let infoLeader = await dataCap.leader.get()
        let leader = {id: infoLeader.id, ...infoLeader.data()}

        return { dataCap, leader}

    } catch (error) {
        console.warn("Error GetDataCap: ", error);
        throw error
    }
}

export async function UpdateCap(idCap, local, latitude, longitude, day, hour, leader, subLeader, houseOwner, supervisor) {
    try {
        await firebase.firestore().collection('caps').doc(idCap).update({
            local, latitude, longitude, day, hour, leader: firebase.firestore().doc(`leaders/${leader.id}`), subLeader, houseOwner, supervisor
        })
        return true
    } catch (error) {
        console.warn("Error UpdateCap: ", error);
        throw error
    }
}

export async function UpdateStateCap(idCap, bool) {
    try {
        await firebase.firestore().collection('caps').doc(idCap).update({
            active: bool
        })
        return true

    } catch (error) {
        console.warn("Error UpdateStateCap: ", error);
        throw error
    }
}

export default { Register, GetCaps, GetActiveCaps, NumberCaps, NumberActiveCaps, GetDataCap, UpdateCap, UpdateStateCap }