import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

import Routes from './routes'
import NavBar from '../../components/NavBar'

const main = {}

const routeMapping = route => ({
    screen: route.screen,
    title: route.title,
})

Routes.forEach(route => {
    main[route.id] = routeMapping(route)
})

const DrawerRoutes = Object.keys(main).reduce((routes, name) => {
    const rawRoutes = routes
    rawRoutes[name] = {
        name,
        screen: createStackNavigator(main, {
            initialRouteName: name,
            headerMode: 'screen',
            cardStyle: { backgroundColor: 'transparent' },
            defaultNavigationOptions: ({ navigation }) => ({
                header: props => <NavBar navigation={navigation} headerProps={props} />
            })
        })
    }

    return rawRoutes
}, {})

export default DrawerRoutes
