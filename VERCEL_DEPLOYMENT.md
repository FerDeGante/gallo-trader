# Gallo Trader - Vercel Deployment

Este documento describe cómo desplegar el frontend de Gallo Trader en Vercel.

## Variables de Entorno Requeridas

Configura estas variables en Vercel (Settings > Environment Variables):

### Database
```
DATABASE_URL=<tu_postgresql_url>
DIRECT_URL=<tu_postgresql_direct_url>
```

### NextAuth
```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=<generar_con_openssl_rand_-base64_32>
```

### Stripe
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Upstash Redis
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Sentry (Opcional)
```
SENTRY_AUTH_TOKEN=...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

### App Configuration
```
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
NODE_ENV=production
```

## Configuración de Build

La configuración está en `vercel.json`:

```json
{
  "buildCommand": "npm run db:generate && npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Webhook de Stripe

1. En el dashboard de Stripe, crea un nuevo webhook endpoint
2. URL: `https://tu-dominio.vercel.app/api/v1/webhooks/stripe`
3. Eventos a escuchar:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copia el signing secret y agrégalo como `STRIPE_WEBHOOK_SECRET`

## Migraciones de Base de Datos

Las migraciones se ejecutan automáticamente durante el build gracias a `npm run db:generate`.

Si necesitas ejecutar migraciones manualmente:
```bash
vercel env pull .env.local
npm run db:migrate
```

## Notas Importantes

- ✅ Usa claves de producción de Stripe
- ✅ NEXTAUTH_URL debe ser tu dominio de Vercel
- ✅ Configura correctamente el webhook de Stripe
- ✅ El proyecto está en el directorio `/app`
- ✅ Root Directory en Vercel debe ser `app`
