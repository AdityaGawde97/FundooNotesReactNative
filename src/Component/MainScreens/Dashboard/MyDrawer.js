import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as Drawer from "./CustDrawer";
// import * as Drawer from 'react-native-custom-drawer'

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Drawer.DrawerTitle
                    text={'Fundoo'}
                    color={'blue'}
                    fontSize={30}
                />
                <Drawer.DrawerItem
                    text={'Notes'}
                    icon={'lightbulb-outline'}
                    onPress={() => alert('hii')}
                />
                <Drawer.DrawerItem
                    text={'Reminder'}
                    icon={'notifications-none'}
                    onPress={() => alert('hii')}
                />
                <Drawer.Divider />
                <Drawer.DrawerItem
                    text={'Create new label'}
                    icon={'add'}
                    onPress={() => alert('hii')}
                />
                <Drawer.Divider />
                <Drawer.DrawerItem
                    text={'Archive'}
                    icon={'archive'}
                    onPress={() => alert('hii')}
                />
                <Drawer.DrawerItem
                    text={'Trash'}
                    icon={'delete'}
                    onPress={() => alert('hii')}
                />
            </View>
        );
    }
}
