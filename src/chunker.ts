import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function chunk(
  text: string,
  chunkSize = 1000,
  overlap = 200
): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap: overlap,
  });
  return splitter.splitText(text);
}