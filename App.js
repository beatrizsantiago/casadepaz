import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Splash from './src/screens/Splash'
import Login from './src/screens/Login'
import Dashboard from './src/screens/Dashboard'
import SearchCap from './src/screens/SearchCap'
import RegisterCap from './src/screens/RegisterCap'
import Feedback from './src/screens/Feedback'
import FeedbackList from './src/screens/FeedbackList'
import FeedbackDetails from './src/screens/FeedbackDetails'
import ListLeaderCap from './src/screens/ListLeaderCap'
import RegisterLeaderCap from './src/screens/RegisterLeaderCap'

import Header from './src/components/Header'
import DrawerContainer from './src/components/DrawerContainer'

const SplahStack = createStackNavigator({ Splash })

const LoginStack = createStackNavigator({ Login })

const DashboardStack = createStackNavigator({
	Dashboard: {
		screen: Dashboard,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Dashboard" />
		})
	}
})

const SearchCapStack = createStackNavigator({
	SearchCap: {
		screen: SearchCap,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Pesquisar Cap" />
		})
	}
})

const RegisterCapStack = createStackNavigator({
	RegisterCap: {
		screen: RegisterCap,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Cadastrar Cap" />
		})
	}
})

const FeedbackStack = createStackNavigator({
	Feedback: {
		screen: Feedback,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Feedback" />
		})
	},
	FeedbackList: {
		screen: FeedbackList,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Feedback" />
		})
	},
	FeedbackDetails: {
		screen: FeedbackDetails,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Detalhes Feedback" />
		})
	}
})

const ListLeaderStack = createStackNavigator({
	ListLeaderCap: {
		screen: ListLeaderCap,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Líderes de Cap" />,
		})
	}
})

const RegisterLeaderStack = createStackNavigator({
	RegisterLeaderCap: {
		screen: RegisterLeaderCap,
		headerMode: 'screen',
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Cadastrar Líder" />,
		})
	}
})

const TabBottom = createBottomTabNavigator (
	{
		ListLeader: { 
			screen: ListLeaderStack,
			navigationOptions: () => ({
				// tabBarIcon: <Icon name="format-list-checkbox" size={25} color="#000" />,
				title: 'Listar Líder'
			})
		},
		RegisterLeader: { 
			screen: RegisterLeaderStack,
			navigationOptions: () => ({
				// tabBarIcon: <Icon name="account-multiple-plus" size={25} color="#000" />,
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

const AppDrawer = createDrawerNavigator(
	{
		Dashboard: DashboardStack,
		SearchCap: SearchCapStack,
		Feedback: FeedbackStack,
		RegisterCap: RegisterCapStack,
		LeaderCap: TabBottom,
	},
	{
		contentComponent: ({ navigation }) => <DrawerContainer navigation={navigation} />,
		drawerWidth: 300,
	}
);

export default createAppContainer(
	createSwitchNavigator(
		{
			Splash: SplahStack,
			Login: LoginStack,
			App: AppDrawer,
		},
		{
			initialRouteName: 'Splash'
		}
	)
);
