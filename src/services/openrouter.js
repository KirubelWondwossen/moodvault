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

  let lastError = null;

  for (const model of MODELS) {
    try {
      const completion = await openRouter.chat.send({
        chatGenerationParams: {
          model: model,
          messages: [
            {
              role: "user",
              content: `Suggest 3 to 5 genres that best match this mood: ${mood}.

STRICT RULES:
- ONLY use genres from this exact list:
Action, Adventure, Animation, Comedy, Crime, Drama, Fantasy, Horror, Romance, Science Fiction, Thriller
- Choose ONLY the most relevant genres for the mood
- Prefer commonly associated genres (no random or weak matches)
- Do NOT repeat genres
- Do NOT invent or modify genre names

FORMAT RULES:
- Return ONLY comma-separated genres
- No explanations
- No extra text
- No numbering
- No trailing punctuation

Example:
Comedy, Romance, Adventure`,
            },
          ],
        },
      });

      return completion.choices[0].message.content;
    } catch (err) {
      const msg = err?.message?.toLowerCase() || "";
      const status = err?.status || err?.response?.status;

      lastError = err;

      if (!err.status) {
        err.status = status || 0;
      }

      if (err.status === 402) {
        console.warn(`Payment required: ${model} → switching`);
        continue;
      }

      if (
        err.status === 429 ||
        msg.includes("rate limit") ||
        msg.includes("too many requests")
      ) {
        err.status = 429;
        console.warn(`Rate limited: ${model} → switching`);
        continue;
      }

      if (msg.includes("overloaded") || err.status === 503) {
        err.status = 503;
        console.warn(`Model overloaded: ${model} → switching`);
        continue;
      }

      console.warn(`Model failed: ${model}`, err);
      continue;
    }
  }

  const finalError = new Error("All models failed");
  finalError.status = lastError?.status || 0;
  finalError.original = lastError;

  throw finalError;
}
