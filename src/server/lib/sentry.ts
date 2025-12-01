/**
 * Sentry initialization for error monitoring
 * Docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const ENV = process.env.NODE_ENV || 'development';
const RELEASE = process.env.VERCEL_GIT_COMMIT_SHA || 'dev';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENV,
    release: RELEASE,

    // Tracing
    tracesSampleRate: ENV === 'production' ? 0.1 : 1.0,

    // Session Replay (opcional - captura sesiones de usuarios con errores)
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Filtrar eventos sensibles
    beforeSend(event, hint) {
      // No enviar errores de autenticación esperados
      if (
        hint.originalException &&
        typeof hint.originalException === 'object' &&
        'message' in hint.originalException &&
        typeof hint.originalException.message === 'string' &&
        (hint.originalException.message.includes('Unauthorized') ||
          hint.originalException.message.includes('Authentication required'))
      ) {
        return null;
      }

      // Sanitizar datos sensibles
      if (event.request) {
        delete event.request.cookies;
        if (event.request.headers) {
          delete event.request.headers.authorization;
          delete event.request.headers.cookie;
        }
      }

      return event;
    },

    // Ignorar errores comunes de terceros
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
    ],
  });

  console.log(`✅ Sentry initialized (env: ${ENV}, release: ${RELEASE})`);
} else {
  console.log('⚠️ Sentry DSN not configured - error monitoring disabled');
}

/**
 * Helper para capturar errores manualmente
 */
export function captureError(error: Error, context?: Record<string, unknown>) {
  if (SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    console.error('Error captured (Sentry disabled):', error, context);
  }
}

/**
 * Helper para capturar mensajes informativos
 */
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  } else {
    console.log(`[Sentry ${level}]:`, message);
  }
}

/**
 * Helper para setear contexto de usuario
 */
export function setUserContext(user: { id: string; email?: string; role?: string }) {
  if (SENTRY_DSN) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }
}

/**
 * Helper para limpiar contexto de usuario (logout)
 */
export function clearUserContext() {
  if (SENTRY_DSN) {
    Sentry.setUser(null);
  }
}
