import { createClient } from "@supabase/supabase-js";
import films from "../data/films.js";
import { embedChunks } from "../lib/embed.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const chunks = films.map((film) => ({
  content: film.content,
  metadata: { title: film.title, releaseYear: film.releaseYear },
}));

console.log(`Embedding ${chunks.length} films...`);

const embedded = await embedChunks(chunks);

const { error } = await supabase.from("documents").insert(embedded);
if (error) throw error;

console.log(`Inserted ${embedded.length} films`);