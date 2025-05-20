// This is an automatically generated file. Please do not edit. 
'use server';

/**
 * @fileOverview Explains why a particular accent was identified, using linguistic cues like pitch, vowel usage, or phoneme patterns.
 *
 * - explainAccent - A function that handles the accent explanation process.
 * - ExplainAccentInput - The input type for the explainAccent function.
 * - ExplainAccentOutput - The return type for the explainAccent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAccentInputSchema = z.object({
  accent: z.string().describe('The identified accent.'),
  audioFeatures: z.string().describe('Key audio features from the analyzed audio, such as pitch, vowel usage, or phoneme patterns.'),
});
export type ExplainAccentInput = z.infer<typeof ExplainAccentInputSchema>;

const ExplainAccentOutputSchema = z.object({
  explanation: z.string().describe('A short explanation of why the accent was classified a certain way, using the provided audio features.'),
});
export type ExplainAccentOutput = z.infer<typeof ExplainAccentOutputSchema>;

export async function explainAccent(input: ExplainAccentInput): Promise<ExplainAccentOutput> {
  return explainAccentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAccentPrompt',
  input: {schema: ExplainAccentInputSchema},
  output: {schema: ExplainAccentOutputSchema},
  prompt: `You are an expert in linguistics, specializing in accent identification. Given an identified accent and some key audio features extracted from the analyzed audio, explain why the accent was classified in that manner.

Identified Accent: {{{accent}}}
Audio Features: {{{audioFeatures}}}

Explanation:`,
});

const explainAccentFlow = ai.defineFlow(
  {
    name: 'explainAccentFlow',
    inputSchema: ExplainAccentInputSchema,
    outputSchema: ExplainAccentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
