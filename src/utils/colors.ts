import { ColorAdjustment } from "color-token";

/** `#aaaaaa`의 형태로 전달해주세요 */
const setDisabled = (hex?: string) => {
	if (hex) {
		return ColorAdjustment.opacity(hex, 0.3);
	}
	return undefined;
};

/** `#aaaaaa`의 형태로 전달해주세요 */
const setHover = (hex?: string) => {
	if (hex) {
		return ColorAdjustment.opacity(hex, 0.7);
	}
	return undefined;
};

/** `#aaaaaa`의 형태로 전달해주세요 */
const setPressed = (hex?: string) => {
	if (hex) {
		return ColorAdjustment.opacity(hex, 0.5);
	}
	return undefined;
};

export const ColorUtils = {
	setDisabled,
	setHover,
	setPressed
};
