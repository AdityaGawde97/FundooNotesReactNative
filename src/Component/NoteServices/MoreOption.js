import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { styles4 } from '../../Css/NoteService.style';
import { globalStyle } from '../../Css/GlobalStyle.style';
import RBSheet from 'react-native-raw-bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, ListItem } from 'material-bread';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign'
import ColorPalette from 'react-native-color-palette'

export default class MoreOption extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const renderMoreOptions = (
            <View style={{ backgroundColor: this.props.bgColor }}>
                <List style={{ backgroundColor: 'transparent', }}>
                    <ListItem
                        text="Delete"
                        icon={
                            <Icon
                                name="trash-can-outline"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                        onPress={() => {
                            this.props.trashAndRestore(true)
                        }}
                    />
                    <ListItem
                        text="Make a Copy"
                        icon={
                            <Icon
                                name="content-copy"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Send"
                        icon={
                            <Feather
                                name="share-2"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Collaborator"
                        icon={
                            <AntIcon
                                name="adduser"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Labels"
                        icon={
                            <Icon
                                name="label-outline"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                        onPress={() => {
                            this.RBSheet.close();
                            this.props.navigation.navigate('AddLabel',
                                {
                                    'uid': this.props.uid,
                                    'Note': this.props.Item
                                })
                        }}
                    />
                </List>
                <ScrollView horizontal>
                    <ColorPalette
                        title={null}
                        defaultColor={'#ffffff'}
                        onChange={color => this.props.changeColor(color)}
                        value={this.props.bgColor}
                        colors={
                            [
                                '#ffffff', '#f28b82', '#fbbc04', '#fff475',
                                '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
                                '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
                            ]
                        }
                        icon={
                            <MaterialIcon
                                name='check'
                                size={18}
                                color={'gray'}
                            />
                        }
                    />
                </ScrollView>
            </View>
        );

        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        this.RBSheet.open();
                    }}
                    style={styles4.moreTouchable}
                >
                    <MaterialIcon
                        name="more-vert"
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                    />
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={300}
                    duration={500}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                            bottom: 60,

                        },
                        container: {
                            borderTopColor: 'lightgray',
                            borderTopWidth: 1,
                        }
                    }}

                >
                    {renderMoreOptions}
                </RBSheet>
            </>
        );
    }
}




