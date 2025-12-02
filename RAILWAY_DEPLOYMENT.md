# Gallo Trader - Railway Deployment

Este documento describe cómo desplegar el backend de Gallo Trader en Railway.

## Variables de Entorno Requeridas

Configura estas variables en Railway:

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
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
```

### Upstash Redis
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### Sentry (Opcional)
```
SENTRY_DSN=https://...@sentry.io/...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_AUTH_TOKEN=...
```

## Comandos de Build

Railway detectará automáticamente Next.js. Asegúrate de que:

1. **Build Command**: `npm run db:generate && npm run build`
2. **Start Command**: `npm start`

## Base de Datos

Railway proveerá PostgreSQL. Después del primer deploy:

1. Ejecuta las migraciones:
```bash
railway run npm run db:migrate
```

2. Opcional - Ejecuta el seed:
```bash
railway run npm run db:seed
```

## Notas Importantes

- Usa variables de producción de Stripe (no test keys)
- Genera un NEXTAUTH_SECRET seguro
- Configura el webhook de Stripe con la URL de Railway
- El dominio de NEXTAUTH_URL debe coincidir con tu dominio de producción
