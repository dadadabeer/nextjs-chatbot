import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import logger, { getErrorMessageForLogger } from '@/lib/logger'

if (!process.env.SEALION_API_KEY) {
  logger.error('SEALION_API_KEY is not configured')
  throw new Error('Server misconfiguration: Missing SEALION_API_KEY')
}

const client = new OpenAI({
  apiKey: process.env.SEALION_API_KEY,
  baseURL: 'https://api.sea-lion.ai/v1',
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const completion = await client.chat.completions.create({
      model: 'aisingapore/Gemma-SEA-LION-v4-27B-IT',
      messages: body.messages,
    })
    const response = completion.choices[0].message
    return NextResponse.json({ output: response }, { status: 200 })
  } catch (error) {
    logger.error('Chat API error', {
      error: getErrorMessageForLogger(error),
    })
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
