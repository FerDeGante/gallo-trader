# Observability & Monitoring

Esta plataforma incluye **observability completa** para monitorear errores, performance y comportamiento de usuarios.

---

## 📊 Analytics (C2)

Sistema de tracking de eventos con soporte para múltiples proveedores.

### Eventos tracked

- **User events**: `user_registered`, `user_login`, `user_logout`
- **Program events**: `program_viewed`, `program_detail_viewed`, `program_outline_viewed`
- **Checkout events**: `checkout_started`, `checkout_completed`, `checkout_failed`
- **Content events**: `lesson_accessed`, `lesson_started`, `lesson_completed`, `lesson_progress_updated`, `module_completed`, `program_completed`
- **Admin events**: `admin_access_granted`, `admin_access_revoked`, `admin_enrollment_created`

### Providers configurados

#### Google Analytics 4 (GA4)

Server-side tracking con Measurement Protocol.

**Setup**:
1. Crear property en GA4
2. Ir a Admin > Data Streams > [Tu stream]
3. Crear Measurement Protocol API secret
4. Configurar en `.env`:

```env
GA4_MEASUREMENT_ID="G-XXXXXXXXXX"
GA4_API_SECRET="your-api-secret"
```

#### Meta Pixel (Facebook Conversions API)

Server-side tracking para Facebook Ads.

**Setup**:
1. Crear Pixel en Meta Business Manager
2. Ir a Events Manager > Settings > Conversions API
3. Generar access token
4. Configurar en `.env`:

```env
META_PIXEL_ID="1234567890"
META_ACCESS_TOKEN="your-access-token"
```

### Uso en código

```typescript
import { trackEvent } from '@/server/lib/analytics-setup';

// Track evento
trackEvent({
  event: 'checkout_completed',
  userId: user.id,
  programId: program.id,
  programTitle: program.title,
  paymentAmount: 9900, // en centavos
  paymentCurrency: 'USD',
});
```

---

## 🐛 Error Monitoring (C3)

Sistema de captura y monitoreo de errores con Sentry.

### Setup de Sentry

1. Crear proyecto en [sentry.io](https://sentry.io)
2. Copiar DSN desde Settings > Projects > Client Keys
3. Configurar en `.env`:

```env
SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
```

### Features

- ✅ Captura automática de errores en endpoints
- ✅ Source maps para stack traces legibles
- ✅ Context de usuario (ID, email, role)
- ✅ Filtrado de errores sensibles (tokens, cookies)
- ✅ Sampling configurable (10% en producción)
- ✅ Integración con error-handler middleware

### Captura manual de errores

```typescript
import { captureError, setUserContext } from '@/server/lib/sentry';

// Setear contexto de usuario
setUserContext({
  id: user.id,
  email: user.email,
  role: user.role,
});

// Capturar error con contexto
try {
  await someDangerousOperation();
} catch (error) {
  captureError(error, {
    programId: program.id,
    userId: user.id,
  });
  throw error;
}
```

---

## 📝 Structured Logging (C3)

Sistema de logs estructurados con Pino para debugging y auditoría.

### Niveles de log

- **debug**: Información detallada para desarrollo
- **info**: Operaciones normales del sistema
- **warn**: Situaciones inusuales pero manejables
- **error**: Errores que requieren atención

### Configuración

En `.env`:

```env
LOG_LEVEL="info"  # debug | info | warn | error
```

### Uso

```typescript
import { logEvent } from '@/server/lib/logger';

// Log básico
logEvent.info('Usuario autenticado', {
  userId: user.id,
});

// Log de error
logEvent.error('Fallo al procesar pago', error, {
  paymentId: payment.id,
  userId: user.id,
});

// Log especializado de pagos
logEvent.payment('Checkout iniciado', {
  userId: user.id,
  programId: program.id,
  paymentId: payment.id,
});

// Log de admin actions
logEvent.admin('Acceso revocado', {
  adminId: admin.id,
  userId: user.id,
  enrollmentId: enrollment.id,
});
```

### Output en desarrollo

En desarrollo usa `pino-pretty` para output colorizado y legible:

```
[15:30:45] INFO (payment): Payment: Checkout iniciado
    userId: "cm123..."
    programId: "cm456..."
    paymentId: "cm789..."
```

### Output en producción

En producción genera JSON estructurado para agregadores (Datadog, CloudWatch, etc.):

```json
{
  "level": "info",
  "time": 1704123045000,
  "context": "payment",
  "msg": "Payment: Checkout iniciado",
  "userId": "cm123...",
  "programId": "cm456...",
  "paymentId": "cm789..."
}
```

---

## 🔍 Dashboard de Observability

### Métricas recomendadas a monitorear

**Errores** (Sentry):
- Error rate por endpoint
- Error rate por tipo (4xx vs 5xx)
- Stack traces más frecuentes
- Usuarios afectados

**Performance** (GA4):
- Tiempo promedio de checkout
- Tasa de conversión (checkout_started → checkout_completed)
- Engagement por lección (lesson_started → lesson_completed)
- Retention de usuarios

**Business** (Custom dashboard con logs):
- Revenue diario/semanal/mensual
- Nuevos enrollments
- Progreso promedio de estudiantes
- Lecciones más populares

---

## 🚀 Deployment

### Vercel

Sentry funciona automáticamente en Vercel. Solo asegúrate de configurar las variables de entorno:

```bash
vercel env add SENTRY_DSN
vercel env add NEXT_PUBLIC_SENTRY_DSN
vercel env add GA4_MEASUREMENT_ID
vercel env add GA4_API_SECRET
```

### Source Maps

Para debugging en producción, Sentry necesita source maps. Esto se configura automáticamente con el package `@sentry/nextjs`.

---

## 📚 Referencias

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Pino Logger Docs](https://getpino.io/)
- [GA4 Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
- [Meta Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
