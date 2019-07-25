import React, { Component } from 'react';

import { Modal, View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default class Loading extends Component {

    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render = () => {
        return (
            <Modal animationType="fade" transparent={true} visible={this.state.modalVisible}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
        color: '#fff',
        fontSize: 22,
    }
})