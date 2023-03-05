import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";

import { name } from "~/../app.json";
type LocalNotificationMessage = {
	id: number;
	data: Record<string, any> | any;
	options?: {
		playSound?: boolean;
		soundName?: string;
		category?: string;
		alertAction?: string;
		largeIcon?: string;
		smallIcon?: string;
		vibrate?: boolean;
		vibration?: number;
		priority?: "high" | "default" | "max" | "low" | "min";
		importance?: "high" | "default" | "max" | "low" | "min" | "none" | "unspecified";
	};
};

export class LocalNotification {
	static configure = (onNotification?: (notification: Record<string, any>) => void) => {
		PushNotification.channelExists(name, (exists) => {
			if (!exists) {
				PushNotification.createChannel(
					{
						channelId: name,
						channelName: name,
						importance: Importance.HIGH
					},
					(created) => {
						console.log(`[PushChannel] channel: ${created}`);
					}
				);
			}
		});
		PushNotification.configure({
			onRegister: (token) => {
				console.log(`[LocalNotification=onRegister] token=${token}`);
			},
			onNotification: (notification) => {
				console.log(`[LocalNotification=onNotification] notification=${JSON.stringify(notification)}`);
				if (!notification?.data || Object.keys(notification?.data)?.length == 0) {
					return;
				}
				if (!notification.userInteraction && Platform.OS == "android") {
					return;
				}

				onNotification?.(Platform.OS === "ios" ? notification.data.item : notification.data);

				if (Platform.OS === "ios") {
					notification.finish(PushNotificationIOS.FetchResult.NoData);
				}
			},
			permissions: { alert: true, badge: true, sound: true },
			popInitialNotification: true,
			requestPermissions: true
		});
	};

	static unRegister = () => {
		PushNotification.unregister();
	};

	static sendLocalNotification = (message: LocalNotificationMessage) => {
		console.log(`[LocalNotification=sendLocalNotification] message=${JSON.stringify(message)}`);
		const defaultNotification = {
			title: message?.data?.title || "",
			message: message?.data?.body || "",
			playSound: message?.options?.playSound || false,
			soundName: message?.options?.soundName || "default",
			channelId: name
		};

		if (Platform.OS == "android") {
			PushNotification.localNotification({
				...LocalNotification.AndroidNotification(message),
				...defaultNotification
			});
		} else {
			PushNotification.localNotification({
				...LocalNotification.IOSNotification(message),
				...defaultNotification
			});
		}
	};

	static AndroidNotification = (message: LocalNotificationMessage) => {
		return {
			id: message?.id,
			authCancel: true,
			largeIcon: message?.options?.largeIcon || "ic_launcher",
			smallIcon: message?.options?.smallIcon || "ic_notification",
			bigText: message?.data?.body || "",
			subText: message?.data?.title || "",
			vibrate: message?.options?.vibrate || true,
			vibration: message?.options?.vibration || 300,
			priority: message?.options?.priority || "high",
			importance: message?.options?.importance || "high",
			data: message?.data
		};
	};

	static IOSNotification = (message: LocalNotificationMessage) => {
		return {
			alertAction: message?.options?.alertAction || "view",
			category: message?.options?.category || "",
			userInfo: {
				id: message?.id,
				item: message?.data
			}
		};
	};

	static removeAllNotification = () => {
		PushNotification.setApplicationIconBadgeNumber(0);
		if (Platform.OS === "ios") {
			PushNotificationIOS.removeAllDeliveredNotifications();
		} else {
			PushNotification.cancelAllLocalNotifications();
		}
	};

	static removeNotificationByID = (id: string) => {
		console.log(`[LocalNotification=removeNotificationByID] id=${JSON.stringify(id)}`);
		PushNotification.cancelLocalNotification(id);
	};
}
