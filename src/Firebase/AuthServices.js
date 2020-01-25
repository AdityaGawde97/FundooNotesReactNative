import firebase from './Firebase';
import AsyncStorage from '@react-native-community/async-storage';

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
    console.log(email)
    console.log(password)
    firebase.auth().signInWithEmailAndPassword(email, password).then(async(success) => {
        await AsyncStorage.setItem('isAuth', 'true')
        await AsyncStorage.setItem('uid', success.user.uid)
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

export function signOut(callback){
    firebase.auth().signOut().then(()=>{
        callback()
    })
    .catch()
}


