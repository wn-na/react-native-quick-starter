export const lightColors = {
	black: "#000000",
	white: "#FFFFFF",
	error: "",
	warning: "",
	success: "",
	info: "",
	primary: "",
	secondary: "",
	gray: ""
};

export type AppColors = keyof typeof lightColors;
export const darkColors: Record<AppColors, any> = {
	black: "#000000",
	white: "#FFFFFF"
};

const setOpacity = (hex: string, alpha: number) =>
	`${hex}${Math.floor(alpha * 255)
		.toString(16)
		.padStart(2, "0")}`;

const setDisabled = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.3);
	}
	return undefined;
};

const setHover = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.7);
	}
	return undefined;
};

const setPressed = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.5);
	}
	return undefined;
};

export const ColorUtils = {
	setOpacity,
	setDisabled,
	setHover,
	setPressed
};
