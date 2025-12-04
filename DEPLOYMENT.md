# Master Funding Bootcamp - Deploy Guide

## Variables de Entorno Requeridas

### Base de Datos (PostgreSQL)
```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..." # URL directa sin pooler para migraciones
```

### NextAuth
```bash
NEXTAUTH_SECRET="tu-secret-random-aqui" # Genera con: openssl rand -base64 32
NEXTAUTH_URL="https://tu-dominio.com"  # URL de producción
```

### Stripe
```bash
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### Email (Opcional)
```bash
RESEND_API_KEY="re_..." # Si usas Resend para emails
```

---

## 🚀 Deploy en Vercel

### 1. Preparación
```bash
# Asegúrate de que el build funciona localmente
npm run build

# Push a GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Configurar Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Configura las variables de entorno (ver arriba)
4. Deploy!

### 3. Webhook de Stripe

Después del deploy, configura el webhook en Stripe:

**URL del Webhook:**
```
https://tu-dominio.vercel.app/api/v1/webhooks/stripe
```

**Eventos a escuchar:**
- `checkout.session.completed`
- `charge.refunded`
- `payment_intent.payment_failed`

---

## 🚂 Deploy en Railway

### 1. Preparación

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login
```

### 2. Configurar Proyecto

```bash
# Crear nuevo proyecto
railway init

# Vincular con Railway
railway link
```

### 3. Configurar Variables

En Railway Dashboard:
1. Ve a tu proyecto
2. Settings → Variables
3. Agrega todas las variables de entorno (ver arriba)

### 4. Deploy

```bash
# Deploy automático con cada push
git push

# O deploy manual
railway up
```

### 5. Configurar Base de Datos

Railway puede provisionar PostgreSQL automáticamente:

1. En tu proyecto de Railway
2. Click en "New" → "Database" → "Add PostgreSQL"
3. Railway automáticamente agregará `DATABASE_URL`

### 6. Ejecutar Migraciones

```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

---

## 📋 Checklist Pre-Deploy

- [ ] Todas las variables de entorno configuradas
- [ ] Base de datos PostgreSQL lista
- [ ] `npm run build` funciona sin errores
- [ ] Archivos `.env.local` NO incluidos en git
- [ ] Logo `/public/gallo_simbolo.png` existe
- [ ] Stripe configurado en modo producción
- [ ] Webhook de Stripe apuntando al dominio correcto

---

## 🔍 Verificar Deployment

### URLs para probar:
- `/` - Landing del bootcamp
- `/academy` - Academia completa
- `/bootcamp` - Bootcamp (redirección a /)
- `/bootcamp/success` - Página de éxito
- `/api/health` - Health check
- `/api/v1/webhooks/stripe` - Webhook de Stripe

### Logs
```bash
# Vercel
vercel logs

# Railway
railway logs
```

---

## 🐛 Troubleshooting

### Error: "DATABASE_URL not found"
- Verifica que la variable esté configurada en Vercel/Railway
- Ejecuta migraciones: `npx prisma migrate deploy`

### Error: "NEXTAUTH_SECRET missing"
- Genera un secret: `openssl rand -base64 32`
- Agrégalo a las variables de entorno

### Webhooks no funcionan
- Verifica que el endpoint esté accesible
- Checa los logs del webhook en Stripe Dashboard
- Asegúrate de que `STRIPE_WEBHOOK_SECRET` esté configurado

---

## 📊 Dominios Personalizados

### Vercel
1. Project Settings → Domains
2. Agrega tu dominio
3. Configura DNS según instrucciones

### Railway
1. Project Settings → Domains
2. Agrega dominio personalizado
3. Configura CNAME en tu DNS

---

## 🔒 Seguridad

- Nunca expongas `.env.local` en git
- Usa Stripe en modo `live` solo en producción
- Mantén `NEXTAUTH_SECRET` seguro y único
- Revisa logs regularmente

---

**¡Listo para deploy! 🚀**
