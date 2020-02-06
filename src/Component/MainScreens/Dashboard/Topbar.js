import React, { useState } from 'react';
import { View } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import { Appbar, Menu } from 'react-native-paper';
import Profile from '../../NoteServices/Profile';
import { useSelector, useDispatch } from 'react-redux'
import { toggleListView } from '../../../Redux/ListGridView/ViewAction'

export default function Topbar(props) {

    const [state, setState] = useState({
        visible: false
    });

    const view = useSelector(state => state.view.toggleView)
    const dispatch = useDispatch()

    _openMenu = () => setState({ visible: true });

    _closeMenu = () => setState({ visible: false });

    return (
        <View style={styles2.container}>
            <Appbar
                style={props.page === 'Notes' ? styles2.topbarContainer : styles2.otherContainer}
            >
                <Appbar.Action size={24} icon="menu" color="#797979"
                    onPress={props.navigation.openDrawer}
                />
                <Appbar.Content
                    title={props.page === 'Notes' ? "Search your notes" : props.page}
                    titleStyle={props.page === 'Notes' ? styles2.topbarTitle : styles2.otherTitle}
                    onPress={() => props.navigation.navigate('Search', { 'uid': props.uid })}
                />
                {props.page !== 'Trash' && props.page !== 'CountChart' ?


                    <>
                        {
                            props.page !== 'Notes' &&
                            <Appbar.Action
                                color={'#797979'}
                                size={25}
                                icon={require('../../../Assets/search.png')}
                                style={{ right: 5 }}
                            />
                        }

                        {
                            props.page !== 'Trash' &&
                            < Appbar.Action
                                color={'#797979'}
                                size={24}
                                icon={!view ?
                                    require('../../../Assets/list_view.png') :
                                    require('../../../Assets/grid_view.png')
                                }
                                onPress={() => dispatch(toggleListView())}
                                style={{ right: 9 }}
                            />
                        }

                    </> :

                    props.page !== 'CountChart' ?

                        <Menu
                            visible={state.visible}
                            onDismiss={_closeMenu}
                            anchor={
                                <Appbar.Action
                                    color={'#797979'}
                                    size={25}
                                    icon={require('../../../Assets/more.png')}
                                    style={{ right: 0 }}
                                    onPress={_openMenu}
                                />
                            }
                        >
                            <Menu.Item onPress={_closeMenu} title={'Empty trash'} />
                        </Menu> :
                        <Appbar.Action
                            color={'#797979'}
                            size={25}
                            icon={'refresh'}
                            style={{ right: 0 }}
                            onPress={props.refreshComponent}
                        />
                }
                {
                    props.page === 'Notes' &&
                    <View style={{ marginRight: 10 }}>
                        <Profile {...props} />
                    </View>
                }
            </Appbar>

        </View>
    );

}
