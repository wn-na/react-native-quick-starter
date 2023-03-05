import React from "react";
import { Platform, Text as RNText, TextProps } from "react-native";
import { font, FontStyle, setFontStyle } from "~/styles/font";
import { useThemeStyle } from "~/styles/theme";

export const Text: React.FC<TextProps & FontStyle> = ({
	style,
	size = "L",
	weight = "Regular",
	lineHeight = "Deafult",
	color,
	...props
}) => {
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
