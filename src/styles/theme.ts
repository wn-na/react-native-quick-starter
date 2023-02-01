import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { darkColors, lightColors } from "./colors";
import { fontFamily } from "./font";

type ThemeSize = "SM" | "MD" | "LG" | "XL";
const fontSize: Record<ThemeSize, number> = {
	SM: 12,
	MD: 16,
	LG: 20,
	XL: 24
};

const padding: Record<ThemeSize, number> = {
	SM: 8,
	MD: 12,
	LG: 16,
	XL: 20
};

const margin: Record<ThemeSize, number> = {
	SM: 8,
	MD: 12,
	LG: 16,
	XL: 20
};

interface ThemeItem {
	fontSize: typeof fontSize;
	padding: typeof padding;
	margin: typeof margin;
	fontFamily: typeof fontFamily;
	color: typeof lightColors;
}

const defaultTheme: Omit<ThemeItem, "color"> = {
	fontSize,
	padding,
	margin,
	fontFamily: fontFamily
};

const theme: Record<"light" | "dark", ThemeItem> = {
	light: { ...defaultTheme, color: lightColors },
	dark: { ...defaultTheme, color: darkColors }
};
export default theme;

export const useThemeStyle = (): ThemeItem => useContext(ThemeContext);
