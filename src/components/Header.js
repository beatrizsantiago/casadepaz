import React from 'react';

import { Bar, Button, TitleCenter, Title } from './styles/HeaderStyled'
import Icon from 'react-native-vector-icons/Ionicons'

export default Header = props => {
	const toggleDrawerButtonPressed = () => props.navigation.toggleDrawer();

	return (
		<Bar>
			<Button onPress={toggleDrawerButtonPressed}>
				<Icon name="ios-menu" size={50} color="#000" />
			</Button>
			<TitleCenter>
				<Title>{props.title}</Title>
			</TitleCenter>
		</Bar>
	);
}