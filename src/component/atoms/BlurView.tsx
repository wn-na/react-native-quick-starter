import React from "react";
import { Dimensions, View } from "react-native";
import WebView from "react-native-webview";

export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

export interface BlurContainerProps {
	backgroundColor: RGBA;
	blurRadius: number;
}

const BlurView: React.FC<BlurContainerProps> = ({ backgroundColor, blurRadius }) => {
	return (
		<View
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: "#00000000",
				overflow: "hidden"
			}}
		>
			<WebView
				style={{
					width: "100%",
					height: "100%",
					backgroundColor: "#00000000"
				}}
				originWhitelist={["*"]}
				overScrollMode='never'
				scrollEnabled={false}
				source={{
					html: `
          <html>
            <head>
              <meta name="viewport" content="initial-scale=1.0 maximum-scale=1.0" />
              <style>
                .blur {
                  position: absolute;
                  top: 0;
                  right:0;
                  bottom: 0;
                  left: 0;
                  height: ${Dimensions.get("screen").height}px;
                  background: ${backgroundColor};
                  -webkit-backdrop-filter: blur(${blurRadius}px);
                  backdrop-filter: blur(${blurRadius}px);
                }
              </style>
            </head>
            <body>
              <div class="blur" />
            </body>
          </html>
        `
				}}
			/>
		</View>
	);
};

export default BlurView;
