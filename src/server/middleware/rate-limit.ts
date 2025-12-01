import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/server/lib/rate-limit';

/**
 * Middleware de rate limiting
 */
export async function withRateLimit(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>,
  options?: {
    limit?: number;
    window?: string;
    identifier?: string;
  }
) {
  // Obtener identificador (IP o user-agent)
  const identifier =
    options?.identifier ||
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  const result = await checkRateLimit(identifier, options?.limit);

  if (!result.success) {
    return NextResponse.json(
      {
        error: {
          message: 'Demasiadas solicitudes. Por favor intenta más tarde.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': result.limit.toString(),
          'X-RateLimit-Remaining': result.remaining.toString(),
          'X-RateLimit-Reset': result.reset.toString(),
        },
      }
    );
  }

  const response = await handler(request);

  // Agregar headers de rate limit
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', result.reset.toString());

  return response;
}

/**
 * Wrapper para endpoints que necesitan rate limiting
 */
export function withRateLimitHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
  options?: {
    limit?: number;
    window?: string;
  }
) {
  return async (...args: T): Promise<NextResponse> => {
    const request = args[0] as NextRequest;
    return withRateLimit(request, () => handler(...args), options);
  };
}
