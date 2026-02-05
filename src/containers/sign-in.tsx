'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  const IS_CREDENTIALS_MODE = process.env.NEXT_PUBLIC_AUTH_MODE === 'credentials'
  if (IS_CREDENTIALS_MODE) {
    const credentialsAction = (formData: FormData) => {
      const email = formData.get('email') as string
      const password = formData.get('password') as string
      signIn('credentials', {
        email,
        password,
        redirectTo: '/chat',
      })
    }

    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={credentialsAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Sign in with your Google account</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button
          onClick={() => signIn('google', { redirectTo: '/chat' })}
          className="w-full"
          variant="outline"
        >
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  )
}
