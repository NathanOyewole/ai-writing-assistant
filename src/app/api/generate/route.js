import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback responses for different types of prompts
const fallbackResponses = {
  default: "I apologize, but I'm currently unable to access the AI service. This is a fallback response. Please try again later or check your API configuration.",
  greeting: "Hello! I'm currently in fallback mode. While I can't provide AI-generated responses right now, I'm here to help with basic interactions.",
  question: "I'm sorry, but I'm currently unable to process your question through the AI service. This is a fallback response. Please try again later.",
  creative: "I'm currently operating in fallback mode. While I can't generate creative content right now, I'm still here to assist you with basic responses."
};

// Function to determine the type of prompt
function getPromptType(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.match(/^(hi|hello|hey|greetings)/)) return 'greeting';
  if (lowerPrompt.includes('?')) return 'question';
  if (lowerPrompt.match(/^(write|create|generate|make)/)) return 'creative';
  return 'default';
}

// Function to get a fallback response
function getFallbackResponse(prompt) {
  const promptType = getPromptType(prompt);
  return fallbackResponses[promptType] || fallbackResponses.default;
}

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || prompt.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      const result = response.choices[0].message.content;
      
      return new Response(JSON.stringify({ result }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (apiError) {
      // Handle specific API errors
      if (apiError.status === 429 || apiError.code === 'insufficient_quota') {
        console.log('API quota exceeded, using fallback response');
        const fallbackResult = getFallbackResponse(prompt);
        return new Response(JSON.stringify({ 
          result: fallbackResult,
          isFallback: true 
        }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // For other API errors, throw to be caught by outer catch
      throw apiError;
    }
  } catch (error) {
    console.error('Error:', error);
    
    // Provide a generic error response
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate response',
        message: 'The service is currently unavailable. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 