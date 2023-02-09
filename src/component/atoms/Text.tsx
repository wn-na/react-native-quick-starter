import React from "react";
import { Platform, Text as RNText, TextProps } from "react-native";
import { AppColors } from "~/styles/colors";
import { font, FONT_LINE_HEIGHT, FONT_SIZE, FONT_WEIGHT, setFontStyle } from "~/styles/font";
import { useThemeStyle } from "~/styles/theme";

export const Text: React.FC<
	TextProps & {
		size?: FONT_SIZE;
		lineHeight?: FONT_LINE_HEIGHT;
		weight?: FONT_WEIGHT;
		color?: AppColors;
	}
> = ({ style, size = "L", weight = "Regular", lineHeight = "Deafult", color, ...props }) => {
	const theme = useThemeStyle();
	return (
		<RNText
			{...props}
			style={[
				{ paddingTop: 2, margin: 0 },
				{ color: color || theme.color.black, textAlignVertical: "center" },
				{ ...font.weight[weight] },
				setFontStyle(size, lineHeight),
				style,
				{ letterSpacing: Platform.OS == "android" ? 0 : (style as any)?.letterSpacing || 0 }
			]}
			allowFontScaling={false}
		/>
	);
};
