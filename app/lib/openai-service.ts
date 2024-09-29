import openai from "./openai-client";

export const fetchChatResponse = async (
	message: string
): Promise<string | null> => {
	const messages: { role: "system" | "user" | "assistant"; content: string }[] =
		[
			{
				role: "system",
				content: "You are a helpful polyglot assistant",
			},
			{
				role: "user",
				content: message,
			},
		];

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: messages,
			max_tokens: 150,
		});
		return response.choices[0].message.content;
	} catch (error) {
		console.error("Error fetching response:", error);
		return "Sorry, I could not process your request.";
	}
};
