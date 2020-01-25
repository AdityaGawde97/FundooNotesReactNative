import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight} from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-elements';
import { globalStyle } from '../../../Css/GlobalStyle.style';

export default class ContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text style={styles2.drawerTitle}>
                        <Text style={{ color: '#4285F4' }}>F</Text>
                        <Text style={{ color: '#DB4437' }}>u</Text>
                        <Text style={{ color: '#F4B400' }}>n</Text>
                        <Text style={{ color: '#4285F4' }}>d</Text>
                        <Text style={{ color: '#0F9D58' }}>o</Text>
                        <Text style={{ color: '#DB4437' }}>o</Text>
                        <Text> notes</Text>
                    </Text>
                </View>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Notes')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="lightbulb-outline" />
                        <Text style={styles2.drawerItems}>Notes</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Reminder')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons2 color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="notifications-none" />
                        <Text style={styles2.drawerItems}>Reminder</Text>
                    </View>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Notes')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons2 color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="add" />
                        <Text style={styles2.drawerItems}>Create new label</Text>
                    </View>
                </TouchableHighlight>

                <Divider/>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Archive')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons2 color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="archive" />
                        <Text style={styles2.drawerItems}>Archive</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Trash')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="trash-can-outline" />
                        <Text style={styles2.drawerItems}>Trash</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('CountChart')}
                >
                    <View style={styles2.row}>
                        <Feather color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="pie-chart" />
                        <Text style={styles2.drawerItems}>Count chart</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Notes')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="settings-outline" />
                        <Text style={styles2.drawerItems}>Settings</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight underlayColor={'orange'}
                    onPress={()=>this.props.navigation.navigate('Notes')}
                >
                    <View style={styles2.row}>
                        <MaterialIcons2 color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="help-outline" />
                        <Text style={styles2.drawerItems}>Help & feedback</Text>
                    </View>
                </TouchableHighlight>

            </ScrollView>
        );
    }
}
