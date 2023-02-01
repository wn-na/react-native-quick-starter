import React, { useEffect, useState } from "react";
import { Appearance, Platform } from "react-native";
import CodePush from "react-native-code-push";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { MainStackNavigation } from "~/navigation/mainStack";
import theme from "~/styles/theme";
import Config from "./Config";

const App = () => {
	const [appTheme, setAppTheme] = useState<keyof typeof theme>("light");

	useEffect(() => {
		Appearance.addChangeListener(({ colorScheme }) => {
			setAppTheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
		});
	}, []);

	/**
	 * if you want debug use this
	 * https://github.com/bgaleotti/react-query-native-devtools/tree/main/packages/react-query-native-devtools
	 */
	const queryClient = new QueryClient();

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme[appTheme]}>
					<SafeAreaProvider>
						<MainStackNavigation></MainStackNavigation>
					</SafeAreaProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

const codePushOptions = {
	checkFrequency: Platform.select({
		ios: CodePush.CheckFrequency.ON_APP_RESUME,
		android: CodePush.CheckFrequency.ON_APP_START
	}),
	installMode: CodePush.InstallMode.IMMEDIATE
};

export default Config.codepush ? CodePush(codePushOptions)(App) : App;
