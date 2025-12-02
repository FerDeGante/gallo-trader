# Gallo Trader - Railway Deployment (API Backend)

Este documento describe cómo desplegar el **backend API** de Gallo Trader en Railway.

## Variables de Entorno Requeridas

Configura estas variables en Railway:

### Database
```
DATABASE_URL=<tu_supabase_connection_pooler_url>
DIRECT_URL=<tu_supabase_direct_connection_url>
```

### NextAuth
```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=<generar_con: openssl rand -base64 32>
AUTH_SECRET=<mismo_valor_que_NEXTAUTH_SECRET>
```

### Stripe (con claves COMPLETAS)
```
STRIPE_SECRET_KEY=<tu_stripe_secret_key_completa>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<tu_stripe_publishable_key>
STRIPE_PRICE_ID=<tu_stripe_price_id>
STRIPE_WEBHOOK_SECRET=(configurar después del primer deploy)
```

### App Config
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

## Configuración Automática

Railway detectará Next.js automáticamente gracias a `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run db:generate && npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

## Pasos de Deployment

1. **Conecta tu repositorio**
   - Ve a [railway.app](https://railway.app)
   - New Project > Deploy from GitHub
   - Selecciona `FerDeGante/gallo-trader`

2. **Configura variables de entorno**
   - Ve a Variables tab
   - Pega todas las variables de arriba

3. **Deploy automático**
   - Railway hará build y deploy automáticamente
   - El build incluye `prisma generate`

4. **Obtén tu URL**
   - Railway te dará una URL como: `https://gallo-trader-production.up.railway.app`
   - Copia esta URL

5. **Actualiza Vercel**
   - Ve a Vercel > Settings > Environment Variables
   - Actualiza `API_URL` y `NEXT_PUBLIC_API_URL` con la URL de Railway
   - Redeploy en Vercel

## Webhook de Stripe

Después del deploy en Railway:

1. Ve a [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Endpoint URL: `https://tu-app.railway.app/api/v1/webhooks/stripe`
3. Eventos: `checkout.session.completed`, `payment_intent.succeeded`
4. Copia el signing secret
5. Actualiza `STRIPE_WEBHOOK_SECRET` en Railway

## Comandos Útiles

```bash
# Ver logs en tiempo real
railway logs

# Ejecutar migraciones
railway run npm run db:migrate

# Ejecutar seed
railway run npm run db:seed
```

## Arquitectura

```
Usuario → Vercel (Frontend) → Railway (API/Backend) → Supabase (Database)
                                    ↓
                              Stripe (Payments)
```
