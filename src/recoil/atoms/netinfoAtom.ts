import { NetInfoState } from "@react-native-community/netinfo";
import { atom } from "recoil";

export const netinfoAtom = atom<NetInfoState | undefined>({
	key: "netinfoAtom",
	// eslint-disable-next-line prettier/prettier, quote-props
	default: undefined
});
