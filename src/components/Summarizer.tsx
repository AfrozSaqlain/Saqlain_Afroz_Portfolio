import React from 'react';
import { Column, Heading, Text } from "@once-ui-system/core"; // Assuming you might want these for styling

async function getSummary(textToSummarize: string): Promise<string> {
  if (textToSummarize.split(' ').length < 100) {
    return "This post is a quick read!";
  }

  if (!process.env.HUGGING_FACE_API_KEY) {
    console.error("CRITICAL: Hugging Face API key not found in .env.local.");
    return "Could not generate summary: API key is not configured.";
  }

  // THE FIX: Be more conservative with truncation to ensure the input fits the model's limit.
  const truncatedText = textToSummarize.slice(0, 500);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        cache: 'no-store',
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: truncatedText }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`API Error:`, errorBody);
      if (errorBody.error?.includes("index out of range")) {
        return "Error: The article content is too long for the model, even after truncation.";
      }
      return `Error: Could not generate summary.`;
    }

    const result = await response.json();
    return result[0].summary_text;
  } catch (error) {
    console.error("Failed to fetch summary:", error);
    return "An unexpected error occurred while generating the summary.";
  }
}

export default async function Summarizer({ articleText }: { articleText: string }) {
  const summary = await getSummary(articleText);

  return (
    <Column
      as="aside"
      fillWidth
      padding="l"
      gap="12"
      background="neutral-medium"
      data-border-radius="l"
      radius='l'
    >
      <Heading as="h3" variant="label-strong-l">AI Summary</Heading>
      <Text as="p" variant="body-default-m" onBackground="neutral-weak">
        {summary}
      </Text>
    </Column>
  );
}