import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Rate limiter for login attempts: 5 attempts per 15 minutes per IP.
 * Uses sliding window algorithm for smooth rate limiting.
 */
const loginRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:login',
})

/**
 * Rate limiter for contact form: 5 messages per 15 minutes per IP.
 */
const contactRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:contact',
})

/**
 * Get client IP address from request headers.
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return '127.0.0.1'
}

/**
 * Middleware that combines Auth.js session verification with rate limiting.
 *
 * - Protects all /admin/* routes except /admin/login (handled by Auth.js authorized callback)
 * - Rate limits POST requests to /admin/login (5 attempts / 15 min per IP)
 * - Rate limits POST requests to /api/contact (5 messages / 15 min per IP)
 */
export default auth(async function middleware(request) {
  const { pathname } = request.nextUrl

  // Rate limit login attempts (POST only)
  if (pathname === '/admin/login' && request.method === 'POST') {
    const ip = getClientIp(request)
    const { success, reset } = await loginRatelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error: 'Ha excedido el número máximo de intentos. Intente nuevamente en 15 minutos.',
          resetAt: reset,
        },
        { status: 429 }
      )
    }
  }

  // Rate limit contact form submissions (POST only)
  if (pathname === '/api/contact' && request.method === 'POST') {
    const ip = getClientIp(request)
    const { success, reset } = await contactRatelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        {
          error: 'Ha excedido el número máximo de intentos. Intente nuevamente en 15 minutos.',
          resetAt: reset,
        },
        { status: 429 }
      )
    }
  }

  // Auth.js handles route protection via the `authorized` callback in auth.ts
  // If we reach here, the request is allowed to proceed
  return NextResponse.next()
})

/**
 * Matcher configuration:
 * - /admin/:path* — All admin routes (protection + login rate limiting)
 * - /api/contact — Contact form rate limiting
 */
export const config = {
  matcher: ['/admin/:path*', '/api/contact'],
}
