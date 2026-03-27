// /services/ai.js
import { getFromOpenRouter } from "./openrouter";
import { getFromGemini } from "./gemini";

export async function getAIRecommendations(mood) {
  try {
    return await getFromOpenRouter(mood);
  } catch (err) {
    console.warn("OpenRouter failed, switching to Gemini");
    try {
      return await getFromGemini(mood);
    } catch (err) {
      console.error("Both AI APIs failed");
      return [];
    }
  }
}
