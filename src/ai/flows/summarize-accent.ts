'use server';

/**
 * @fileOverview Summarizes the key characteristics of an identified accent.
 *
 * - summarizeAccent - A function that takes an accent name and provides a summary of its characteristics.
 * - SummarizeAccentInput - The input type for the summarizeAccent function.
 * - SummarizeAccentOutput - The return type for the summarizeAccent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAccentInputSchema = z.object({
  accent: z.string().describe('The name of the identified accent.'),
});
export type SummarizeAccentInput = z.infer<typeof SummarizeAccentInputSchema>;

const SummarizeAccentOutputSchema = z.object({
  summary: z.string().describe('A summary of the key characteristics of the accent.'),
});
export type SummarizeAccentOutput = z.infer<typeof SummarizeAccentOutputSchema>;

export async function summarizeAccent(input: SummarizeAccentInput): Promise<SummarizeAccentOutput> {
  return summarizeAccentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAccentPrompt',
  input: {schema: SummarizeAccentInputSchema},
  output: {schema: SummarizeAccentOutputSchema},
  prompt: `You are an expert in linguistics, specializing in English accents.

You will be provided with the name of an accent. Your task is to summarize the key characteristics of this accent, including its regional variations, common phonetic features, and any other relevant information that would help someone understand the nuances of the accent.

Accent: {{{accent}}}`,
});

const summarizeAccentFlow = ai.defineFlow(
  {
    name: 'summarizeAccentFlow',
    inputSchema: SummarizeAccentInputSchema,
    outputSchema: SummarizeAccentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
