import { Dimensions, PixelRatio } from "react-native";

type PercentString = `${number}%`;
const widthToDP = (width: number | PercentString) => {
	const screenWidth = Dimensions.get("window").width;
	if (typeof width === "number") {
		return PixelRatio.roundToNearestPixel(width);
	}
	const parseWidth = parseFloat(String(width));
	return PixelRatio.roundToNearestPixel((screenWidth * parseWidth) / 100);
};
const heightToDP = (height: number | PercentString) => {
	const screenHeight = Dimensions.get("window").height;
	if (typeof height === "number") {
		return PixelRatio.roundToNearestPixel(height);
	}
	const parseHeight = parseFloat(String(height));
	return PixelRatio.roundToNearestPixel((screenHeight * parseHeight) / 100);
};

export { widthToDP, heightToDP };
