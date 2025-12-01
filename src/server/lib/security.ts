import crypto from 'crypto';
import { stripe } from './stripe';
import * as bcryptjs from 'bcryptjs';

/**
 * Verificar firma de webhook de Stripe
 */
export function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    stripe.webhooks.constructEvent(payload, signature, secret);
    return true;
  } catch (error) {
    console.error('Error verificando firma de Stripe:', error);
    return false;
  }
}

/**
 * Verificar firma de webhook de Coinbase Commerce
 */
export function verifyCoinbaseSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(payload).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(digest)
    );
  } catch (error) {
    console.error('Error verificando firma de Coinbase:', error);
    return false;
  }
}

/**
 * Generar token seguro
 */
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('base64url');
}

/**
 * Hash de contraseña seguro (para uso con bcrypt)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12);
}

/**
 * Verificar contraseña
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Sanitizar input de usuario (prevenir XSS básico)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remover < y >
    .trim();
}

/**
 * Validar que el origen del request es permitido
 */
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;

  const allowedOrigins = [
    process.env.NEXTAUTH_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean);

  return allowedOrigins.some((allowed) => origin.startsWith(allowed as string));
}
