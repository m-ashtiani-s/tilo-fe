import type { Config } from "tailwindcss";
import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export function generateDarkenColorFrom(input: string, percentage = 0.07): string {
	return colord(input).darken(percentage).toHex();
}

export function generateForegroundColorFrom(input: string, percentage = 0.8): string {
	return colord(input)
		.mix(colord(input).isDark() ? "white" : "black", percentage)
		.toHex();
}

export const tailwindColors: { [key: string]: string } = {
	'neutral-7': "#141718",
	'neutral-6': "#232627",
	'neutral-5': "#343839",
	'neutral-4': "#6C7275",
	'neutral-3': "#E8ECEF",
	'neutral-2': "#F3F5F7",
	'neutral-1': "#FEFEFE",
	primary: "#000000",
	"secondary-blue":'#377DFF',
	"secondary-green":'#38CB89',
	"secondary-orange":'#FFAB00',
	"secondary-red":'#FF5630',


	current: "currentColor",
	'link':'#0e8cd1',
	transparent: "transparent",
	white: "#ffffff",
	"primary-content": "#FFFFFF",
	"primary-focus": generateDarkenColorFrom("#053251"),
	secondary: "#e15a00",
	"secondary-content": "#FFFFFF",
	"secondary-focus": generateDarkenColorFrom("#e15a00"),
	accent: "#1FB2A5",
	"accent-content": "#FFFFFF",
	"accent-focus": generateDarkenColorFrom("#1FB2A5"),
	neutral: "#ffffff",
	"neutral-content": generateForegroundColorFrom("#FFFFFF"),
	"neutral-content-focus": "#d0d0d0",
	"neutral-focus": generateDarkenColorFrom("#2a323c", 0.03),
	"base-25": "#FFFFFF",
	"base-50": "#fdfdfd",
	"base-75": "#fafafa",
	"base-100": "#f9f9f9",
	"base-200": "#f6f6f6",
	"base-300": "#f3f3f3",
	"base-content": "#A6ADBB",
	info: "#3abff8",
	"info-content": generateForegroundColorFrom("#3abff8"),
	success: "#36d399",
	"success-content": generateForegroundColorFrom("#36d399"),
	warning: "#fbbd23",
	"warning-content": generateForegroundColorFrom("#fbbd23"),
	error: "#f87272",
	"error-content": generateForegroundColorFrom("#f87272"),
	"gradient-first": "#34eaa0",
	"gradient-second": "#0fa2e9",
};

const config: Config = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: tailwindColors,
			backgroundImage: {
				"hero-slide-1": "url('/images/hero.jpg')",
				"hero-slide-2": "url('/images/slide-2.jpg')",
			},
			height:{
				'200':'800px',
				'140':'560px',
			},
			spacing:{
				'0.75':'3px',
				'0.25':'1px',
			},
			lineHeight:{
				"6.5":"26px"
			},
			fontFamily:{
				'poppins':'var(--font-poppins)'
			}
		},
		container: {
			center: true,
		},
	},
	darkMode: "class",
	plugins: [],
};
export default config;
