import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import axiosMockInstance, { axiosMockAdapterInstance } from "~/network/mock";
import { useThemeStyle } from "~/styles/theme";

axiosMockAdapterInstance.onGet("api/health_check").reply(200, {
	response: {
		health: {
			server: true,
			database: true
		}
	}
});

export const Home: React.FC = (props) => {
	const [mockInfo, setMockInfo] = useState<any>();

	const theme = useThemeStyle();

	useEffect(() => {
		axiosMockInstance
			.get("api/health_check")
			.then((res) => res.data)
			.then(setMockInfo)
			.catch(setMockInfo);
	}, []);

	const value = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		width: value.value * 350
	}));

	const toggle = () => {
		value.value = withSpring(Math.random());
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
				backgroundColor: theme.color.white
			}}
		>
			<Animated.View style={[{ height: 80, backgroundColor: "black", margin: 30 }, animatedStyle]} />
			<Button title='toggle' onPress={toggle} />
			{mockInfo && <Animated.Text style={{ ...theme.fontFamily.Bold }}>{JSON.stringify(mockInfo, null, "  ")}</Animated.Text>}
		</SafeAreaView>
	);
};
