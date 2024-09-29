import { OpenAI } from "openai";

// Import your environment variable (assuming you're using `react-native-dotenv`)
import { OPENAI_API_KEY } from "env";

// Create OpenAI instance
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export default openai;
