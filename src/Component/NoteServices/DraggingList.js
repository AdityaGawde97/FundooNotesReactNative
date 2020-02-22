import React, { Component, createRef } from 'react';
import { View, Text, StyleSheet, FlatList, PanResponder, Animated, SafeAreaView } from 'react-native';

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;

}

function immutableMove(arr, from, to) {
    return arr.reduce((prev, current, idx, self) => {
        if (from === to) {
            prev.push(current);
        }
        if (idx === from) {
            return prev;
        }
        if (from < to) {
            prev.push(current);
        }
        if (idx === to) {
            prev.push(self[from]);
        }
        if (from > to) {
            prev.push(current);
        }
        return prev;
    }, []);
}

const colorMap = {}


export default class DragginList extends Component {

    point = new Animated.ValueXY();
    scrollOffset = 0;
    flatListTopOffset = 0;
    rowHeight = 0;
    currentIdx = -1;
    currentY = 0;
    active = false;
    flatListHeight = 0;

    constructor(props) {
        super(props);
        this.state = {
            dragging: false,
            draggingIdx: -1,
            data: Array.from(Array(200), (_, i) => {
                colorMap[i] = getRandomColor()
                return i;
            })
        };
        this.flatList = createRef()
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                // The gesture has started. Show visual feedback so the user knows
                // what is happening!
                // gestureState.d{x,y} will be set to zero now

                this.currentY = gestureState.y0
                this.currentIdx = this.yToIndex(gestureState.y0);

                Animated.event([{ y: this.point.y }])({ y: gestureState.y0 - this.rowHeight / 2 });

                this.active = true;

                this.setState({ dragging: true, draggingIdx: this.currentIdx }, () => {
                    this.animateList();
                });
            },
            onPanResponderMove: (evt, gestureState) => {

                this.currentY = gestureState.moveY
                Animated.event([{ y: this.point.y }])({ y: gestureState.moveY - this.rowHeight / 2 });
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                this.reset()
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                this.reset()
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            },
        });
    }

    yToIndex = (y) => {
        const value = Math.floor(
            (this.scrollOffset + y - this.flatListTopOffset) / this.rowHeight
        );

        if (value < 0) {
            return 0;
        }

        if (value > this.state.data.length) {
            return this.state.data.length - 1;
        }

        return value;
    }

    animateList = () => {

        if (this.currentY + 100 > this.flatListHeight) {
            this.flatList.current.scrollToOffset({
                offset: this.scrollOffset + 20,
                animated: false
            });
        }
        else if (this.currentY < 100) {
            this.flatList.current.scrollToOffset({
                offset: this.scrollOffset - 20,
                animated: false
            });
        }

        if (!this.active) {
            return;
        }

        requestAnimationFrame(() => {
            const newIdx = this.yToIndex(this.currentY);
            if (this.currentIdx !== newIdx) {
                this.setState({
                    data: immutableMove(this.state.data, this.currentIdx, newIdx),
                    draggingIdx: newIdx
                })
                this.currentIdx = newIdx;
            }
            this.animateList()
        })
    }

    reset = () => {
        this.active = false;
        this.setState({ dragging: false, draggingIdx: -1 })
    }

    render() {

        const renderItem = ({ item, index }, noPanResponder = false) => (
            <View
                style={{
                    padding: 16,
                    backgroundColor: colorMap[item],
                    flexDirection: 'row',
                    opacity: this.state.draggingIdx === index ? 0 : 1
                }}
                onLayout={e => {
                    this.rowHeight = e.nativeEvent.layout.height
                }}
            >
                <View {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
                    <Text style={{ fontSize: 28 }}>@</Text>
                </View>
                <Text style={{ fontSize: 22, textAlign: 'center', flex: 1 }}>{item}</Text>
            </View>
        )

        return (
            <SafeAreaView style={styles123.container}>
                {
                    this.state.dragging &&
                    <Animated.View
                        style={{
                            position: 'absolute',
                            backgroundColor: 'black',
                            zIndex: 2,
                            width: '100%',
                            top: this.point.getLayout().top
                        }}
                    >
                        {renderItem({ item: this.state.data[this.state.draggingIdx], index: -1 }, true)}
                    </Animated.View>
                }

                <FlatList
                    ref={this.flatList}
                    scrollEnabled={!this.state.dragging}
                    style={{ width: '100%' }}
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item}
                    onScroll={e => {
                        this.scrollOffset = e.nativeEvent.contentOffset.y
                    }}
                    scrollEventThrottle={16}
                    onLayout={e => {
                        this.flatListTopOffset = e.nativeEvent.layout.y;
                        this.flatListHeight = e.nativeEvent.layout.height;
                    }}
                />
            </SafeAreaView>
        );
    }
}

const styles123 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
