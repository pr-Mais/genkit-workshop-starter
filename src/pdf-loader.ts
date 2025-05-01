import fs from 'fs';
import pdf from 'pdf-parse';

export async function extractTextFromPDF(pdfPath: string): Promise<string> {
  const data = await fs.promises.readFile(pdfPath);
  const { text } = await pdf(data);
  return text;
}