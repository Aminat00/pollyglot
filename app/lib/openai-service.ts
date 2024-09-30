import openai from "./openai-client";

export const fetchChatResponse = async (
	inputText: string,
	language: string
): Promise<string> => {
	try {
		// Add selected language as context to the API request
		const response = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: `You are a helpful assistant translating to ${language}.`,
				},
				{
					role: "user",
					content: inputText,
				},
			],
		});
		return response.choices[0].message.content ?? "Empty response 🤔";
	} catch (error) {
		console.error("Error fetching response:", error);
		return "Sorry, I could not process your request.";
	}
};
