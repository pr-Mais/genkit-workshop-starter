import { genkit } from "genkit/beta";

import { googleAI, gemini20Flash } from "@genkit-ai/googleai";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

async function main() {
  const { stream } = ai.generateStream(
    'Invent a menu item for a pirate themed restaurant.'
  );
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) {
      console.log(text);
    }
  }
}

main()