import * as DatabaseServices from "../Firebase/DatabaseServices";

class DashboardModel {

    constructor() {

    }

    fetchNotes(uid, ifCallback, elseCallback) {
        DatabaseServices.getNotes(uid, async (snapObj) => {

            let pinNotes = [];
            let unpinNotes = [];

            if (snapObj !== null && snapObj !== undefined) {
                await Object.getOwnPropertyNames(snapObj).map((key) => {
                    snapObj[key].noteId = key
                    if (snapObj[key].Pin === true && snapObj[key].Archive === false) {
                        pinNotes.push(snapObj[key])
                    }
                    else if (snapObj[key].Pin === false && snapObj[key].Archive === false) {
                        unpinNotes.push(snapObj[key])
                    }
                });
                ifCallback(pinNotes.reverse(), unpinNotes.reverse())
            }
            else {
                elseCallback()
            }
        });
    }

    fetchReminderNotes(uid, ifCallback, elseCallback) {

        DatabaseServices.getNotes(uid, async (snapObj) => {

            let notes = []

            if (snapObj !== null && snapObj !== undefined) {
                await Object.getOwnPropertyNames(snapObj).map((key) => {
                    snapObj[key].noteId = key
                    if (snapObj[key].ReminderDate !== undefined) {
                        snapObj[key].noteId = key;
                        notes.push(snapObj[key])
                    }
                });
                ifCallback(notes.reverse())
            }
            else {
                elseCallback();
            }
        });
    }

    fetchArchiveOrTrashNotes(uid, child, ifCallback, elseCallback) {
        DatabaseServices.getArchiveOrTrashNotes(uid, child, async (snapObj) => {
            let notes = []
            if (snapObj !== null && snapObj !== undefined) {
                await Object.getOwnPropertyNames(snapObj).map((key) => {
                    snapObj[key].noteId = key;
                    notes.push(snapObj[key])
                });
                ifCallback(notes.reverse())
            }
            else {
                elseCallback();
            }
        })
    }

    createNote(uid, state, callback) {
        DatabaseServices.setNote(uid,
            {
                Title: state.title,
                Content: state.note,
                Pin: state.pin,
                Archive: state.archive,
                Trash: state.trash,
                BgColor: state.bgColor,
                ReminderDate: state.dateField,
                ReminderTime: state.timeField
            },
            callback
        )
    }

    editNote(uid, noteId, state, callback) {
        DatabaseServices.updateNote(uid, noteId,
            {
                Title: state.title,
                Content: state.note,
                Pin: state.pin,
                Archive: state.archive,
                Trash: state.trash,
                BgColor: state.bgColor,
                ReminderDate: state.dateField,
                ReminderTime: state.timeField
            },
            callback
        )
    }

    trashOrRestore(uid, noteId, trash, callback) {
        DatabaseServices.trashAndRestoreNotes(uid, noteId, trash, callback)
    }

    deleteForever(uid, noteId, callback) {
        DatabaseServices.deleteForeverFromFirebase(uid, noteId, callback)
    }

    addlabel(uid, label) {
        DatabaseServices.addLabelInFirebase(uid, label)
    }

    getLabel(uid, callback) {

        DatabaseServices.getLabelsFromFirebase(uid, async (labelsData) => {
            let labels = []
            if (labelsData !== null && labelsData !== undefined) {
                await Object.getOwnPropertyNames(labelsData).map((key) => {
                    labelsData[key].labelId = key;
                    labels.push(labelsData[key])
                });
                callback(labels.reverse())
            }
        })
    }

    updateLabel(uid, labelId, label) {  
        DatabaseServices.updateLabelsInFirebase(uid, labelId, label)
    }

    removeLabel(uid, labelId) {
        DatabaseServices.deleteLabelFromFirebse(uid, labelId)
    }

}

const model = new DashboardModel()

export default model