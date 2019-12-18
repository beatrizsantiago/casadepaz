import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/Ionicons'

import { Bar, Button, TitleCenter, Title } from './styles/HeaderStyled'

export default class NavBar extends Component {

    menuButtonPressed = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer())
    }

    leftBackButtonPressed = () => {
        this.props.navigation.goBack();
    };

    renderNavigationLeftBackItem = options => {
        let leftOptions = options === undefined
        if (leftOptions) {
            return (
                <TouchableOpacity onPress={() => this.leftBackButtonPressed()} style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                    <Icon name='ios-arrow-back' size={30} color="#fff" />
                </TouchableOpacity>
            )
        } else {
            return <View>{options}</View>
        }
    }

    renderNavigationLeftMenuItem = () => (
        <TouchableOpacity onPress={() => this.menuButtonPressed()} style={{ marginLeft: 10 }}>
            <Icon name='ios-menu' size={35} color="#fff" />
        </TouchableOpacity>
    )

    renderNavigationLeftItemContent = (sceneIndex, options) => {
        const isFirstScene = sceneIndex === 0;
        return isFirstScene ? this.renderNavigationLeftMenuItem() : this.renderNavigationLeftBackItem(options);
    };

    renderNavigationRightMenuItem = options => (
        <View>{options}</View>
    )

    renderNavigationRightItemContent = options => {
        const isCustom = options !== undefined;
        if (isCustom) {
            return this.renderNavigationRightMenuItem(options)
        }
    }

    render() {
        const { routeName } = this.props.navigation.state
        const sceneIndex = this.props.headerProps.navigation.state.index
        const { options } = this.props.headerProps.scene.descriptor

        return (
            <Bar>
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>{routeName}</Text>
                </View>
                <View style={styles.headerItens}>
                    {this.renderNavigationLeftItemContent(sceneIndex, options.headerLeft)}
                    {this.renderNavigationRightItemContent(options.headerRight)}
                </View>
            </Bar>
        )
    }
}

const styles = StyleSheet.create({
    headerItens: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    titleHeader: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 14,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    }
})
