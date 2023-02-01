import { useRecoilState } from "recoil";
import { netinfoSelector } from "~/recoil/selector/netinfoSelector";

export const useNetInfoHook = () => {
	const [netInfo, setNetInfo] = useRecoilState(netinfoSelector);

	return {
		netInfo,
		setNetInfo
	};
};
