/**
 * @format
 */
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import "~/utils/i18n";
import App from "./App";
import { name as appName } from "./app.json";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log("Background remote message: ", remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
	if (isHeadless) {
		return null;
	}

	return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
