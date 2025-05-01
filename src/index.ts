import { genkit, z } from 'genkit';

import { googleAI, gemini20Flash } from '@genkit-ai/googleai';

import { extractTextFromPDF } from './pdf-loader';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

export const researchFlow = ai.defineFlow(
  {
    name: 'researchAnalyzer',
    inputSchema: z.string(), // PDF path or text
    outputSchema: z.string(), // Analysis result
  },
  async (input) => {
    const rawText = await extractTextFromPDF(input);
    return rawText;
  }
);
