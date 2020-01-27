import firebase from './Firebase'
import AsyncStorage from '@react-native-community/async-storage';

export async function createNote(title, note, pin, archive, trash, color, date, time, callback) {
    const uid = await AsyncStorage.getItem('uid')
    console.log(uid)
    firebase.database().ref('/users/' + uid + '/Notes/').push({
        Title: title,
        Content: note,
        Pin: pin,
        Archive: archive,
        Trash: trash,
        BgColor: color,
        ReminderDate: date,
        ReminderTime: time
    }).then((success) => {
        callback();
    })

}

export async function getNotes(callback) {
    const uid = await AsyncStorage.getItem('uid');
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Archive').equalTo(false)
        .on('value', (snapshot) => {
            let ref = snapshot.ref;
            ref.orderByChild('Trash').equalTo(false).on('value', (snapshot2) => {
                callback(snapshot2.val())
            })
        })
}

export async function getArchiveNotes(callback) {
    const uid = await AsyncStorage.getItem('uid');
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Archive').equalTo(true)
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

export async function getTrashNotes(callback) {
    const uid = await AsyncStorage.getItem('uid');
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Trash').equalTo(true)
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

export async function updateNote(noteId, title, note, pin, archive, trash, color, date, time, callback) {
    const uid = await AsyncStorage.getItem('uid')
    firebase.database().ref('/users/' + uid + '/Notes/' + noteId + '/').update({
        Title: title,
        Content: note,
        Pin: pin,
        Archive: archive,
        Trash: trash,
        BgColor: color,
        ReminderDate: date,
        ReminderTime: time
    }).then((success) => {
        callback();
    })
}
