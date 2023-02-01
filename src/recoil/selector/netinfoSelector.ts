import { NetInfoState } from "@react-native-community/netinfo";
import { DefaultValue, selector } from "recoil";
import { netinfoAtom } from "../atoms/netinfoAtom";

export const netinfoSelector = selector<NetInfoState | undefined>({
	key: "netinfoSelector",
	get: ({ get }) => {
		return get(netinfoAtom);
	},
	set: ({ set }, newValue) => set(netinfoAtom, newValue instanceof DefaultValue ? undefined : newValue)
});
