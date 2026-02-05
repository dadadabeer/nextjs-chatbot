'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'

import { SignOut } from './sign-out'

export default function AuthButtons() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex items-center">
        <Button variant="ghost">
          <Link href="/">Home</Link>
        </Button>
        <SignOut />
      </div>
    )
  }
  return null
}
