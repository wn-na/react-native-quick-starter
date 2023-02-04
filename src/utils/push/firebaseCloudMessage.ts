import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import { LocalNotification } from "./localNotification";

type FCMRegisterFunction = (token: string) => void;

const FcmError = (name: string) => (param?: any) => console.warn(`[Fcm] ${name} error: `, param);

export class Fcm {
	static messageListener: any;

	static register = async (
		onRegister: FCMRegisterFunction,
		onNotification?: (notification: any) => void,
		onOpenNotification?: (
			notification: any,
			/**
			 * QUIT: 아에 종료된 상태일때,
			 * OPEN: 앱 실행중
			 */
			type: "QUIT" | "RUNNING"
		) => void
	) => {
		if (Platform.OS === "ios") {
			await messaging().setAutoInitEnabled(true);
		}
		this.checkPermission(onRegister);

		messaging().onTokenRefresh(onRegister);

		messaging().onNotificationOpenedApp((remoteMessage) => {
			if (remoteMessage) {
				onOpenNotification?.(remoteMessage.notification, "RUNNING");
			}
		});

		messaging()
			.getInitialNotification()
			.then((remoteMessage) => {
				if (remoteMessage) {
					onOpenNotification?.(remoteMessage.notification, "QUIT");
				}
			})
			.catch(FcmError("getInitialNotification"));

		this.messageListener = messaging().onMessage(async (remoteMessage) => {
			if (remoteMessage) {
				const notification = Platform.OS === "ios" ? remoteMessage?.data?.notification : remoteMessage.notification;
				if (onNotification) {
					onNotification(notification);
				} else {
					LocalNotification.sendLocalNotification({ id: 0, data: notification as any });
				}
			}
		});
	};

	static checkPermission = (onRegister: FCMRegisterFunction) => {
		messaging()
			.hasPermission()
			.then((enabled) => {
				if (enabled) {
					this.getToken(onRegister);
				} else {
					this.requestPermission(onRegister);
				}
			})
			.catch(FcmError("checkPermission"));
	};

	static getToken = (onRegister: FCMRegisterFunction) => {
		messaging()
			.getToken()
			.then((fcmToken) => {
				if (fcmToken) {
					onRegister(fcmToken);
				} else {
					console.log("[fcm] not have a device token");
				}
			})
			.catch(FcmError("getToken"));
	};

	static requestPermission = (onRegister: FCMRegisterFunction) => {
		messaging()
			.requestPermission()
			.then(() => this.getToken(onRegister))
			.catch(FcmError("requestPermission"));
	};

	static deleteToken = () => {
		messaging().deleteToken().catch(FcmError("deleteToken"));
	};

	static unRegister = () => {
		this.messageListener?.();
	};
}
