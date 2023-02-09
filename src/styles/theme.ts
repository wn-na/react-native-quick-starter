import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { darkColors, lightColors } from "./colors";

type STYLE_KEY = "center" | "textCenter";
const style: Record<STYLE_KEY, any> = {
	center: {
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center"
	},
	textCenter: { textAlign: "center", textAlignVertical: "center" }
};

interface ThemeItem {
	color: typeof lightColors;
	style: typeof style;
	isDarkMode: boolean;
}

const defaultTheme: Omit<ThemeItem, "color" | "isDarkMode"> = {
	style
};

const theme: Record<"light" | "dark", ThemeItem> = {
	light: { ...defaultTheme, color: lightColors, isDarkMode: false },
	dark: { ...defaultTheme, color: darkColors, isDarkMode: true }
};
export default theme;

export const useThemeStyle = (): ThemeItem => useContext(ThemeContext);
