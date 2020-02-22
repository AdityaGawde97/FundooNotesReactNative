import React, { Component } from 'react';
import { View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { styles4 } from '../../Css/NoteService.style';
import { globalStyle } from '../../Css/GlobalStyle.style';
import RBSheet from 'react-native-raw-bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { List, ListItem } from 'material-bread';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Toast from '../../NativeModules/ToastModule'

export default class MediaOption extends Component {
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
                        text="Take photo"
                        icon={
                            <Icon
                                name="camera-outline"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }

                    />
                    <ListItem
                        text="Choose image"
                        icon={
                            <Icon
                                name="image-outline"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Drawing"
                        icon={
                            <Icon
                                name="brush"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Recording"
                        icon={
                            <Feather
                                name="mic"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }
                    />
                    <ListItem
                        text="Checkboxes"
                        icon={
                            <Icon
                                name="check-box-outline"
                                size={globalStyle.size25}
                                color={globalStyle.inherit}
                            />
                        }

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
                    <Octicons
                        name="diff-added"
                        size={globalStyle.noteIconSize}
                        color={globalStyle.inherit}
                    />
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={250}
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




