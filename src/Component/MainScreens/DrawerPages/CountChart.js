import React, { Component } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { styles3 } from "../../../Css/MainScreens.style";
import { connect } from 'react-redux';
import Topbar from '../Dashboard/Topbar'
import { Provider } from 'react-native-paper';
import model from '../../../ModelServices/DashboardModel';
import PushNotification from 'react-native-push-notification'

class CountChart extends Component {
    constructor(props) {
        super(props);
        this.page = props.navigation.getParam('page')
        this.state = {
            notesCount: {
                allNotes: 0,
                pinNotes: 0,
                unpinNotes: 0,
                archive: 0,
                trash: 0
            },
            dataset: null,
            refresh: false,
        };
    }

    fetchAndCountNotes = () => {
        model.getAllNotes(this.props.uid, (snap) => {
            let notesCount = {};
            notesCount['allNotes'] = snap.length;
            notesCount['pinNotes'] = 0;
            notesCount['unpinNotes'] = 0;
            notesCount['archive'] = 0;
            notesCount['trash'] = 0;
            (snap).map((item) => {
                if (item.Pin === true) {
                    notesCount['pinNotes'] = notesCount['pinNotes'] + 1;
                }
                else if (item.Pin === false && item.Archive === false && item.Trash === false) {
                    notesCount['unpinNotes'] = notesCount['unpinNotes'] + 1;
                }
                else if (item.Archive === true) {
                    notesCount['archive'] = notesCount['archive'] + 1;
                }
                else if (item.Trash === true) {
                    notesCount['trash'] = notesCount['trash'] + 1;
                }
            })
            this.setState({ notesCount: notesCount },()=>{
                console.log("notesCount :",this.state.notesCount);
                
            })
            // this.setState({ notesCount: notesCount },
            //     () => {
            //         const data = [
            //             {
            //                 name: 'All notes',
            //                 count: this.state.notesCount.allNotes,
            //                 population: 21500000,
            //                 color: 'rgba(131, 167, 234, 1)',
            //                 legendFontColor: '#7F7F7F',
            //                 legendFontSize: 15,
            //             },
            //             {
            //                 name: 'Pin notes',
            //                 count: this.state.notesCount.pinNotes,
            //                 population: 21500000,
            //                 color: '#F00',
            //                 legendFontColor: '#7F7F7F',
            //                 legendFontSize: 15,
            //             },
            //             {
            //                 name: 'Unpin notes',
            //                 count: this.state.notesCount.unpinNotes,
            //                 population: 21500000,
            //                 color: 'lime',
            //                 legendFontColor: '#7F7F7F',
            //                 legendFontSize: 15,
            //             },
            //             {
            //                 name: 'Archive notes',
            //                 count: this.state.notesCount.archive,
            //                 population: 21500000,
            //                 color: 'salmon',
            //                 legendFontColor: '#7F7F7F',
            //                 legendFontSize: 15,
            //             },
            //             {
            //                 name: 'Trash notes',
            //                 count: this.state.notesCount.trash,
            //                 population: 21500000,
            //                 color: 'cyan',
            //                 legendFontColor: '#7F7F7F',
            //                 legendFontSize: 15,
            //             }
            //         ];
            //         this.setState({
            //             dataset: data
            //         })
            //     })
        })
    }

    refreshComponent = () => {
        this.setState({
            refresh: !this.state.refresh
        },()=>console.log(this.state.refresh))
    }

    componentDidMount = () => {
        this.fetchAndCountNotes()
    };

    render() {

        let data = [
            {
                name: 'All notes',
                count: this.state.notesCount.allNotes,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Pin notes',
                count: this.state.notesCount.pinNotes,
                color: '#F00',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Unpin notes',
                count: this.state.notesCount.unpinNotes,
                color: 'lime',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Archive notes',
                count: this.state.notesCount.archive,
                color: 'salmon',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            },
            {
                name: 'Trash notes',
                count: this.state.notesCount.trash,
                color: 'cyan',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
            }
        ];

        return (
            <View style={styles3.container}>
                <Provider>
                    <Topbar {...this.props} page={this.page} refreshComponent={this.refreshComponent} />
                </Provider>
                <View style={{ height: '90%' }}>
               
                        <PieChart
                            data={data}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={{
                                backgroundColor: '#1cc910',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            accessor="count"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute //for the absolute number remove if you want percentage
                        />
                    
                </View>
                <Button title={'click'}
                    onPress={
                        () => {
                            PushNotification.localNotificationSchedule({
                                //... You can use all the options from localNotifications
                                message: "My Notification Message", // (required)
                                date: new Date(Date.now() + 60 * 1000) // in 60 secs
                            });
                        }
                    }
                />

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userID.uid,
    };
}

export default connect(
    mapStateToProps
)(CountChart);
