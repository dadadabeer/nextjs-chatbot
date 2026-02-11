'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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
      setInputValue('')
    } catch {
      setError('Failed to send message')
    }
  }

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-4 min-h-[400px] space-y-4">
        {apiResponse && (
          //prose headings refers to all headings from the typography plugin convention
          <div className="chat-response bg-muted prose prose-sm dark:prose-invert max-w-none rounded-lg p-4">
            <ReactMarkdown>{apiResponse.output.content}</ReactMarkdown>
          </div>
        )}
      </div>
      <form onSubmit={handleClick} className="space-y-2">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          rows={3}
        />
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={!inputValue.trim()}>
            Send Message
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  )
}
