/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.{js,jsx,ts,tsx}", //  main entry point is index.tsx
		"./app/**/*.{js,jsx,ts,tsx}", //  screens are in the app folder
		"./components/**/*.{js,jsx,ts,tsx}", //  additional components in a components
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
