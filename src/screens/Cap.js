import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import ListCaps from './ListCaps'
import RegisterCap from './RegisterCap'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TabBottom = createBottomTabNavigator (
    {
        ListCaps: { 
            screen: ListCaps,
            navigationOptions: () => ({
                title: 'Listar Caps'
            })
        },
        RegisterCap: { 
            screen: RegisterCap,
            navigationOptions: () => ({
                title: 'Cadastrar Cap'
            })
        },
    }, {
        initialRouteName: 'ListCaps',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName

                if (routeName === 'ListCaps') {
                    iconName = 'view-list'

                } else if (routeName === 'RegisterCap') {
                    iconName = 'map-marker-plus';
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