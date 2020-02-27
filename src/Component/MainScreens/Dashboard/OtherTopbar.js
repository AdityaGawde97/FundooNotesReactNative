import React, { Component } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import { Appbar, Menu, Provider } from 'react-native-paper';
export default class OtherTopbar extends Component {
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
                        {
                            this.props.page !== 'Trash' && this.props.page !== 'Settings' ?
                                <>
                                    <Appbar.Action
                                        color={'#797979'}
                                        size={25}
                                        icon={require('../../../Assets/search.png')}
                                        style={{ right: 5 }}
                                    />
                                    <Appbar.Action
                                        color={'#797979'}
                                        size={25}
                                        icon={!this.state.view ?
                                            require('../../../Assets/list_view.png') :
                                            require('../../../Assets/grid_view.png')
                                        }
                                        onPress={() => this.setState({ view: !this.state.view })}
                                        style={{ right: 5 }}
                                    />
                                </>
                                :
                                this.props.page !== 'Settings' &&
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
                        }

                    </Appbar>

                </View>
            </Provider>
        );
    }
}
