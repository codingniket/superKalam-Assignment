export async function getEnhancedQuery(
  currentQuery: string,
  context: string[]
): Promise<string> {
  const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  try {
    const contextString = context.length > 0 ? context.join(" → ") : "";

    const prompt = contextString
      ? `Based on the previous search context: "${contextString}", enhance the new search query: "${currentQuery}". 
         Combine them intelligently to create a more specific search term. 
         Return only the enhanced search query, no additional text or explanations.
         
         Examples:
         - Context: "football" + Query: "ronaldo" → "ronaldo football"
         - Context: "cooking" + Query: "pasta" → "pasta cooking recipe"
         - Context: "guitar lessons" + Query: "beginner" → "beginner guitar lessons"
         
         Enhanced query:`
      : `Optimize this search query for YouTube video search: "${currentQuery}". 
         Return only the optimized search query, no additional text or explanations.
         
         Optimized query:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.3,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error?.message || "Failed to enhance query with Gemini"
      );
    }

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error("No content received from Gemini");
    }

    return content.trim();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Gemini AI Error:", error);
    } else {
      console.error("Gemini AI Error:", String(error));
    }
    const contextString = context.length > 0 ? context.join(" ") : "";
    return contextString ? `${currentQuery} ${contextString}` : currentQuery;
  }
}
