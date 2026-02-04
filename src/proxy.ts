import { auth } from '@/auth'

export default auth

export const config = {
  matcher: [
    // Protect everything EXCEPT: /, /api/auth/*, static files
    '/((?!$|api/auth|_next|favicon.ico|images).*)',
  ],
}
