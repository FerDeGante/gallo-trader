# 🚀 Checklist de Deployment - Gallo Trader Backend

## Pre-deployment

### 1. Verificaciones locales

- [x] ✅ Todas las migraciones ejecutadas (`npm run db:migrate`)
- [x] ✅ Seed data funcionando (`npm run db:seed`)
- [x] ✅ Sin errores de TypeScript (`npm run build`)
- [x] ✅ Sin errores de ESLint críticos (`npm run lint`)
- [ ] ⚠️ Tests pasando (opcional - no implementados aún)

### 2. Variables de entorno

Verificar que tienes preparadas estas variables para producción:

#### Database (Requeridas)
- [ ] `DATABASE_URL` - URL del pooler de Supabase (puerto 5432)
- [ ] `DIRECT_URL` - URL directa para migrations (puerto 6543)

#### Auth (Requeridas)
- [ ] `NEXTAUTH_URL` - URL de producción (ej: https://gallotrader.com)
- [ ] `NEXTAUTH_SECRET` - Generar nuevo con `openssl rand -base64 32`

#### Stripe (Requeridas)
- [ ] `STRIPE_SECRET_KEY` - Cambiar de test a live mode
- [ ] `STRIPE_PUBLISHABLE_KEY` - Cambiar de test a live mode  
- [ ] `STRIPE_WEBHOOK_SECRET` - Configurar webhook en Stripe Dashboard

#### Coinbase Commerce (Opcional)
- [ ] `COINBASE_COMMERCE_API_KEY`
- [ ] `COINBASE_COMMERCE_WEBHOOK_SECRET`

#### Rate Limiting (Opcional pero recomendado)
- [ ] `UPSTASH_REDIS_REST_URL`
- [ ] `UPSTASH_REDIS_REST_TOKEN`

#### Analytics (Opcional)
- [ ] `GA4_MEASUREMENT_ID`
- [ ] `GA4_API_SECRET`
- [ ] `META_PIXEL_ID`
- [ ] `META_ACCESS_TOKEN`

#### Observability (Opcional pero recomendado)
- [ ] `SENTRY_DSN`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`
- [ ] `LOG_LEVEL=info`

---

## Deployment en Vercel

### 1. Configurar proyecto

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (primera vez)
vercel

# Deploy a producción
vercel --prod
```

### 2. Configurar variables de entorno

```bash
# Database
vercel env add DATABASE_URL
vercel env add DIRECT_URL

# Auth
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET

# Stripe
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_WEBHOOK_SECRET

# Sentry (opcional)
vercel env add SENTRY_DSN
vercel env add NEXT_PUBLIC_SENTRY_DSN

# Etc...
```

### 3. Configurar webhooks

#### Stripe Webhook:
1. Ir a [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Agregar endpoint: `https://tudominio.com/api/v1/webhooks/stripe`
3. Seleccionar evento: `checkout.session.completed`
4. Copiar el **Signing secret** a `STRIPE_WEBHOOK_SECRET`

#### Coinbase Commerce Webhook (opcional):
1. Ir a Coinbase Commerce Dashboard > Settings > Webhooks
2. Agregar URL: `https://tudominio.com/api/v1/webhooks/crypto`
3. Copiar el **Shared secret** a `COINBASE_COMMERCE_WEBHOOK_SECRET`

### 4. Ejecutar migraciones en producción

**Opción A: Desde local** (recomendado)
```bash
# Usar DIRECT_URL de producción temporalmente
DATABASE_URL="postgresql://..." npx prisma migrate deploy
```

**Opción B: En Vercel** (automático)
- Las migraciones se ejecutan en build si tienes `prisma migrate deploy` en scripts

### 5. Seed inicial (solo primera vez)

```bash
# Conectarse a BD de producción y ejecutar seed
DATABASE_URL="postgresql://..." npm run db:seed
```

---

## Post-deployment

### 1. Verificar endpoints

- [ ] `GET /api/v1/programs` - Debe retornar programa seeded
- [ ] `POST /api/v1/checkout/stripe` - Debe crear checkout session
- [ ] `POST /api/v1/webhooks/stripe` - Configurado en Stripe
- [ ] `GET /api/v1/me` - Requiere auth

### 2. Pruebas de integración

- [ ] Completar un checkout de prueba en Stripe (test mode primero)
- [ ] Verificar que se activa enrollment automáticamente
- [ ] Verificar que usuario puede acceder a lecciones
- [ ] Verificar que progreso se guarda correctamente

### 3. Monitoreo

- [ ] Verificar logs en Vercel Dashboard
- [ ] Verificar errores en Sentry (si configurado)
- [ ] Verificar eventos en GA4 (si configurado)
- [ ] Configurar alertas en Sentry para errores críticos

### 4. Seguridad

- [ ] ✅ Rate limiting activo (verificar en logs)
- [ ] ✅ Todos los endpoints admin protegidos con `requireAdmin()`
- [ ] ✅ Tokens JWT con expiración corta (5 min)
- [ ] ✅ Passwords hasheados con bcryptjs
- [ ] ⚠️ HTTPS habilitado (automático en Vercel)
- [ ] ⚠️ CORS configurado correctamente (si es necesario)

---

## Troubleshooting

### Error: "PrismaClient is unable to run in this browser environment"
**Solución**: Verificar que Prisma client solo se importa en server components/API routes, no en client components.

### Error: "Invalid signature" en webhook
**Solución**: Verificar que `STRIPE_WEBHOOK_SECRET` coincide con el secret de Stripe Dashboard.

### Error: Rate limit no funciona
**Solución**: 
- Verificar que `UPSTASH_REDIS_REST_URL` está configurado
- Si no usas Redis, el fallback in-memory funciona pero no es distribuido

### Logs no aparecen en Vercel
**Solución**: Verificar que `LOG_LEVEL` está en `info` o `debug`.

### Sentry no captura errores
**Solución**: 
- Verificar que `SENTRY_DSN` está configurado
- Verificar que archivos `sentry.*.config.ts` están en root del proyecto

---

## Rollback

Si algo falla en producción:

```bash
# Revertir a versión anterior
vercel rollback

# O hacer deploy de commit específico
git checkout <commit-hash>
vercel --prod
```

---

## Mantenimiento

### Backups de base de datos

Configurar backups automáticos en Supabase:
- Supabase > Settings > Database > Backups
- Configurar Point-in-Time Recovery (PITR)

### Actualizar dependencias

```bash
# Revisar actualizaciones
npm outdated

# Actualizar (con precaución)
npm update

# Actualizar Prisma
npm install prisma@latest @prisma/client@latest
npx prisma migrate deploy
npx prisma generate
```

### Monitoreo de costos

- [ ] Stripe: Revisar dashboard de transacciones
- [ ] Supabase: Revisar usage dashboard
- [ ] Vercel: Revisar billing
- [ ] Upstash: Revisar Redis usage
- [ ] Sentry: Revisar quota usage

---

## Contactos de soporte

- **Stripe Support**: https://support.stripe.com
- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **Sentry Support**: https://sentry.io/support

---

✅ **Checklist completado**: ___ / ___ items
📅 **Fecha de deployment**: __________
🚀 **URL de producción**: __________
