import React, { Component } from 'react';
import { View, PermissionsAndroid, AsyncStorage, Image } from 'react-native';
import { Dialog, Avatar, Button } from 'material-bread';
import { signOut, fetchUserData } from '../../Firebase/AuthServices';
import ImagePicker from 'react-native-image-picker'
import * as Permissions from '../../Permissions/AndroidPermission'
import { storeProfileImage } from '../../Firebase/AuthServices'
import { Title, Paragraph } from 'react-native-paper';

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        noData: true
    },
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            image: null,
            userObj: props.navigation.getParam('userObj', null),
        };
    }

    uploadProfileImage = async () => {
        const grantCam = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        const grantRead = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        const grantWrite = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        if (grantCam && grantRead && grantWrite) {
            this.selectImage()
        }
        else {
            await Permissions.requestCameraPermission()
            await Permissions.requestExternalStoragePermission()
            this.uploadProfileImage()
        }
    }

    selectImage = () => {
        ImagePicker.showImagePicker(options, async (response) => {
            //console.log('Response = ', response);

            if (response.uri) {
                await this.setState({
                    image: response
                })
                storeProfileImage(response.uri)
            }

        });
    }

    randomColor = () => {
        let colorArray = [
            '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
            '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
            '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
        ];
        let random = Math.floor(Math.random() * colorArray.length);
        return colorArray[random];
    }

    componentDidMount = () => {
        fetchUserData(this.props.uid, async (snap) => {
            this.setState({
                userObj: snap
            })
        })
    }

    render() {

        return (
            <>
                <Avatar
                    type={this.state.userObj === null || this.state.userObj.ProfileImage === undefined ? "text" : 'image'}
                    content={this.state.userObj !== null && (this.state.userObj.FirstName).charAt(0)}
                    contentColor={'white'}
                    size={35}
                    //color={'#eb4949'}
                    color={this.randomColor()}
                    size={35}
                    image={this.state.userObj.ProfileImage !== undefined && <Image source={{ uri: this.state.userObj.ProfileImage }} />}
                    onPress={() => this.setState({ visible: !this.state.visible })}
                />


                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => this.setState({ visible: false })}
                    style={
                        {
                            width: 400,
                            padding: 10,
                        }
                    }
                >
                    <Avatar
                        type={this.state.userObj === null || this.state.userObj.ProfileImage === undefined ? "text" : 'image'}
                        content={this.state.userObj !== null && (this.state.userObj.FirstName).charAt(0)}
                        contentColor={'white'}
                        size={100}
                        color={this.randomColor()}
                        image={this.state.userObj.ProfileImage !== undefined && <Image source={{ uri: this.state.userObj.ProfileImage }} />}
                        style={
                            {
                                alignSelf: 'center',
                            }
                        }
                        onPress={this.uploadProfileImage}
                    />

                    {
                        this.state.userObj !== null &&
                        <View style={{ alignItems: 'center' }}>
                            <Title>
                                {this.state.userObj.FirstName + ' ' + this.state.userObj.LastName}
                            </Title>
                            <Paragraph>
                                {this.state.userObj.EmailId}
                            </Paragraph>
                        </View>
                    }

                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            paddingVertical: 20
                        }}
                    >
                        <Button
                            text={'Cancel'}
                            onPress={() => this.setState({ visible: false })}
                        />
                        <Button
                            text={'Sign out'}
                            onPress={() => {
                                signOut(async () => {
                                    console.log(await AsyncStorage.getItem('isAuth'))
                                    await AsyncStorage.clear()
                                    this.props.navigation.navigate('SignIn')
                                })
                            }}
                        />
                    </View>
                </Dialog>
            </>
        );
    }
}
