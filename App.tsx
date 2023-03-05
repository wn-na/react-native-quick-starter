import { Route } from "@navigation/route";
import React from "react";
import { Platform } from "react-native";
import CodePush from "react-native-code-push";
import Config from "react-native-config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const App = () => {
	/**
	 * if you want debug use this
	 * https://github.com/bgaleotti/react-query-native-devtools/tree/main/packages/react-query-native-devtools
	 */
	const queryClient = new QueryClient();
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<Route />
				</SafeAreaProvider>
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
