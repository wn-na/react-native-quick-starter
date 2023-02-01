import { TextStyle } from "react-native";

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
type FONT_WEIGHT = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];

export const fontFamily: Record<FONT_WEIGHT, Pick<TextStyle, "fontFamily" | "fontWeight">> = {
	Thin: { fontFamily: "Pretendard-Thin", fontWeight: "100" },
	ExtraLight: { fontFamily: "Pretendard-ExtraLight", fontWeight: "200" },
	Light: { fontFamily: "Pretendard-Light", fontWeight: "300" },
	Regular: { fontFamily: "Pretendard-Regular", fontWeight: "400" },
	Medium: { fontFamily: "Pretendard-Medium", fontWeight: "500" },
	SemiBold: { fontFamily: "Pretendard-SemiBold", fontWeight: "600" },
	Bold: { fontFamily: "Pretendard-Bold", fontWeight: "700" },
	ExtraBold: { fontFamily: "Pretendard-ExtraBold", fontWeight: "800" },
	Black: { fontFamily: "Pretendard-Black", fontWeight: "900" }
};
