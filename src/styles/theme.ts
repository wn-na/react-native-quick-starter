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

const defaultTheme = {
	fontSize,
	padding,
	margin,
	fontFamily: fontFamily
};

export default {
	light: { ...defaultTheme, color: lightColors },
	dark: { ...defaultTheme, color: darkColors }
};
