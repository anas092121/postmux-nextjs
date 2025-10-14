"use server";

import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateBlogContent(title, category = "", tags = []) {
  try {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required to generate content");
    }

    // Create a detailed prompt for post description content generation
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a post description with the title: "${title}"

${category ? `Category: ${category}` : ""}
${tags.length > 0 ? `Tags: ${tags.join(", ")}` : ""}

Requirements:
- Write engaging, informative content that matches the title
- Use proper HTML formatting with headers (h2, h3), paragraphs, lists, and emphasis
- Write in a conversational yet professional tone
- Use <h2> for main sections and <h3> for subsections
- Use <p> tags for paragraphs
- Use <ul> and <li> for bullet points when appropriate
- Use <strong> and <em> for emphasis
- Ensure the content is original and valuable to readers

Do not include the title in the content as it will be added separately.
Start directly with the introduction paragraph.`,
    });
    console.log(response.text);

    const content = response.text;

    // Basic validation
    if (!content || content.trim().length < 100) {
      throw new Error("Generated content is too short or empty");
    }

    return {
      success: true,
      content: content.trim(),
    };
  } catch (error) {
    console.error("Gemini AI Error:", error);

    // Handle specific error types
    if (error.message?.includes("API key")) {
      return {
        success: false,
        error: "AI service configuration error. Please try again later.",
      };
    }

    if (error.message?.includes("quota") || error.message?.includes("limit")) {
      return {
        success: false,
        error: "AI service is temporarily unavailable. Please try again later.",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to generate content. Please try again.",
    };
  }
}

// improvement function
export async function improveContent(
  currentContent,
  improvementType = "enhance"
) {
  try {
    if (!currentContent || currentContent.trim().length === 0) {
      throw new Error("Content is required for improvement");
    }

    // Use the new flash-2.5 model
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Improve the following blog content with the goal to "${improvementType}":

${currentContent}

Requirements:
- Keep the HTML structure intact
- Maintain the tone and style
- Enhance readability and flow
- Include practical examples if appropriate
- For "expand": add more depth and insights
- For "simplify": make it concise and clear under 150 words(dont mentions here's updated content)
- For "enhance": make it more engaging and compelling
`,
    });

    const improvedContent = response.text;

    if (!improvedContent || improvedContent.trim().length === 0) {
      throw new Error("Improved content is empty");
    }

    return {
      success: true,
      content: improvedContent.trim(),
    };
  } catch (error) {
    console.error("Content improvement error:", error);
    return {
      success: false,
      error: error.message || "Failed to improve content. Please try again.",
    };
  }
}
