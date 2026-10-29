import { openai } from "../api/_openai.js"

const BATCH_SIZE = 20;

export async function embedChunks(chunks) {
  const results = [];

  for (let start = 0; start < chunks.length; start += BATCH_SIZE) {
    const batch = chunks.slice(start, start + BATCH_SIZE);

    const response = await openai.embeddings.create({
      model: process.env.AI_MODEL_EMBED || "text-embedding-3-small",
      input: batch.map((chunk) => chunk.content),
      encoding_format: "float",
    });

    console.log(
      `Batch ${start / BATCH_SIZE + 1}: sent ${batch.length}, got ${response.data?.length}`
    );

    if (!response.data || response.data.length !== batch.length) {
      throw new Error(
        `Expected ${batch.length} embeddings, got ${response.data?.length}. ` +
          `Check your API key and credit.`
      );
    }

    const sorted = [...response.data].sort((a, b) => a.index - b.index);

    batch.forEach((chunk, i) => {
      results.push({ ...chunk, embedding: sorted[i].embedding });
    });
  }

  return results;
}