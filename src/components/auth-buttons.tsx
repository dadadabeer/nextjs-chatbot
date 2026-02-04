'use client'

import { useSession } from 'next-auth/react'
import { SignOut } from './sign-out'
import Link from 'next/link'

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
