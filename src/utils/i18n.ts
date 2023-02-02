/* eslint-disable quote-props */
import i18n, { Callback } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@translation/en.json";
import ko from "@translation/ko.json";

const resource = {
	en: {
		translation: en
	},
	ko: {
		translation: ko
	}
};

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources: resource,
	lng: "ko",
	fallbackLng: "en",
	debug: true,
	keySeparator: ".",
	interpolation: {
		escapeValue: false
	},
	react: {
		useSuspense: false
	}
});
export default i18n;

export type i18nLanguageType = keyof typeof resource;
export const i18nLanguages = Object.keys(resource);
export type i18nTranslate = (typeof resource)["en"]["translation"];
export const changeLanguage = (lng: i18nLanguageType, callback?: Callback | undefined) => {
	i18n.changeLanguage(lng, callback);
};
