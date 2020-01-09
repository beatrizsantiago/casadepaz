import React from 'react'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import SubmitPreaching from './SubmitPreaching'
import HistoricPreaching from './HistoricPreaching'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const TabBottom = createBottomTabNavigator (
    {
        Submit: { 
            screen: SubmitPreaching,
            navigationOptions: () => ({
                title: 'Enviar Palavra'
            })
        },
        Historic: { 
            screen: HistoricPreaching,
            navigationOptions: () => ({
                title: 'Histórico'
            })
        },
    }, {
        initialRouteName: 'Historic',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let iconName

                if (routeName === 'Submit') {
                    iconName = 'file-upload-outline'

                } else if (routeName === 'Historic') {
                    iconName = 'history';
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