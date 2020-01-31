import firebase from './Firebase'

export function setNote(uid, noteObj, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/').push(noteObj).then((success) => {
        callback(success.key);
    })
}

export function updateNote(uid, noteId, noteObj, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteId + '/').update(noteObj)
        .then((success) => {
            console.log('success')
            callback();
        })

}

export function getNotes(uid, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Trash').equalTo(false)
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

export function getArchiveNotes(uid, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild('Archive').equalTo(true)
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

export function getArchiveOrTrashNotes(uid, child, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/').orderByChild(child).equalTo(true)
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

export function trashAndRestoreNotes(uid, noteId, trash, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteId + '/').update({
        Trash: trash,
    }).then((success) => {
        callback();
    })
}

export function deleteForeverFromFirebase(uid, noteId, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteId + '/').remove()
        .then((success) => {
            callback();
        })
}

export function createLabelInFirebase(uid, label) {
    firebase.database().ref('/users/' + uid + '/Labels/').push({
        Label: label
    })
}

export function getLabelsFromFirebase(uid, callback) {
    firebase.database().ref('/users/' + uid + '/Labels/').on('value', (snapshot) => {
        callback(snapshot.val())
    })
}

export async function updateLabelsInFirebase(uid, labelId, label) {
    await firebase.database().ref('/users/' + uid + '/Labels/' + labelId + '/').update({
        Label: label
    })
}

export function deleteLabelFromFirebse(uid, labelId) {
    firebase.database().ref('/users/' + uid + '/Labels/' + labelId + '/').remove()
}

export function addLabelsInNote(uid, noteKey, labelKey, labelName) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/NoteLabels/' + labelKey + '/').set({
        LabelName: labelName
    });
    firebase.database().ref('/users/' + uid + '/Labels/' + labelKey + '/LabeledNotes/').push({
        NoteId: noteKey
    })
}

export function removeLabelsFromNote(uid, noteKey, labelKey, labeledNoteKey) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteKey + '/NoteLabels/' + labelKey + '/').remove();
    firebase.database().ref('/users/' + uid + '/Labels/' + labelKey + '/LabeledNotes/' + labeledNoteKey + '/').remove()
}

export function CheckNote(uid, noteId, callback) {
    firebase.database().ref('/users/' + uid + '/Notes/' + noteId + '/')
        .on('value', (snapshot) => {
            callback(snapshot.val())
        })
}

