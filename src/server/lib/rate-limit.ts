import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Configuración de Redis (opcional - solo si tienes Upstash configurado)
// Si no tienes Redis, el rate limiting será en memoria (no persistente entre restarts)
let redis: Redis | undefined;
let ratelimit: Ratelimit | undefined;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests por 10 segundos
    analytics: true,
    prefix: '@upstash/ratelimit',
  });
}

/**
 * Rate limiter para endpoints sensibles
 */
export async function checkRateLimit(
  identifier: string,
  limit = 10
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // Si no hay Redis configurado, permitir todas las requests (desarrollo)
  if (!ratelimit) {
    return {
      success: true,
      limit,
      remaining: limit,
      reset: Date.now() + 10000,
    };
  }

  const { success, limit: maxLimit, remaining, reset } = await ratelimit.limit(identifier);

  return {
    success,
    limit: maxLimit,
    remaining,
    reset,
  };
}

/**
 * Rate limiter estricto para autenticación (5 intentos por minuto)
 */
export async function checkAuthRateLimit(identifier: string) {
  if (!redis) {
    return { success: true, limit: 5, remaining: 5, reset: Date.now() + 60000 };
  }

  const authLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit/auth',
  });

  const { success, limit, remaining, reset } = await authLimiter.limit(identifier);

  return {
    success,
    limit,
    remaining,
    reset,
  };
}

/**
 * Rate limiter para webhooks (más permisivo pero con protección)
 */
export async function checkWebhookRateLimit(identifier: string) {
  if (!redis) {
    return { success: true, limit: 100, remaining: 100, reset: Date.now() + 60000 };
  }

  const webhookLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit/webhook',
  });

  const { success, limit, remaining, reset } = await webhookLimiter.limit(identifier);

  return {
    success,
    limit,
    remaining,
    reset,
  };
}
