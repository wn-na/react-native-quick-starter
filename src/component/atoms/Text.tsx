import React from "react";
import { Platform, Text as RNText, TextProps } from "react-native";
import { fontFamily } from "~/styles/font";

export const Text: React.FC<TextProps> = ({ style, ...props }) => {
	return (
		<RNText
			{...props}
			style={[
				{ fontFamily: fontFamily.Regular.fontFamily },
				style,
				style && { letterSpacing: Platform.OS == "android" ? 0 : (style as any)?.letterSpacing }
			]}
		/>
	);
};
