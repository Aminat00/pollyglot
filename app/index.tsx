import React from "react";
import { Pressable, TextInput, Text, View } from "react-native";
import { fetchChatResponse } from "./lib/openai-service";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AIMessageBox,
	FlagSelector,
	Header,
	SendIcon,
	UserMessageBox,
} from "@/components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function HomeScreen() {
	const [inputText, setInputText] = React.useState<string>("");
	const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
		null
	);
	const [userMessage, setUserMessage] = React.useState<string>("");
	const [aiMessage, setAiMessage] = React.useState<string>("");
	const [isThinking, setIsThinking] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const textInputRef = React.useRef<TextInput>(null);
	const handleSendMessage = async () => {
		if (inputText.trim() === "") {
			setErrorMessage(
				"Please type something before hitting the send button ☺️"
			); // Set error message
			return;
		}

		setErrorMessage(""); // Clear any existing error message
		setUserMessage(inputText);
		setAiMessage("");
		setIsThinking(true);
		if (selectedLanguage) {
			const aiResponse = await fetchChatResponse(inputText, selectedLanguage);
			const responseText = aiResponse || "No response from AI";
			setAiMessage(responseText);
		}
		setIsThinking(false);
		setInputText("");
	};

	const focusInput = () => {
		if (textInputRef.current) {
			textInputRef.current.focus();
		}
	};
	return (
		<SafeAreaView className="flex-1 bg-white" style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled">
				<Header />
				<View className="flex-1 justify-center items-center">
					<View className="m-4 p-4 flex-col justify-center border-4 border-[#252F42] rounded-lg gap-y-4">
						<View className="flex-col" style={{ rowGap: 20 }}>
							<AIMessageBox
								text="Select the language you me to translate into, type your text and
							hit send!"
							/>

							{userMessage && <UserMessageBox text={userMessage} />}
							{isThinking ? ( // Conditionally render "thinking" if AI is processing
								<Text className="text-gray-500">Thinking...</Text>
							) : (
								aiMessage && <AIMessageBox text={aiMessage} />
							)}
						</View>
						<View className="flex-col gap-y-4">
							{errorMessage && (
								<Text className="text-yellow-500 text-center">
									{errorMessage}
								</Text> // Display error message
							)}
							<Pressable
								onPress={focusInput}
								className="border-[#586E88] border rounded-md p-4 flex-row justify-between ">
								<TextInput
									ref={textInputRef}
									value={inputText}
									onChangeText={setInputText}
								/>
								<Pressable onPress={handleSendMessage}>
									<SendIcon />
								</Pressable>
							</Pressable>
							<View className="flex-row self-center">
								<FlagSelector
									onSelect={(flagId) => setSelectedLanguage(flagId)}
								/>
							</View>
						</View>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
