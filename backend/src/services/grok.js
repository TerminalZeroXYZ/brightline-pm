import axios from 'axios'

/**
 * Evaluate a market suggestion using Grok API
 */
export async function evaluateSuggestion(title, description) {
  try {
    const response = await axios.post(
      'https://api.x.ai/v1/chat/completions',
      {
        model: 'grok-3',
        messages: [
          {
            role: 'system',
            content: `You are evaluating ideas for a prediction market about accidental fatalities on the Brightline high-speed train in Florida.
            
Score the idea from 0 to 100 based on:
- Clarity
- Verifiability (can it be resolved with official data like FRA, NTSB, Florida DOT?)
- Usefulness
- Sensitivity (avoid overly graphic or sensational ideas)

Return ONLY a JSON object like this:
{
  "score": 78,
  "feedback": "Clear and verifiable. Good candidate."
}`
          },
          {
            role: 'user',
            content: `Title: ${title}\n\nDescription: ${description}`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const content = response.data.choices[0].message.content
    // Try to parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    return {
      score: 65,
      feedback: 'Could not fully evaluate. Manual review recommended.'
    }
  } catch (error) {
    console.error('Grok API error:', error.message)
    // Fallback if Grok is unavailable
    return {
      score: 70,
      feedback: 'Grok evaluation temporarily unavailable. Default score applied.'
    }
  }
}
