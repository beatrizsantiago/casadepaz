import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import ListLeaderCap from './ListLeaderCap'
import RegisterLeaderCap from './RegisterLeaderCap'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TabBottom = createBottomTabNavigator (
    {
        ListLeader: { 
            screen: ListLeaderCap,
            navigationOptions: () => ({
                title: 'Listar Líder'
            })
        },
        RegisterLeader: { 
            screen: RegisterLeaderCap,
            navigationOptions: () => ({
                title: 'Cadastrar Líder'
            })
        },
    }, {
        initialRouteName: 'ListLeader',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName

                if (routeName === 'ListLeader') {
                    iconName = 'format-list-checkbox'

                } else if (routeName === 'RegisterLeader') {
                    iconName = 'account-multiple-plus';
                }
        
                return <Icon name={iconName} size={26} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#9e4700',
            activeBackgroundColor: '#f68121',
            style: {
                backgroundColor: '#e6781e'
            },
            keyboardHidesTabBar: true
        },
    }
)

export default TabBottom