// gemini.ts
import { GoogleGenAI } from "@google/genai";

const API_KEY = "AIzaSyAAqInozARiUXBaAJ23HM01CmdHs8OpVyE";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateDefinitionAndExamples(word: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Define the English word ${word} and give 3 example sentences. Format response like:
                    - Definition: ...
                    - Examples:
                    1. ...
                    2. ...
                    3. ...`,
    });

    const text = response.text;

    return text;
}
