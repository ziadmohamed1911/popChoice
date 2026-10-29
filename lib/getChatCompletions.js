import { openai } from "../api/_openai.js"

const systemPrompt = `You are Pop Choice, a friendly film expert who loves matching people with the right movie.

You will receive a list of films as context and the user's request. Recommend the single best film from the context for that request.

Rules:
- Only recommend films that appear in the context. Never invent films or details.
- Write 2 to 3 short sentences in a warm, conversational tone.
- Start with the film title, then explain why it fits what the user asked for, using details from the context.
- If none of the films fit the request, say: "Sorry, I couldn't find a good match for that." Do not force a recommendation.`

export async function getChatCompletions(matches, query) {
    const context = matches.map((m) => m.content).join("\n\n")
    try{
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL_CHAT || "gpt-4.1-mini",
            messages: [{
                role: "system",
                content: systemPrompt
            },{
                role: "user",
                content: `Context: ${context}\n\nQuestion: ${query}`
            }],
            temperature: 0.5,
            frequency_penalty: 0.5
        })
        return response.choices[0].message.content
    }catch(err){
        console.error(err)
    }
    
}