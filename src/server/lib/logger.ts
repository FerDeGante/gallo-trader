/**
 * Structured logging con Pino
 * Centraliza el logging de la aplicación con niveles y contexto
 */

import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  
  // En desarrollo, usar pino-pretty para output legible
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      }
    : undefined,

  // En producción, formatear como JSON para agregación (Datadog, CloudWatch, etc.)
  formatters: !isDevelopment
    ? {
        level: (label) => {
          return { level: label };
        },
      }
    : undefined,

  // Serializers para tipos comunes
  serializers: {
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});

/**
 * Child logger para contextos específicos (módulo, servicio, etc.)
 */
export function createLogger(context: string) {
  return logger.child({ context });
}

/**
 * Tipos de eventos de logging
 */
export type LogContext = {
  userId?: string;
  programId?: string;
  lessonId?: string;
  enrollmentId?: string;
  paymentId?: string;
  error?: Error;
  metadata?: Record<string, unknown>;
};

/**
 * Helpers de logging con contexto
 */
export const logEvent = {
  /**
   * Log de info (operaciones normales)
   */
  info(message: string, context?: LogContext) {
    logger.info(context, message);
  },

  /**
   * Log de warning (situaciones inusuales pero manejables)
   */
  warn(message: string, context?: LogContext) {
    logger.warn(context, message);
  },

  /**
   * Log de error (errores capturados)
   */
  error(message: string, error: Error, context?: LogContext) {
    logger.error({ ...context, err: error }, message);
  },

  /**
   * Log de debug (útil para desarrollo)
   */
  debug(message: string, context?: LogContext) {
    logger.debug(context, message);
  },

  /**
   * Log de operación de pago
   */
  payment(action: string, context: LogContext) {
    logger.info({ ...context, type: 'payment' }, `Payment: ${action}`);
  },

  /**
   * Log de acceso a contenido
   */
  access(action: string, context: LogContext) {
    logger.info({ ...context, type: 'access' }, `Access: ${action}`);
  },

  /**
   * Log de admin action
   */
  admin(action: string, context: LogContext & { adminId: string }) {
    logger.info({ ...context, type: 'admin' }, `Admin: ${action}`);
  },
};
