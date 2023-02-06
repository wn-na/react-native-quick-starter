import { ElementType } from "./type";

type RGBValue = {
	R: number;
	G: number;
	B: number;
};

type HSLValue = {
	H: number;
	S: number;
	L: number;
};

const ColorPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
type ColorPalette = typeof ColorPalette;
type ColorCode<T extends string, U extends string | number> = `${T}${U}`;
export type ColorPaletteKeys<T extends string> = ColorCode<T, ElementType<ColorPalette>> | T;
export type ColorPaletteMap<T extends string> = Record<ColorCode<T, ElementType<ColorPalette>> | T, string>;

function hslToRGB({ H: h, S: s, L: l }: HSLValue): RGBValue {
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const hp = h / 60.0;
	const x = c * (1 - Math.abs((hp % 2) - 1));
	let rgb1 = [0, 0, 0];
	if (isNaN(h)) {
		rgb1 = [0, 0, 0];
	} else if (hp <= 1) {
		rgb1 = [c, x, 0];
	} else if (hp <= 2) {
		rgb1 = [x, c, 0];
	} else if (hp <= 3) {
		rgb1 = [0, c, x];
	} else if (hp <= 4) {
		rgb1 = [0, x, c];
	} else if (hp <= 5) {
		rgb1 = [x, 0, c];
	} else if (hp <= 6) {
		rgb1 = [c, 0, x];
	}
	const m = l - c * 0.5;
	return {
		R: Math.round(255 * (rgb1[0] + m)),
		G: Math.round(255 * (rgb1[1] + m)),
		B: Math.round(255 * (rgb1[2] + m))
	};
}

function rgbToHSL({ R, G, B }: RGBValue): HSLValue {
	R /= 255;
	G /= 255;
	B /= 255;
	const max = Math.max(R, G, B);
	const min = Math.min(R, G, B);
	const d = max - min;
	let h = 0;
	if (max === R) {
		h = ((G - B) / d) % 6;
	} else if (max === G) {
		h = (B - R) / d + 2;
	} else if (max === B) {
		h = (R - G) / d + 4;
	}
	const L = (min + max) / 2;
	const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));
	return { H: h * 60, S, L };
}

function hslToHex({ H, S, L }: HSLValue): string {
	const { R, G, B } = hslToRGB({ H, S, L });
	return `#${Math.floor(R).toString(16).padStart(2, "0")}${Math.floor(G).toString(16).padStart(2, "0")}${Math.floor(B)
		.toString(16)
		.padStart(2, "0")}`;
}

/** `#aaaaaa`의 형태로 전달해주세요 */
function hexToRGB(hex: string): RGBValue {
	const bigint = parseInt(hex.startsWith("#") ? hex.substring(1) : hex, 16);
	const R = (bigint >> 16) & 255;
	const G = (bigint >> 8) & 255;
	const B = bigint & 255;

	return { R, G, B };
}

function colorPalette<T extends string>(key: T, hex: string): ColorPaletteMap<T> {
	const { H, S } = rgbToHSL(hexToRGB(hex));
	return ColorPalette.reduce((acc, cur) => ({ ...acc, [`${key}${cur}`]: hslToHex({ H, S, L: 1 - cur / 1000 }) }), {
		[key]: hex
	} as unknown as ColorPaletteMap<T>);
}

/** `#aaaaaa`의 형태로 전달해주세요
 * - `alpha`는 0 ~ 1 사이의 값입니다.
 */
const setOpacity = (hex: string, alpha: number) =>
	`${hex}${Math.floor(alpha * 255)
		.toString(16)
		.padStart(2, "0")}`;

/** `#aaaaaa`의 형태로 전달해주세요 */
const setDisabled = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.3);
	}
	return undefined;
};

/** `#aaaaaa`의 형태로 전달해주세요 */
const setHover = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.7);
	}
	return undefined;
};

/** `#aaaaaa`의 형태로 전달해주세요 */
const setPressed = (hex?: string) => {
	if (hex) {
		return setOpacity(hex, 0.5);
	}
	return undefined;
};

/** `#aaaaaa`의 형태로 전달해주세요
 *
 * - `percent`: A와 B의 혼합 비율을 작성해주세요
 */
function blendColors(colorA: string, colorB: string, percent: number) {
	const [rA, gA, bA] = colorA?.match(/\w\w/g)?.map((c) => parseInt(c, 16)) as any;
	const [rB, gB, bB] = colorB?.match(/\w\w/g)?.map((c) => parseInt(c, 16)) as any;
	const r = Math.round(rA + (rB - rA) * percent)
		.toString(16)
		.padStart(2, "0");
	const g = Math.round(gA + (gB - gA) * percent)
		.toString(16)
		.padStart(2, "0");
	const b = Math.round(bA + (bB - bA) * percent)
		.toString(16)
		.padStart(2, "0");
	return "#" + r + g + b;
}

/**
 * `range`: 밝기 범위 -1 ~ 1
 */
function brightness(col: string, range: number) {
	const percent = range * 100;
	col = col.replace(/^#/, "");
	if (col.length === 3) {
		col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
	}

	let [r, g, b] = col.match(/.{2}/g) as any;
	[r, g, b] = [parseInt(r, 16) + percent, parseInt(g, 16) + percent, parseInt(b, 16) + percent];

	r = Math.max(Math.min(255, r), 0).toString(16);
	g = Math.max(Math.min(255, g), 0).toString(16);
	b = Math.max(Math.min(255, b), 0).toString(16);

	const rr = (r.length < 2 ? "0" : "") + r;
	const gg = (g.length < 2 ? "0" : "") + g;
	const bb = (b.length < 2 ? "0" : "") + b;

	return `#${rr}${gg}${bb}`;
}
export const ColorUtils = {
	setOpacity,
	setDisabled,
	setHover,
	setPressed,
	colorPalette,
	blendColors,
	brightness
};
