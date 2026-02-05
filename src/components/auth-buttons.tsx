'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { SignOut } from './sign-out'

export default function AuthButtons() {
  const { data } = useSession()

  if (data) {
    return (
      <div className="flex items-center">
        <Link href="/" className="mr-4">
          {' '}
          Home{' '}
        </Link>
        <SignOut />
      </div>
    )
  }
  return null
}
