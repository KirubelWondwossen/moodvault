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
              content: `Suggest 24 titles for someone feeling ${mood}.
Requirements:
- Include a balanced mix of: movies, TV shows, and anime
- Movies and TV shows MUST be primarily Hollywood or English-language mainstream productions
- Anime can be from any region (focus on popular, well-known anime)
- Prioritize popular, widely loved, or highly recommended titles
- Favor strong audience reception, rewatch value, or cultural impact
- Match the mood: ${mood}
- Include a mix of classics and modern hits
- Avoid very obscure titles unless widely praised
- No duplicates

Output format:
- Return ONLY a plain comma-separated list of titles
- No numbering, no explanation, no extra text`,
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
