export async function getFromOpenRouter(mood) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: `Suggest 6 movies or anime for someone feeling ${mood}. Return JSON array only.`,
        },
      ],
    }),
  });

  if (!res.ok) throw new Error("OpenRouter failed");

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
