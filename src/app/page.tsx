'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import SignIn from '@/containers/sign-in'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">Welcome to NextJS Chatbot</h1>
        <p className="text-muted-foreground">
          {session ? 'Ready to chat!' : 'Sign in to start chatting'}
        </p>
      </div>

      {session ? (
        <Link href="/chat">
          <Button size="lg" variant="secondary">
            Go to Chat
          </Button>
        </Link>
      ) : (
        <SignIn />
      )}
    </div>
  )
}
