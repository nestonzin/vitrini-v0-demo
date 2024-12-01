import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simples implementação de rate limiting em memória
// Em produção, use um armazenamento distribuído como Redis
const rateLimit = new Map()

export function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const now = Date.now()
  const windowSize = 60 * 1000 // 1 minuto
  const maxRequests = 100 // Máximo de 100 requisições por minuto

  const requestCount = rateLimit.get(ip) || []
  const validRequests = requestCount.filter((timestamp: number) => now - timestamp < windowSize)

  if (validRequests.length >= maxRequests) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  validRequests.push(now)
  rateLimit.set(ip, validRequests)

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}

