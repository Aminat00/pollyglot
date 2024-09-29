import React from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { fetchChatResponse } from "../lib/openai-service";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components";

type Message = {
	text: string;
	sender: "user" | "ai";
};
export default function HomeScreen() {
	const [messages, setMessages] = React.useState<Message[]>([]);
	const [inputText, setInputText] = React.useState<string>("");

	const handleSendMessage = async () => {
		if (inputText.trim() !== "") {
			// Add user's message to chat
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: inputText, sender: "user" },
			]);

			// Fetch response from OpenAI
			const aiResponse = await fetchChatResponse(inputText);

			// Ensure aiResponse is a string
			const responseText = aiResponse || "No response from AI";

			// Add AI's response to chat
			setMessages((prevMessages) => [
				...prevMessages,
				{ text: responseText, sender: "ai" },
			]);

			setInputText("");
		}
	};
	return (
		<SafeAreaView className="flex-1 bg-white">
			<Header />
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<Text
						style={{
							padding: 8,
							backgroundColor: item.sender === "user" ? "#ddd" : "#bbb",
						}}>
						{item.sender === "user" ? "You: " : "AI: "}
						{item.text}
					</Text>
				)}
				keyExtractor={(_, index) => index.toString()}
			/>

			<TextInput
				value={inputText}
				onChangeText={setInputText}
				className="border border-[#ccc] mb-2 "
				placeholder="Type your message..."
			/>

			<Button title="Send" onPress={handleSendMessage} />
		</SafeAreaView>
	);
}
