import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AppError, ValidationError } from '@/server/utils/errors';
import { errorResponse } from '@/server/utils/response';
import { logEvent } from '@/server/lib/logger';
import { captureError } from '@/server/lib/sentry';

/**
 * Wrapper de manejo de errores para endpoints
 * Captura y procesa errores de forma consistente
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');

      // Log estructurado con contexto
      logEvent.error('Error en endpoint', err, {
        error: err,
        metadata: {
          name: err.name,
          message: err.message,
          stack: err.stack,
        },
      });

      // Capturar en Sentry (solo errores 500, no 4xx)
      if (!(error instanceof AppError) || (error as AppError).statusCode >= 500) {
        captureError(err, {
          errorType: err.name,
          statusCode: error instanceof AppError ? (error as AppError).statusCode : 500,
        });
      }

      // Errores de validación Zod
      if (error instanceof ZodError) {
        return errorResponse(
          new ValidationError('Datos inválidos', error.issues),
          400
        );
      }

      // Errores de aplicación (con código de estado)
      if (error instanceof AppError) {
        return errorResponse(error, error.statusCode);
      }

      // Error genérico
      return errorResponse(err);
    }
  };
}

/**
 * Combina rate limiting y error handling
 */
export function withMiddleware<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>,
  options?: {
    rateLimit?: {
      limit?: number;
      window?: string;
    };
  }
) {
  let wrappedHandler = withErrorHandler(handler);

  if (options?.rateLimit) {
    // Lazy import to avoid circular dependency
    import('@/server/middleware/rate-limit').then(({ withRateLimitHandler }) => {
      wrappedHandler = withRateLimitHandler(wrappedHandler, options.rateLimit);
    });
  }

  return wrappedHandler;
}
