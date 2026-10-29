import { supabase } from "../api/_supabase.js";

export async function findMatch(embed){
    const data = await supabase.rpc("match_documents", {
        query_embedding: embed,
        match_threshold: 0.5,
        match_count: 5
    })
    return data
}