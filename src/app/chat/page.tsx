'use client'

import { useState } from 'react'

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<{
    output: { content: string; role: string }
  } | null>(null)
  const handleClick = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: inputValue,
            },
          ],
        }),
      })
      if (!response.ok) {
        throw new Error('API request failed')
      }
      const data = await response.json()
      setApiResponse(data)
    } catch {
      setError('Failed to send message')
    }
  }

  return (
    <>
      <form onSubmit={handleClick}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Chat with me today"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </form>
      {apiResponse && <p> {apiResponse.output.content} </p>}
      {error && <p className="text-red-500">{error}</p>}
    </>
  )
}
