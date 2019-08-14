import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";

import Login from './src/screens/Login'
import Dashboard from './src/screens/Dashboard'
import SearchCap from './src/screens/SearchCap'
import RegisterCap from './src/screens/RegisterCap'
import Feedback from './src/screens/Feedback'
import FeedbackList from './src/screens/FeedbackList'
import FeedbackDetails from './src/screens/FeedbackDetails'

import Header from './src/components/Header'
import DrawerContainer from './src/components/DrawerContainer'

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

const AppDrawer = createDrawerNavigator(
	{
		Feedback: FeedbackStack,
		Dashboard: DashboardStack,
		SearchCap: SearchCapStack,
		RegisterCap: RegisterCapStack,
	},
	{
		contentComponent: ({ navigation }) => <DrawerContainer navigation={navigation} />,
		drawerWidth: 300,
	}
);

export default createAppContainer(
	createSwitchNavigator(
		{
			Login: LoginStack,
			App: AppDrawer,
		},
		{
			initialRouteName: 'App'
		}
	)
);
