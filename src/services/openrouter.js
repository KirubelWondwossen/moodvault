import { OpenRouter } from "@openrouter/sdk";
const MODELS = [
  "openai/gpt-4o-mini",
  "google/gemini-1.5-flash",
  "mistralai/mistral-small",
  "anthropic/claude-3-haiku",
  "deepseek/deepseek-chat",
  "anthropic/claude-3.5-sonnet",
  "google/gemini-1.5-pro",
  "mistralai/mistral-large",
  "meta-llama/llama-3-70b-instruct",
];
export async function getFromOpenRouter(mood) {
  const openRouter = new OpenRouter({
    apiKey: import.meta.env.VITE_OPENROUTER_KEY,
  });
  for (const model of MODELS) {
    try {
      const completion = await openRouter.chat.send({
        chatGenerationParams: {
          model: model,
          messages: [
            {
              role: "user",
              content: `Suggest 6 anime , movies or TV shows for someone feeling ${mood}. Return ONLY a comma-separated list of titles. No explanation.`,
            },
          ],
        },
      });

      return completion.choices[0].message.content;
    } catch (err) {
      const msg = err?.message?.toLowerCase() || "";
      const status = err?.status || err?.response?.status;
      if (status === 402) {
        console.warn(`Payment required: ${model} switching to other models`);
        continue;
      }

      if (
        msg.includes("rate limit") ||
        msg.includes("too many requests") ||
        msg.includes("overloaded")
      ) {
        console.warn(`Rate limited: ${model}`);
        continue;
      }
      if (status === 429 || msg.includes("rate limit")) {
        console.warn(`Rate limited: ${model} switching to other models`);
        continue;
      }
    }
  }
}
