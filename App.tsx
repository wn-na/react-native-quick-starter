import React, { useEffect, useState } from "react";
import { Appearance, Platform } from "react-native";
import CodePush from "react-native-code-push";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Fcm } from "@utils/push/firebaseCloudMessage";
import { LocalNotification } from "@utils/push/localNotification";
import Config from "react-native-config";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { MainStackNavigation } from "~/navigation/mainStack";
import theme from "~/styles/theme";

const App = () => {
	const [appTheme, setAppTheme] = useState<keyof typeof theme>("light");

	/**
	 * if you want debug use this
	 * https://github.com/bgaleotti/react-query-native-devtools/tree/main/packages/react-query-native-devtools
	 */
	const queryClient = new QueryClient();

	useEffect(() => {
		Appearance.addChangeListener(({ colorScheme }) => {
			setAppTheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
		});
	}, []);

	useEffect(() => {
		if (Config.USE_PUSH == "true") {
			if (Config.USE_FIREBASE == "true") {
				Fcm.register(onRegister, onNotification, onOpenNotification);
			}
			LocalNotification.configure(console.log);
		}
	}, []);

	const onRegister = (token: string) => {
		console.log("onRegister:", token);
	};

	const onNotification = (notification: any) => {
		console.log("onNotification:", notification);
		const options = {
			soundName: "default",
			playSound: true
		};

		LocalNotification.sendLocalNotification({ id: 0, data: notification, options });
	};

	const onOpenNotification = (notification: any, type: "QUIT" | "RUNNING") => {
		console.log("onOpenNotification:", type, notification);
	};

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

export default Config.USE_CODEPUSH == "true" ? CodePush(codePushOptions)(App) : App;
