"use client"

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFallback, setIsFallback] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult('');
    setIsFallback(false);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to generate response');
      }

      setResult(data.result);
      setIsFallback(data.isFallback || false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <h1>📝 AI Writing Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your idea or question..."
          style={{ width: '100%', padding: 10 }}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        {error && (
          <div style={{ color: 'red', marginBottom: 10 }}>
            Error: {error}
          </div>
        )}
        {result && (
          <>
            <h3>AI Response:</h3>
            {isFallback && (
              <div style={{ 
                backgroundColor: '#fff3cd', 
                padding: 10, 
                borderRadius: 5,
                marginBottom: 10,
                border: '1px solid #ffeeba'
              }}>
                ⚠️ This is a fallback response. The AI service is currently unavailable.
              </div>
            )}
            <p>{result}</p>
          </>
        )}
      </div>
    </div>
  );
}
