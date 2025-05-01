import { genkit, z } from 'genkit';
import { Document } from 'genkit/retriever';

import { googleAI, gemini15Pro, textEmbedding004 } from '@genkit-ai/googleai';

import {
  devLocalIndexerRef,
  devLocalRetrieverRef,
  devLocalVectorstore,
} from '@genkit-ai/dev-local-vectorstore';

import { extractTextFromPDF } from './pdf-loader';
import { chunk } from './chunker';

const ai = genkit({
  plugins: [
    googleAI({ apiKey:'AIzaSyA8-3XcAXW81zf6bxiPZ4dk80Hcqtz_gV8'}),
    devLocalVectorstore([
      {
        indexName: 'researchAnalyzer',
        embedder: textEmbedding004,
      },
    ]),
  ],
  model: gemini15Pro,
});

export const researchPdfIndexer = devLocalIndexerRef('researchAnalyzer');

export const researchIndexingFlow = ai.defineFlow(
  {
    name: 'researchAnalyzer',
    inputSchema: z.string().describe('PDF file path'),
    outputSchema: z.void(),
  },
  async (input) => {
    const pdfTxt = await ai.run('extract-text', () =>
      extractTextFromPDF(input)
    );

    const chunks = await ai.run('chunk-it', async () =>
      chunk(pdfTxt)
    );

    console.log(`Total chunks: ${chunks.length}`);

    // Convert chunks of text into documents to store in the index.
    const documents = chunks.map((text) => {
      return Document.fromText(text, { input });
    });

    for (let i = 0; i < documents.length; i += 100) {
      const batch = documents.slice(i, i + 100);
      console.log(`Indexing ${i} - ${i + batch.length}`);
      await ai.index({
        indexer: researchPdfIndexer,
        documents: batch,
      });
    }
  }
);

export const researchPdfRetriever = devLocalRetrieverRef('researchAnalyzer');

export const askQuestion = ai.defineFlow(
  {
    name: 'askResearchQuestion',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (input) => {
    const docs = await ai.retrieve({
      query: input,
      retriever: researchPdfRetriever,
      options: { k: 3 },
    });

    const { text } = await ai.generate({
      prompt: `
You are acting as a helpful AI assistant that can answer 
questions about research papers.

Use only the context provided to answer the question.
If you don't know, do not make up an answer.
Do not add or change items on the menu.

Question: ${input}`,
      docs,
    });

    return text;
  }
);
