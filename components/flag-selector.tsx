import React, { useState } from "react";
import { View, Image, Pressable } from "react-native";

// Import flag images
const turkey = require("../assets/images/flag-turkey.png");
const arab = require("../assets/images/flag-saudi-arabia.png");
const korea = require("../assets/images/flag-korea.png");

// Define the type of flag IDs
type FlagId = "turkey" | "arab" | "korea";

type Flag = {
	id: FlagId;
	image: any;
};
// Define flag options
const flagOptions: Flag[] = [
	{ id: "turkey", image: turkey },
	{ id: "arab", image: arab },
	{ id: "korea", image: korea },
];

interface FlagSelectorProps {
	onSelect: (flagId: FlagId) => void;
}

export const FlagSelector: React.FC<FlagSelectorProps> = ({ onSelect }) => {
	const [selectedFlag, setSelectedFlag] = useState<FlagId | null>(null);

	const handleSelectFlag = (flagId: FlagId) => {
		setSelectedFlag(flagId);
		onSelect(flagId);
	};

	return (
		<View className="flex-row gap-4">
			{flagOptions.map((flag) => (
				<Pressable
					key={flag.id}
					onPress={() => handleSelectFlag(flag.id)}
					className={`w-20 h-12 ${
						selectedFlag === flag.id
							? "border-4 border-blue-500"
							: "border border-black"
					} rounded-md overflow-hidden`}>
					<Image source={flag.image} className="w-full h-full" />
				</Pressable>
			))}
		</View>
	);
};
