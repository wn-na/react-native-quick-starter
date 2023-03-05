import { MainStackNavigation } from "@navigation/mainStack";
import theme from "@styles/theme";
import { Fcm } from "@utils/push/firebaseCloudMessage";
import { LocalNotification } from "@utils/push/localNotification";
import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import Config from "react-native-config";
import SplashScreen from "react-native-splash-screen";
import { ThemeProvider } from "styled-components";

export const Route = () => {
	const [appTheme, setAppTheme] = useState<keyof typeof theme>("light");

	useEffect(() => {
		Appearance.addChangeListener(({ colorScheme }) => {
			setAppTheme(Appearance.getColorScheme() === "dark" ? "dark" : "light");
		});
		setTimeout(() => {
			SplashScreen.hide();
		}, 2000);
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
		<ThemeProvider theme={theme[appTheme]}>
			<MainStackNavigation />
		</ThemeProvider>
	);
};
