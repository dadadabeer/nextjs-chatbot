import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './lib/zod'
import Google from 'next-auth/providers/google'

const IS_CREDENTIALS_MODE = process.env.NEXT_PUBLIC_AUTH_MODE === 'credentials'

const TEST_USER = {
  id: '1',
  name: process.env.TEST_USER_NAME,
  email: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PASSWORD,
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: IS_CREDENTIALS_MODE
    ? [
        Credentials({
          credentials: {
            email: {},
            password: {},
          },
          authorize: async (credentials) => {
            try {
              const { email, password } = await signInSchema.parseAsync(credentials)
              if (email !== TEST_USER.email || password !== TEST_USER.password) {
                throw new Error('Invalid credentials.')
              }
              return {
                id: TEST_USER.id,
                name: TEST_USER.name,
                email: TEST_USER.email,
              }
            } catch {
              return null
            }
          },
        }),
      ]
    : [Google],
  callbacks: {
    authorized: async ({ auth }) => {
      return Boolean(auth)
    },
  },
})
