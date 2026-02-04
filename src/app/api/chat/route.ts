import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.SEALION_API_KEY,
  baseURL: 'https://api.sea-lion.ai/v1',
})

export async function POST(req: Request) {
  const body = await req.json()

  const completion = await client.chat.completions.create({
    model: 'aisingapore/Gemma-SEA-LION-v4-27B-IT',
    messages: body.messages,
  })

  const theResponse = completion.choices[0].message

  return NextResponse.json({ output: theResponse }, { status: 200 })
}
