'use client'

import { useSession } from 'next-auth/react'
import SignIn from '@/components/sign-in'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { data } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Welcome to NextJS Chatbot</h1>
        <p className="text-muted-foreground">
          {data ? 'Ready to chat!' : 'Sign in to start chatting'}
        </p>
      </div>

      {data ? (
        <Link href="/chat">
          <Button size="lg">Go to Chat</Button>
        </Link>
      ) : (
        <SignIn />
      )}
    </div>
  )
}
