export const replaceWhiteSpace = (str: string): string => str.replace(/\n/g, " ").replace(/\r/g, "");

export function stringify(value: any, isPretty?: boolean): string {
	switch (typeof value) {
		case "string":
		case "object":
			return isPretty ? JSON.stringify(value, null, 2) : JSON.stringify(value);
		default:
			return String(value);
	}
}
