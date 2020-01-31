import React, { Component } from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { styles4 } from '../../Css/NoteService.style';
import { globalStyle } from '../../Css/GlobalStyle.style';
import RBSheet from 'react-native-raw-bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, ListItem } from 'material-bread';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class TrashMoreOption extends Component {
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
                        text="Restore"
                        icon={
                            <Icon
                                name="restore-clock"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                        onPress={async () => {
                            await this.props.trashAndRestore(false)
                        }}
                    />
                    <ListItem
                        text="Delete forever"
                        icon={
                            <Icon
                                name="delete-forever"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                        onPress={this.props.deleteForever}
                    />
                  
                </List>
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
                    height={100}
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




