import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class WebWorker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = () => {
        let worker;
        console.log(window.Worker)
        if (window.Worker) {
            console.log('worker available')
            worker = new Worker('worker.js')
            console.log(worker)
        }
        else {
            console.log('worker not available')
        }

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>
                    {
                        window.Worker ? 'worker available' : 'worker not available'
                    }
                </Text>
            </View>
        );
    }
}
