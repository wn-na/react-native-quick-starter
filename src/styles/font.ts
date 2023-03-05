import { Platform, TextStyle } from "react-native";
import { AppColors } from "./colors";

const FONT_WEIGHT = {
	100: "Thin",
	200: "ExtraLight",
	300: "Light",
	400: "Regular",
	500: "Medium",
	600: "SemiBold",
	700: "Bold",
	800: "ExtraBold",
	900: "Black"
} as const;
export type FONT_WEIGHT = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];

const fontFamily: Record<FONT_WEIGHT, Required<Pick<TextStyle, "fontFamily" | "fontWeight">>> = {
	Thin: { fontFamily: "Pretendard-Thin", fontWeight: Platform.OS === "ios" ? "100" : "normal" },
	ExtraLight: { fontFamily: "Pretendard-ExtraLight", fontWeight: Platform.OS === "ios" ? "200" : "normal" },
	Light: { fontFamily: "Pretendard-Light", fontWeight: Platform.OS === "ios" ? "300" : "normal" },
	Regular: { fontFamily: "Pretendard-Regular", fontWeight: Platform.OS === "ios" ? "400" : "normal" },
	Medium: { fontFamily: "Pretendard-Medium", fontWeight: Platform.OS === "ios" ? "500" : "normal" },
	SemiBold: { fontFamily: "Pretendard-SemiBold", fontWeight: Platform.OS === "ios" ? "600" : "normal" },
	Bold: { fontFamily: "Pretendard-Bold", fontWeight: Platform.OS === "ios" ? "700" : "normal" },
	ExtraBold: { fontFamily: "Pretendard-ExtraBold", fontWeight: Platform.OS === "ios" ? "800" : "normal" },
	Black: { fontFamily: "Pretendard-Black", fontWeight: Platform.OS === "ios" ? "900" : "normal" }
};

export type FONT_SIZE = "XXXL" | "XXL" | "XL" | "L" | "M" | "S" | "XS";

const fontSize: Record<FONT_SIZE, number> = {
	XXXL: 36,
	XXL: 24,
	XL: 20,
	L: 16,
	M: 14,
	S: 12,
	XS: 11
};

export type FONT_LINE_HEIGHT = "Tight" | "Heading" | "Caption" | "Deafult" | "Form";

const fontLineHeight: Record<FONT_LINE_HEIGHT, number> = {
	Tight: 1.15,
	Heading: 1.2,
	Caption: 1.3,
	Deafult: 1.5,
	Form: 20
};
export const setFontStyle = (size: FONT_SIZE, lineHeight: FONT_LINE_HEIGHT) => {
	if (!size) {
		return {
			fontSize: fontSize.L,
			lineHeight: Math.floor(fontSize.L * fontLineHeight.Deafult)
		};
	}
	if (!lineHeight) {
		return {
			fontSize: fontSize[size],
			lineHeight: Math.floor(fontSize[size] * fontLineHeight.Deafult)
		};
	}
	return {
		fontSize: fontSize[size],
		lineHeight: fontLineHeight[lineHeight] > 2 ? fontLineHeight[lineHeight] : Math.floor(fontSize[size] * fontLineHeight[lineHeight])
	};
};

export const font = {
	size: fontSize,
	lineHeight: fontLineHeight,
	weight: fontFamily
};

export type FontStyle = {
	size?: FONT_SIZE;
	lineHeight?: FONT_LINE_HEIGHT;
	weight?: FONT_WEIGHT;
	color?: AppColors;
};
