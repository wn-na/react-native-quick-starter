/**
 * @format
 */
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import "~/utils/i18n";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
