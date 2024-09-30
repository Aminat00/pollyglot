import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	TextInput,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { fetchChatResponse } from "./lib/openai-service";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AIMessageBox,
	FlagSelector,
	Header,
	SendIcon,
	UserMessageBox,
} from "@/components";

const turkey = require("/assets/images/flag-turkey.png");
const arab = require("/assets/images/flag-saudi-arabia.png");
const japan = require("/assets/images/flag-japan.png");

type Message = {
	text: string;
	sender: "user" | "ai";
};
export default function HomeScreen() {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [inputText, setInputText] = React.useState<string>("");
	const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
		null
	);
	const [userMessage, setUserMessage] = React.useState<string>("");
	const [aiMessage, setAiMessage] = React.useState<string>("");

	const textInputRef = React.useRef<TextInput>(null);
	const handleSendMessage = async () => {
		// Ensure input is not empty
		if (inputText.trim() !== "") {
			// Set the current user message
			setUserMessage(inputText);
			setAiMessage("");
			if (selectedLanguage) {
				// Fetch response from OpenAI based on user input and selected language
				const aiResponse = await fetchChatResponse(inputText, selectedLanguage);
				// Set the AI message once the response is ready
				const responseText = aiResponse || "No response from AI";
				setAiMessage(responseText);
			}

			// Clear the input field
			setInputText("");
		}
	};

	const focusInput = () => {
		if (textInputRef.current) {
			textInputRef.current.focus();
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<SafeAreaView className="flex-1 bg-white">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Header />
						<View
							style={{
								margin: 16,
								justifyContent: "space-between",
								rowGap: 16,
								padding: 16,
								flexDirection: "column",
								borderColor: "#252F42",
								borderWidth: 4,
								borderRadius: 12,
							}}>
							<View className="flex-col" style={{ rowGap: 20 }}>
								<AIMessageBox
									text="Select the language you me to translate into, type your text and
							hit send!"
								/>

								{userMessage && <UserMessageBox text={userMessage} />}
								{aiMessage ? (
									<AIMessageBox text={aiMessage} />
								) : (
									<Text className="text-gray-500">Thinking...</Text> // Simple "thinking" placeholder
								)}
							</View>
							<View className="flex-col" style={{ rowGap: 16 }}>
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
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}
