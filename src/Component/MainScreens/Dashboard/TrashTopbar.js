import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import { Appbar, Menu, Provider, Modal } from 'react-native-paper';
export default class TrashTopbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false,
            visible: false,
        };

    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });


    render() {
        return (
            <Provider>
                <View style={styles2.container}>
                    <Appbar
                        style={styles2.otherContainer}
                    >
                        <Appbar.Action size={24} icon="menu" color="#797979"
                            onPress={this.props.navigation.openDrawer}
                        />
                        <Appbar.Content
                            title={this.props.page}
                            titleStyle={styles2.otherTitle}
                        />
                        <Menu
                            visible={this.state.visible}
                            onDismiss={this._closeMenu}
                            anchor={
                                <Appbar.Action
                                    color={'#797979'}
                                    size={25}
                                    icon={require('../../../Assets/more.png')}
                                    style={{ right: 5 }}
                                    onPress={this._openMenu}
                                />
                            }
                        >
                            <Menu.Item onPress={this._closeMenu} title={'Empty trash'} />
                        </Menu>
                    </Appbar>

                </View>
            </Provider>
        );
    }
}
