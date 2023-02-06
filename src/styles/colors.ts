import { ColorPaletteKeys, ColorUtils } from "@utils/colors";

const defaultLightColors = {
	black: "#000000",
	white: "#FFFFFF",
	primary: "#90caf9",
	error: "#f44336",
	warning: "#ffa726",
	success: "#66bb6a",
	info: "#29b6f6",
	secondary: "#ce93d8",
	gray: "#CDCDCD"
};

export const lightColors = Object.entries(defaultLightColors).reduce(
	(acc, [key, value]) => ({ ...acc, ...ColorUtils.colorPalette(key, value) }),
	{} as Record<ColorPaletteKeys<keyof typeof defaultLightColors>, string>
);

export type BasicAppColors = keyof typeof defaultLightColors;
export type AppColors = keyof typeof lightColors;

export const defaultDarkColors: Record<BasicAppColors, any> = {
	black: "#FFFFFF",
	white: "#000000",
	primary: "#90caf9",
	error: "#f44336",
	warning: "#ffa726",
	success: "#66bb6a",
	info: "#29b6f6",
	secondary: "#ce93d8",
	gray: "#CDCDCD"
};

export const darkColors = Object.entries(defaultDarkColors).reduce(
	(acc, [key, value]) => ({ ...acc, ...ColorUtils.colorPalette(key, value) }),
	{} as Record<ColorPaletteKeys<keyof typeof defaultLightColors>, string>
);
