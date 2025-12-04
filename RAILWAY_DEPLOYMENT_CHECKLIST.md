# ==========================================
# CHECKLIST DE DEPLOYMENT EN RAILWAY
# ==========================================

## ✅ Pre-Deployment

### 1. Railway CLI
- [ ] Railway CLI instalado: `railway --version`
- [ ] Autenticado: `railway whoami`
- [ ] Proyecto creado/vinculado: `railway status`

### 2. Archivos de Configuración
- [ ] `railway.toml` creado
- [ ] `Dockerfile` optimizado (multi-stage)
- [ ] `.dockerignore` configurado
- [ ] Health check endpoint: `/api/health`

### 3. Database Setup
- [ ] PostgreSQL agregado en Railway: `railway add --database postgres`
- [ ] Variables `DATABASE_URL` y `DIRECT_URL` auto-generadas

---

## 🔧 Variables de Entorno

### Críticas (REQUERIDAS)
- [ ] `AUTH_SECRET` - Generado con `openssl rand -base64 32`
- [ ] `AUTH_TRUST_HOST=true`
- [ ] `NEXTAUTH_URL` - `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `NEXT_PUBLIC_APP_URL` - `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `DATABASE_URL` - Auto-generada por Railway Postgres
- [ ] `DIRECT_URL` - Auto-generada por Railway Postgres

### Stripe (REQUERIDAS para pagos)
- [ ] `STRIPE_SECRET_KEY` - Tu secret key de Stripe
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Tu publishable key
- [ ] `STRIPE_WEBHOOK_SECRET` - Webhook secret (configurar después del deploy)

### Opcionales
- [ ] `UPSTASH_REDIS_REST_URL` - Para rate limiting
- [ ] `UPSTASH_REDIS_REST_TOKEN` - Token de Upstash
- [ ] `SENTRY_DSN` - Para monitoreo de errores
- [ ] `SENTRY_AUTH_TOKEN` - Token de Sentry
- [ ] `SENTRY_ORG` - Organización de Sentry
- [ ] `SENTRY_PROJECT` - Proyecto de Sentry

---

## 📝 Comandos de Setup

### Paso 1: Crear/Vincular Proyecto
```bash
cd /Users/ferdegante35/Documents/Proyectos/gallo_trader/app

# Opción A: Crear nuevo proyecto
railway init
# Nombre sugerido: gallo-trader-api

# Opción B: Vincular proyecto existente
railway link
```

### Paso 2: Agregar Database
```bash
railway add --database postgres
```

### Paso 3: Configurar Variables Básicas
```bash
# Ejecutar script automático
npm run railway:setup

# O manualmente:
railway variables set AUTH_SECRET=$(openssl rand -base64 32)
railway variables set AUTH_TRUST_HOST=true
railway variables set NEXTAUTH_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
railway variables set NEXT_PUBLIC_APP_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
```

### Paso 4: Configurar Stripe
```bash
railway variables set STRIPE_SECRET_KEY='sk_live_...' # o sk_test_...
railway variables set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='pk_live_...' # o pk_test_...
```

### Paso 5: Ejecutar Migraciones
```bash
railway run npm run db:migrate
```

### Paso 6: Seed Database (opcional)
```bash
railway run npm run db:seed
```

### Paso 7: Deploy
```bash
# Opción A: Script automático
npm run railway:deploy

# Opción B: Manual
railway up
```

---

## 🔍 Post-Deployment

### 1. Verificar Health Check
```bash
# Ver el dominio generado
railway status

# Probar health check
curl https://tu-dominio.railway.app/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-12-02T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### 2. Configurar Stripe Webhook
- [ ] Ir a Stripe Dashboard → Webhooks
- [ ] Agregar endpoint: `https://tu-dominio.railway.app/api/webhooks/stripe`
- [ ] Seleccionar eventos:
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
- [ ] Copiar webhook secret
- [ ] Configurar en Railway:
  ```bash
  railway variables set STRIPE_WEBHOOK_SECRET='whsec_...'
  ```

### 3. Probar la Aplicación
- [ ] Abrir app: `railway open`
- [ ] Probar login con usuarios del seed
- [ ] Probar flujo de checkout (modo test)
- [ ] Verificar logs: `railway logs --follow`

### 4. Monitoreo
- [ ] Configurar alertas en Railway Dashboard
- [ ] Verificar métricas (CPU, RAM, Network)
- [ ] Configurar Sentry si está disponible

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Ver logs detallados
railway logs --deployment

# Rebuild
railway up --detach
```

### Database Connection Issues
```bash
# Verificar variables
railway variables | grep DATABASE

# Test connection
railway run npx prisma db pull
```

### Application Crashes
```bash
# Ver logs en tiempo real
railway logs --follow

# Restart service
railway restart
```

### Prisma Issues
```bash
# Regenerar cliente
railway run npx prisma generate

# Reset database (⚠️ BORRA DATOS)
railway run npx prisma migrate reset --force
```

---

## 📊 Comandos Útiles

```bash
# Estado del proyecto
railway status

# Ver variables
railway variables

# Ver logs
railway logs --follow

# Ejecutar comando en Railway
railway run <comando>

# Abrir dashboard
railway open

# Restart service
railway restart

# Eliminar proyecto
railway down
```

---

## 🎯 Checklist Final

### Pre-Deploy
- [ ] Todas las variables configuradas
- [ ] Database agregada
- [ ] Migraciones ejecutadas
- [ ] Archivos de configuración listos

### Deploy
- [ ] Build exitoso
- [ ] Health check responde OK
- [ ] Logs no muestran errores críticos

### Post-Deploy
- [ ] Login funciona
- [ ] Stripe webhook configurado
- [ ] Checkout flow probado
- [ ] Monitoreo configurado

---

## 📚 Notas Importantes

1. **NODE_ENV**: Railway lo configura automáticamente a `production`
2. **PORT**: Railway asigna el puerto automáticamente (usa 3000 internamente)
3. **DATABASE_URL**: Se genera automáticamente al agregar PostgreSQL
4. **RAILWAY_PUBLIC_DOMAIN**: Variable generada por Railway con tu dominio
5. **Logs**: Usa `railway logs --follow` para debugging en tiempo real

---

## ✅ Deploy Completo

Una vez completados todos los pasos:

```bash
# Verificación final
railway status
railway variables
curl https://tu-dominio.railway.app/api/health
railway logs --tail 50
```

Si todo está verde, ¡deployment exitoso! 🎉
