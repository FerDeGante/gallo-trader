# 🚀 Deploy Rápido a Vercel

## ✅ Pre-requisitos Listos

- ✅ WhatsApp button integrado (777-103-5232)
- ✅ Build exitoso sin errores
- ✅ Todas las configuraciones listas

## 🎯 Deploy en 5 Minutos

### 1. Preparar Código
```bash
cd /Users/ferdegante35/Documents/Proyectos/gallo_trader/app
git add .
git commit -m "🚀 Production ready: Bootcamp + WhatsApp"
git push origin main
```

### 2. Deploy en Vercel

#### Opción A: Desde Dashboard (Recomendado)
1. Ve a https://vercel.com/new
2. Importa `FerDeGante/gallo-trader`
3. Root Directory: `app`
4. Click "Deploy"

#### Opción B: Desde CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```env
# Base de Datos (crear en Vercel Storage)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Auth (generar: openssl rand -base64 32)
NEXTAUTH_SECRET=tu_secret_aqui
NEXTAUTH_URL=https://tu-dominio.vercel.app

# Stripe (dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (configurar después)

# Discord & WhatsApp (ya configurados)
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/YFrN3mDk
NEXT_PUBLIC_WHATSAPP_NUMBER=5217771035232
```

### 4. Configurar Base de Datos

En Vercel Dashboard:
1. Storage → Create Database → Postgres
2. Nombre: `gallo-trader-db`
3. Copiar `POSTGRES_PRISMA_URL` → `DATABASE_URL`
4. Copiar `POSTGRES_URL_NON_POOLING` → `DIRECT_URL`

Ejecutar migraciones:
```bash
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

### 5. Configurar Stripe Webhook

1. https://dashboard.stripe.com/webhooks
2. Endpoint: `https://tu-dominio.vercel.app/api/v1/webhooks/stripe`
3. Eventos: `checkout.session.completed`
4. Copiar `Signing secret` → `STRIPE_WEBHOOK_SECRET` en Vercel

### 6. Re-deploy

```bash
git commit --allow-empty -m "Update env vars"
git push origin main
```

## ✅ Verificación

- [ ] Landing carga en `https://tu-dominio.vercel.app`
- [ ] Video de YouTube se reproduce
- [ ] Botón WhatsApp abre chat con 7771035232
- [ ] Checkout abre Stripe ($1,000)
- [ ] Después de pagar → Success page con Discord link

## 📞 Contacto de Soporte

WhatsApp: 777-103-5232
Discord: https://discord.gg/YFrN3mDk

## 🎉 ¡Listo para lanzar!

El bootcamp Master Funding está ready para producción.
