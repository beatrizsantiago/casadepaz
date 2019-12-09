import firebase from 'react-native-firebase'

export function Register(local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor) {
    let cap = { local, latitude, longitude, day, hour, telephone, leader, subLeader, houseOwner, supervisor }

    firebase.firestore()
        .collection('caps').add(cap)
}

export function GetCaps(callback) {
    firebase.firestore().collection('caps').onSnapshot(snapshot => {
        snapshot.forEach(cap => callback({ id: cap.id, ...cap.data() }))
    })

    // Com forEach
    // let returnCaps = [];
    // await firebase.firestore().collection('caps').onSnapshot(snapshot => {
    //     snapshot.forEach(item => {
    //         console.warn(item.data());
    //         // returnCaps.push(item.data())
    //     })
    // });
    // return returnCaps

    // let returnCaps = [];
    // let caps = await firebase.firestore().collection('caps').get();
    // caps.docs.forEach(cap => {
    //     returnCaps.push({id: cap.id, ...cap.data()});
    // })
    // return returnCaps

    // let caps = await firebase.firestore().collection('caps').get();
    // return caps.docs.map(cap => ({id: cap.id, ...cap.data()}))

    // let caps = await firebase.firestore().collection('caps').onSnapshot();
    // return caps.map(cap => ({id: cap.id, ...cap.data()}))
}

export function NumberCaps(callback) {
    firebase.firestore().collection('caps').onSnapshot(snapshot => callback(snapshot.size));
}

export default { Register, GetCaps, NumberCaps }