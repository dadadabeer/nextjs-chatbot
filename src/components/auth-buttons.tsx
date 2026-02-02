'use client'

import { useSession } from 'next-auth/react'
import SignIn from './sign-in'
import { SignOut } from './sign-out'

export default function AuthButtons() {
  const { data } = useSession()

  if (data) {
    return (
      <div>
        <SignOut />
      </div>
    )
  }
  return <SignIn />
}
