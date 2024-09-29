module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"nativewind/babel",
			[
				"module:react-native-dotenv",
				{
					moduleName: "env",
					path: ".env",
				},
			],
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						components: "./components",
						lib: "./lib",
						assets: "./assets",
					},
				},
			],
		],
	};
};
