import { Dimensions, Platform } from "react-native";

const getDeviceWidth = () => Dimensions.get("window").width;
const getDeviceHeight = () =>
	Platform.OS === "ios" ? Dimensions.get("window").height : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

export { getDeviceHeight, getDeviceWidth };
