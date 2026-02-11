import { NextResponse } from 'next/server'

import logger, { getErrorMessageForLogger } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await fetch('https://api.sea-lion.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        Authorization: `Bearer ${process.env.SEALION_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'aisingapore/Gemma-SEA-LION-v4-27B-IT',
        messages: body.messages,
      }),
    })

    const data = await response.json()
    return NextResponse.json({ output: data.choices[0].message }, { status: 200 })
  } catch (error) {
    logger.error('Chat API error', {
      error: getErrorMessageForLogger(error),
    })
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 })
  }
}
