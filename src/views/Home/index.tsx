import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/component/atoms/Text";
import axiosMockInstance, { axiosMockAdapterInstance } from "~/network/mock";
import { useThemeStyle } from "~/styles/theme";

axiosMockAdapterInstance.onGet("api/health_check").reply(200, {
	response: {
		health: {
			server: true,
			database: true
		}
	}
});

export const Home: React.FC = (props) => {
	const [mockInfo, setMockInfo] = useState<any>();

	const theme = useThemeStyle();

	useEffect(() => {
		axiosMockInstance
			.get("api/health_check")
			.then((res) => res.data)
			.then(setMockInfo)
			.catch(setMockInfo);
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center",
				backgroundColor: theme.color.white
			}}
		>
			{mockInfo && <Text style={{ ...theme.fontFamily.Bold }}>{JSON.stringify(mockInfo, null, "  ")}</Text>}
		</SafeAreaView>
	);
};
