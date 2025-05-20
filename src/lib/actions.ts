"use server";

import { z } from "zod";
import { explainAccent } from "@/ai/flows/explain-accent";
import type { AnalysisResult } from "@/types";
import { ACCENTS_DATA } from "./accent-data";

const AnalyzeUrlSchema = z.object({
  videoUrl: z.string().url({ message: "Invalid URL. Please enter a valid video URL." }),
});

// Simulate processing delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function analyzeAccentAction(
  prevState: any,
  formData: FormData
): Promise<{ result?: AnalysisResult; error?: string; fieldErrors?: { videoUrl?: string[] } }> {
  const validatedFields = AnalyzeUrlSchema.safeParse({
    videoUrl: formData.get("videoUrl"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { videoUrl } = validatedFields.data;

  try {
    // Simulate video processing and audio extraction
    await sleep(2000 + Math.random() * 2000); // Simulate 2-4 seconds processing time

    // Mock accent classification
    const randomAccentData = ACCENTS_DATA[Math.floor(Math.random() * ACCENTS_DATA.length)];
    const confidence = Math.floor(70 + Math.random() * 30); // Confidence between 70-100%

    // Prepare input for GenAI explanation
    const audioFeatures = randomAccentData.audioFeaturesExample;
    
    let explanation = "Explanation could not be generated at this time.";
    try {
      const explanationResult = await explainAccent({
        accent: randomAccentData.name,
        audioFeatures: audioFeatures,
      });
      explanation = explanationResult.explanation;
    } catch (aiError) {
      console.error("AI explanation generation failed:", aiError);
      // Keep default explanation or a specific error message
      explanation = "Failed to generate detailed linguistic explanation due to an internal error.";
    }
    

    return {
      result: {
        accent: randomAccentData.name,
        confidence,
        explanation,
        imageUrl: randomAccentData.imageUrl,
        dataAiHint: randomAccentData.dataAiHint,
        region: randomAccentData.region,
      },
    };
  } catch (error) {
    console.error("Analysis failed:", error);
    // Simulate a processing error for certain URLs (e.g. if URL contains 'error')
    if (videoUrl.includes("error")) {
         return { error: "Failed to process the video from the provided URL. It might be private or unsupported." };
    }
    return { error: "An unexpected error occurred during analysis. Please try again." };
  }
}
