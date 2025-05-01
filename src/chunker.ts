import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export type ChunkConfig = {
  minLength?: number;
  maxLength?: number;
  splitter?: "sentence" | "none";
  overlap?: number;
  delimiters?: string;
};

export async function chunk(
  text: string,
  config: ChunkConfig = {}
): Promise<string[]> {
  const {
    minLength = 1000,
    maxLength = 2000,
    splitter = "sentence",
    overlap = 200,
    delimiters = "",
  } = config;

  // Build separators array
  const separators: string[] =
    delimiters.length > 0
      ? delimiters.split("")
      : // default sentence-ish delimiters
        ["\n\n", "\n", ".", "!", "?", ",", " "];

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: maxLength,
    chunkOverlap: overlap,
    separators,
  });

  const rawChunks = await textSplitter.splitText(text);

  // Drop anything too short?
  return rawChunks.filter((c) => c.length >= minLength);
}