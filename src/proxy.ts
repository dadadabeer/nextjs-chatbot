import { auth } from '@/auth'

export default auth

// Configure which routes this proxy/middleware should protect and conduct authentication checks.
export const config = {
  matcher: ['/chat', '/chat/:path*'],
}
