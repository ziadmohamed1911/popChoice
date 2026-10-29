import { embedChunks } from "../lib/embed.js"
import { findMatch } from "../lib/findMatch.js"
import { getChatCompletions } from "../lib/getChatCompletions.js"


export default async function handler(req, res) {
  if(req.method !== "POST"){
    return res.status(405).json({ error: "Method not allowed"})
  }
  
    const { searchQuery } = req.body
    console.log("1. Query received: ", searchQuery)

    if(!searchQuery){
      return res.status(400).json({error: "Missing query" })      
    }
    const [result] = await embedChunks([{content: searchQuery}])
    console.log("2. embedding done, legnth: ", result.embedding.length)

    const {data, error} = await findMatch(result.embedding)
    console.log("3. Supabase Done", data?.length, error?.message)
    if (error) throw error

    const response = await getChatCompletions(data, searchQuery)
    console.log("4. Resposne catpured")
    res.status(200).json(response)

  // }catch{
  //   return res.status(500).json({ error: err.message })
  // }
}
