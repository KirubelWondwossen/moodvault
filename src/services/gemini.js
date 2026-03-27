export async function getFromGemini(mood) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Suggest 6 movies or anime for someone feeling ${mood}. Return JSON array only.`,
              },
            ],
          },
        ],
      }),
    },
  );

  if (!res.ok) throw new Error("Gemini failed");

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text;

  return JSON.parse(text);
}
