/**
 * @format
 */
import messaging from "@react-native-firebase/messaging";
import React from "react";
import { AppRegistry } from "react-native";
import Config from "react-native-config";
import "react-native-gesture-handler";
import "~/utils/i18n";
import App from "./App";
import { name as appName } from "./app.json";

if (Config.USE_PUSH == "true" && Config.USE_FIREBASE == "true") {
	messaging().setBackgroundMessageHandler(async (remoteMessage) => {
		console.log("Background remote message: ", remoteMessage);
	});
}

function HeadlessCheck({ isHeadless }) {
	if (isHeadless) {
		return null;
	}

	return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
