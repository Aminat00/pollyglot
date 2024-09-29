import React from "react";
import { ImageBackground, Image, Text, View } from "react-native";

const bgImage = require("../assets/images/world-map.png");
const parrot = require("../assets/images/parrot.png");

export const Header: React.FC = () => {
	return (
		<ImageBackground
			source={bgImage}
			className="bg-[#0D182E] flex flex-row gap-x-4 justify-center">
			<Image source={parrot} />
			<View>
				<Text className="text-4xl font-extrabold leading-[65.13px] text-[#32CD32] text-left">
					PollyGlot
				</Text>
				<Text className="text-md font-semibold leading-[18.32px] text-left text-white">
					Perfect Translation Every Time
				</Text>
			</View>
		</ImageBackground>
	);
};
