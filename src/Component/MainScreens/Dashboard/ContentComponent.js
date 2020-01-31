import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { styles2 } from '../../../Css/Dashboard.style';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-elements';
import { globalStyle } from '../../../Css/GlobalStyle.style';
import model from '../../../ModelServices/DashboardModel';
import { connect } from 'react-redux';

class ContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "Notes",
            labelData: []
        };
    }

    changeTab = (tab) => {
        this.setState(
            {
                tab: tab
            }
        )
    }

    componentDidMount = () => {
        model.getLabel(this.props.uid, (data) => {
            this.setState({ labelData: data })
        })
    };


    render() {
        const { tab } = this.state
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

                {
                    (['Notes', 'Reminder']).map((text, index) => (
                        <TouchableHighlight underlayColor={'lightgray'}
                            onPress={() => {
                                this.changeTab(text)
                                this.props.navigation.navigate(text)
                            }}
                            style={[styles2.tab, { backgroundColor: tab === text ? '#feefc3' : '#fff' }]}
                        >
                            <View style={styles2.row}>
                                {
                                    index % 2 === 0 ?
                                        <MaterialIcons
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name="lightbulb-outline"
                                        /> :
                                        <MaterialIcons2
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name='notifications-none'
                                        />

                                }

                                <Text style={styles2.drawerItems}>{text}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }

                {this.state.labelData.length === 0 ?
                    <Divider /> :
                    <Text
                        style={{ color: globalStyle.inherit, paddingLeft: 30 }}
                    >Labels</Text>
                }

                {
                    (this.state.labelData).map((text, index) => (
                        <TouchableHighlight underlayColor={'lightgray'}
                            onPress={() => {
                                this.changeTab(text.Label)
                                this.props.navigation.navigate('Label',
                                    {
                                        'page': text.Label,
                                        'labelId': text.labelId
                                    })
                            }}
                            style={[styles2.tab, { backgroundColor: tab === text.Label ? '#feefc3' : '#fff' }]}
                        >
                            <View style={styles2.row}>

                                <MaterialIcons
                                    color={globalStyle.inherit}
                                    size={globalStyle.drawerIconSize}
                                    name="label-outline"
                                />

                                <Text style={styles2.drawerItems}>{text.Label}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }

                <TouchableHighlight underlayColor={'lightgray'}
                    onPress={() => this.props.navigation.navigate('EditLabels')}
                    style={styles2.tab}
                >
                    <View style={styles2.row}>
                        <MaterialIcons2 color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="add" />
                        <Text style={styles2.drawerItems}>Create new label</Text>
                    </View>
                </TouchableHighlight>

                <Divider />

                {
                    (['Archive', 'Trash']).map((text, index) => (
                        <TouchableHighlight underlayColor={'lightgray'}
                            onPress={() => {
                                this.changeTab(text)
                                this.props.navigation.navigate(text)
                            }}
                            style={[styles2.tab, { backgroundColor: tab === text ? '#feefc3' : '#fff' }]}
                        >
                            <View style={styles2.row}>
                                {
                                    index % 2 === 0 ?
                                        <MaterialIcons2
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name={'archive'}
                                        />

                                        :
                                        <MaterialIcons
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name={'trash-can-outline'}
                                        />
                                }

                                <Text style={styles2.drawerItems}>{text}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }

                <Divider />

                <TouchableHighlight underlayColor={'lightgray'}
                    onPress={() => this.props.navigation.navigate('CountChart')}
                    style={styles2.tab}
                >
                    <View style={styles2.row}>
                        <Feather color={globalStyle.inherit} size={globalStyle.drawerIconSize} name="pie-chart" />
                        <Text style={styles2.drawerItems}>Count chart</Text>
                    </View>
                </TouchableHighlight>

                <Divider />

                {
                    (['Settings', 'Help & feedback']).map((text, index) => (
                        <TouchableHighlight underlayColor={'lightgray'}
                            onPress={() => {
                                this.changeTab(text)
                                this.props.navigation.navigate(text)
                            }}
                            style={[styles2.tab, { backgroundColor: tab === text ? '#feefc3' : '#fff' }]}
                        >
                            <View style={styles2.row}>
                                {
                                    index % 2 === 0 ?
                                        <MaterialIcons
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name={'settings-outline'}
                                        />

                                        :
                                        <MaterialIcons2
                                            color={globalStyle.inherit}
                                            size={globalStyle.drawerIconSize}
                                            name={'help-outline'}
                                        />
                                }
                                <Text style={styles2.drawerItems}>{text}</Text>
                            </View>
                        </TouchableHighlight>
                    ))
                }

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userID.uid
    };
}

export default connect(
    mapStateToProps
)(ContentComponent);