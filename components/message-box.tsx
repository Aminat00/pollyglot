import React from "react";
import { View, Text } from "react-native";

interface BaseMessageBoxProps {
	text: string;
	bgColor: string;
	textColor: string;
	borderRadius: string;
}

const BaseMessageBox: React.FC<BaseMessageBoxProps> = ({
	text,
	bgColor,
	textColor,
	borderRadius,
}) => {
	return (
		<View className={`${bgColor} ${borderRadius} p-3`}>
			<Text className={`${textColor} text-xl`}>{text}</Text>
		</View>
	);
};

interface MessageBoxProps {
	text: string;
}

// Component with ai styling
export const UserMessageBox: React.FC<MessageBoxProps> = ({ text }) => {
	return (
		<BaseMessageBox
			text={text}
			bgColor="bg-[#035A9D]"
			textColor="text-white"
			borderRadius="rounded-b-xl rounded-r-xl"
		/>
	);
};

// Component with user styling
export const AIMessageBox: React.FC<MessageBoxProps> = ({ text }) => {
	return (
		<BaseMessageBox
			text={text}
			bgColor="bg-[#65DA65]"
			textColor="text-black"
			borderRadius="rounded-b-xl rounded-l-xl"
		/>
	);
};
