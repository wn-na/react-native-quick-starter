import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import { Home } from "~/views/Home";

const Stack = createNativeStackNavigator();
export const MainStackNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Home'>
				<Stack.Screen name='Home' component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};
