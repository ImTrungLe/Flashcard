// gemini.ts
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAAqInozARiUXBaAJ23HM01CmdHs8OpVyE";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateDefinitionAndExamples(word: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `You are an assistant that always returns strictly structured output.
Define the English word "${word}" and give exactly 3 example sentences.

Return the result using ONLY this exact format (no markdown, no bullet point symbols, no extra text):

Definition: <your definition here>
Examples:
1. <first sentence>
2. <second sentence>
3. <third sentence>

Do not add any extra characters, formatting, or explanations. Keep everything in plain text.`,
    });

    console.log(response);
    const text = response.text;

    return text;
}
