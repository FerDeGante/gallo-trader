# ==========================================
# GUÍA DE DEPLOYMENT EN RAILWAY
# ==========================================

## 📋 Pre-requisitos

✅ Railway CLI instalado: `npm install -g @railway/cli`
✅ Autenticado: `railway login`
✅ Proyecto creado en Railway

---

## 🚀 Pasos para Deployment

### 1. Crear proyecto en Railway (si no existe)

```bash
cd /Users/ferdegante35/Documents/Proyectos/gallo_trader/app
railway init
```

**Nombre sugerido**: `gallo-trader-api`

### 2. Agregar PostgreSQL Database

```bash
railway add --database postgres
```

O desde el dashboard de Railway:
- Click en "New" → "Database" → "PostgreSQL"

### 3. Configurar Variables de Entorno

**Desde CLI:**

```bash
# Auth
railway variables set AUTH_SECRET=$(openssl rand -base64 32)
railway variables set AUTH_TRUST_HOST=true

# URLs (Railway auto-genera RAILWAY_PUBLIC_DOMAIN)
railway variables set NEXTAUTH_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'
railway variables set NEXT_PUBLIC_APP_URL='https://${{RAILWAY_PUBLIC_DOMAIN}}'

# Database (Railway auto-genera DATABASE_URL desde Postgres)
# Asegúrate de tener estas variables:
railway variables set DATABASE_URL='${{PGDATABASE}}'
railway variables set DIRECT_URL='${{PGDATABASE}}'

# Stripe
railway variables set STRIPE_SECRET_KEY='tu_stripe_secret_key'
railway variables set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY='tu_stripe_publishable_key'
railway variables set STRIPE_WEBHOOK_SECRET='tu_webhook_secret'

# Upstash Redis (Rate Limiting)
railway variables set UPSTASH_REDIS_REST_URL='tu_upstash_url'
railway variables set UPSTASH_REDIS_REST_TOKEN='tu_upstash_token'

# Sentry (opcional)
railway variables set SENTRY_DSN='tu_sentry_dsn'
railway variables set SENTRY_AUTH_TOKEN='tu_sentry_token'
railway variables set SENTRY_ORG='tu_org'
railway variables set SENTRY_PROJECT='tu_project'
```

**O desde el Dashboard:**
1. Ve a tu proyecto en railway.app
2. Click en "Variables"
3. Agrega las variables necesarias

### 4. Ejecutar Migraciones

**Opción A - Localmente (recomendado para primera vez):**

```bash
# Asegúrate de tener las variables de Railway
railway run npm run db:migrate
railway run npm run db:seed
```

**Opción B - En Railway:**

Agrega a `package.json` un script de deploy:

```json
"scripts": {
  "deploy": "prisma migrate deploy && npm start"
}
```

Y modifica `railway.toml`:

```toml
[deploy]
startCommand = "npm run deploy"
```

### 5. Deploy

```bash
railway up
```

O para deployment automático desde Git:

```bash
# Conecta tu repositorio
railway link
```

### 6. Verificar Deployment

```bash
# Ver logs
railway logs

# Abrir en navegador
railway open

# Verificar health check
curl https://tu-dominio.railway.app/api/health
```

---

## 🔧 Variables de Entorno Requeridas

### Críticas (obligatorias)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Connection string de PostgreSQL | Auto-generada por Railway |
| `DIRECT_URL` | Direct connection (sin pooler) | Auto-generada por Railway |
| `AUTH_SECRET` | Secret para NextAuth | `openssl rand -base64 32` |
| `AUTH_TRUST_HOST` | Trust proxy headers | `true` |
| `NEXTAUTH_URL` | URL de la app | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `NEXT_PUBLIC_APP_URL` | URL pública | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |

### Stripe (requeridas para pagos)

| Variable | Descripción |
|----------|-------------|
| `STRIPE_SECRET_KEY` | API key de Stripe (sk_...) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key (pk_...) |
| `STRIPE_WEBHOOK_SECRET` | Webhook secret (whsec_...) |

### Opcionales

| Variable | Descripción |
|----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Para rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Token de Upstash |
| `SENTRY_DSN` | Monitoreo de errores |
| `NODE_ENV` | `production` (auto-set) |

---

## 📊 Monitoreo

### Health Check
```bash
curl https://tu-app.railway.app/api/health
```

### Logs en tiempo real
```bash
railway logs --follow
```

### Métricas
- Railway Dashboard → Metrics
- CPU, Memoria, Red

---

## 🐛 Troubleshooting

### Build falla

```bash
# Ver logs completos
railway logs --deployment

# Rebuild forzado
railway up --detach
```

### Database connection issues

```bash
# Verifica las variables
railway variables

# Regenera DATABASE_URL si es necesario
# Railway → Database → Settings → Connection
```

### Prisma migrations

```bash
# Reset completo (⚠️ BORRA DATOS)
railway run npx prisma migrate reset --force

# Deploy migrations
railway run npx prisma migrate deploy
```

---

## 🔄 Workflow Recomendado

1. **Desarrollo local** → test
2. **Push a Git** → Railway auto-deploy (si está conectado)
3. **O manual** → `railway up`
4. **Verificar** → `railway logs`
5. **Abrir** → `railway open`

---

## 📚 Recursos

- [Railway Docs](https://docs.railway.app)
- [Railway CLI Reference](https://docs.railway.app/develop/cli)
- [Next.js on Railway](https://docs.railway.app/guides/nextjs)
- [Prisma on Railway](https://docs.railway.app/databases/postgresql)

---

## ⚡ Comandos Rápidos

```bash
# Estado del proyecto
railway status

# Variables
railway variables

# Logs
railway logs --follow

# Deploy
railway up

# Abrir dashboard
railway open

# Ejecutar comando en Railway
railway run <comando>

# Listar proyectos
railway list

# Unlink proyecto
railway unlink
```
