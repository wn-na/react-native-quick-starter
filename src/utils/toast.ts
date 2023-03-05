import SimpleToast from "react-native-simple-toast";

export const ToastMessageDuration = {
	SHORT: SimpleToast.SHORT,
	LONG: SimpleToast.LONG
};

export type ToastMessageParam = { text: string; duration: number; option?: { timeout: number } };
export const ToastMessage = (text: string, duration: number, option?: { timeout: number }) => {
	setTimeout(() => {
		SimpleToast.show(text, duration);
	}, option?.timeout || 100);
};
