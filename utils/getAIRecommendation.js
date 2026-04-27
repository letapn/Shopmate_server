export async function getAIRecommendation(req, res, userPrompt, products) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

  const geminiPrompt = `
    Here is a list of available products:
    ${JSON.stringify(products, null, 2)}

    Based on the following user request, filter and suggest the best matching products:
    "${userPrompt}"

    Only return the matching products in JSON format.
  `;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }],
      }),
    });

    const data = await response.json();
    const aiResponseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const cleanedText = aiResponseText.replace(/```json|```/g, "").trim();

    if (!cleanedText) {
      return {
        success: false,
        products: [],
        message: "AI response is empty or invalid.",
      };
    }

    try {
      const parsedProducts = JSON.parse(cleanedText);
      return { success: true, products: parsedProducts };
    } catch (error) {
      return {
        success: false,
        products: [],
        message: "Failed to parse AI response.",
      };
    }
  } catch (error) {
    return {
      success: false,
      products: [],
      message: "Internal server error.",
    };
  }
}
