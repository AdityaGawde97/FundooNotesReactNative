import { PermissionsAndroid } from 'react-native';

export async function requestCameraPermission() {
    try {
        const grantedCamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Allow Camera Permission',
                message: 'Fundoo needs access to your camera ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
        } else {
            console.log('Camera permission denied');
        }

    } catch (err) {
        console.warn(err);
    }
}

export async function requestExternalStoragePermission() {
    try {

        const grantedReadExternal = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Allow to Read storage Permission',
                message: 'Fundoo App need to access external storage',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (grantedReadExternal === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can Read external storage');
        } else {
            console.log('read external permission denied');
        }

        const grantedWriteExternal = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'Allow to write storage Permission',
                message: 'Fundoo App need to access external storage',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (grantedWriteExternal === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can write external storage');
        } else {
            console.log('write external permission denied');
        }

    } catch (err) {
        console.warn(err);
    }
}