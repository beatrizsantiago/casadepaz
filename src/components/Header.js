import React from 'react';

import { Bar, Button, TitleCenter, Title } from './styles/HeaderStyled'
import Icon from 'react-native-vector-icons/Ionicons'

export default Header = props => {
	const toggleDrawerButtonPressed = () => props.navigation.toggleDrawer();

	return (
		<Bar>
			<Button onPress={toggleDrawerButtonPressed}>
				<Icon name="ios-menu" size={42} color="#fff" />
			</Button>
			<TitleCenter>
				<Title style={{color: '#fff'}}>{props.title}</Title>
			</TitleCenter>
		</Bar>
	);
}