import firebase from '../Firebase/Firebase';

export function emailExistance(email, ifCallback, elseCallback) {
    firebase.auth().fetchSignInMethodsForEmail(email)
        .then(function (signInMethods) {
            if (signInMethods.indexOf(
                firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) === -1) {
                ifCallback();
            }
            else {
                let errors = {};
                errors["email"] = 'That username is taken, try another';
                elseCallback(errors)
            }
        }).catch((error) => { })
}

export function registerUser(firstName, lastName, email, password, thenCallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((success) => {
            firebase.database().ref('/users/' + success.user.uid + '/PersonalData/').set({
                FirstName: firstName,
                LastName: lastName,
                EmailId: email
            })
            thenCallback()
        }).catch((error) => { })
}

export function loginUser(email, password, thenCallback, catchCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
        thenCallback()
    })
        .catch((error) => {
            let errors = {};
            if (error.code === 'auth/user-not-found')
                errors["email"] = 'Couldn\'t find your Fundoo Account'
            else
                errors["password"] = 'Wrong password. Try again or click Forgot password to reset it.'
            catchCallback(errors)
        })
}

export function forgotPassword(email, thenCallback, catchCallback) {

    firebase.auth().sendPasswordResetEmail(email)
        .then((error) => {
            thenCallback()
        })
        .catch(() => {
            let errors = {};
            errors["email"] = 'Couldn\'t find your Fundoo Account'
            catchCallback(errors)
        })

}

