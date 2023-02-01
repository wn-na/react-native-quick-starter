/* eslint-disable max-len */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { useNetInfo } from "@react-native-community/netinfo";
import React, { useEffect, type PropsWithChildren } from "react";
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";
import CodePush from "react-native-code-push";

import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { useNetInfoHook } from "~/hooks/netinfoHooks";
import axiosMockInstance, { axiosMockAdapterInstance } from "~/network/mock";
import Config from "./Config";

axiosMockAdapterInstance.onGet("api/health_check").reply(200, {
	response: {
		health: {
			server: true,
			database: true
		}
	}
});

const Section: React.FC<
	PropsWithChildren<{
		title: string;
	}>
> = ({ children, title }) => {
	const isDarkMode = useColorScheme() === "dark";

	const test = useNetInfo();
	const { netInfo, setNetInfo } = useNetInfoHook();
	useEffect(() => {
		if (test) {
			setNetInfo(test);
		}
	}, [test]);

	useEffect(() => {
		if (netInfo) {
			console.log(netInfo);
		}
	}, [netInfo]);

	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black
					}
				]}
			>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: isDarkMode ? Colors.light : Colors.dark
					}
				]}
			>
				{children}
			</Text>
		</View>
	);
};

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	const queryClient = new QueryClient();
	/**
	 * if you want debug use this
	 * https://github.com/bgaleotti/react-query-native-devtools/tree/main/packages/react-query-native-devtools
	 */

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
	};
	useEffect(() => {
		axiosMockInstance
			.get("api/health_check")
			.then((res) => {
				console.log("TEST", res.data);
			})
			.catch(console.warn);
	}, []);

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<SafeAreaView style={backgroundStyle}>
					<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={backgroundStyle.backgroundColor} />
					<ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
						<Header />
						<View
							style={{
								backgroundColor: isDarkMode ? Colors.black : Colors.white
							}}
						>
							<Section title='Step One'>
								Edit <Text style={styles.highlight}>App.tsx</Text> to change this screen and then come back to see your edits.
							</Section>
							<Section title='See Your Changes'>
								<ReloadInstructions />
							</Section>
							<Section title='Debug'>
								<DebugInstructions />
							</Section>
							<Section title='Learn More'>Read the docs to discover what to do next:</Section>
							<LearnMoreLinks />
						</View>
					</ScrollView>
				</SafeAreaView>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600"
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400"
	},
	highlight: {
		fontWeight: "700"
	}
});
const codePushOptions = {
	checkFrequency: Platform.select({
		ios: CodePush.CheckFrequency.ON_APP_RESUME,
		android: CodePush.CheckFrequency.ON_APP_START
	}),
	installMode: CodePush.InstallMode.IMMEDIATE
};

export default Config.codepush ? CodePush(codePushOptions)(App) : App;
