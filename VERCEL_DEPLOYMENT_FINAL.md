# 🚀 Guía de Deployment en Vercel - Master Funding Bootcamp

## ✅ Pre-requisitos Completados

- [x] Bootcamp landing page funcional
- [x] Integración de Stripe checkout ($1,000)
- [x] Sistema de emails configurado
- [x] WhatsApp button integrado (777-103-5232)
- [x] Video de YouTube embebido
- [x] Build sin errores
- [x] Configuración de Vercel lista

## 📋 Paso a Paso para Deployment

### 1️⃣ Preparar Base de Datos en Vercel

1. **Ir a Vercel Dashboard**
   - https://vercel.com/dashboard
   - Click en "Storage"
   - Click en "Create Database"
   - Seleccionar "Postgres"

2. **Configurar Database**
   - Nombre: `gallo-trader-db`
   - Region: `Washington, D.C. (iad1)` (misma región que el proyecto)
   - Click en "Create"

3. **Obtener URLs de Conexión**
   - En la pestaña ".env.local"
   - Copiar `POSTGRES_PRISMA_URL` → Esta será tu `DATABASE_URL`
   - Copiar `POSTGRES_URL_NON_POOLING` → Esta será tu `DIRECT_URL`

### 2️⃣ Configurar Variables de Entorno

En Vercel Dashboard → Tu Proyecto → Settings → Environment Variables:

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth (generar secret: openssl rand -base64 32)
NEXTAUTH_SECRET=tu_secret_generado_aqui
NEXTAUTH_URL=https://tu-dominio.vercel.app

# Stripe (obtener de https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... (obtener después de crear webhook)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Discord
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/YFrN3mDk

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=5217771035232

# Email (opcional - Resend)
RESEND_API_KEY=re_... (si quieres activar emails)
FROM_EMAIL=bootcamp@gallotrader.com
```

**⚠️ IMPORTANTE:** Marcar todas las variables como disponibles para:
- ✅ Production
- ✅ Preview
- ✅ Development

### 3️⃣ Deploy desde GitHub

1. **Push código a GitHub**
   ```bash
   cd /Users/ferdegante35/Documents/Proyectos/gallo_trader/app
   git add .
   git commit -m "Production ready: Bootcamp con WhatsApp y deployment config"
   git push origin main
   ```

2. **Conectar en Vercel**
   - Ir a https://vercel.com/new
   - Click en "Import Git Repository"
   - Seleccionar `FerDeGante/gallo-trader`
   - Click en "Import"

3. **Configurar Proyecto**
   - Framework Preset: `Next.js` (auto-detectado)
   - Root Directory: `app`
   - Build Command: `prisma generate && next build`
   - Output Directory: `.next` (default)
   - Install Command: `npm install`

4. **Deploy**
   - Click en "Deploy"
   - Esperar 2-3 minutos

### 4️⃣ Ejecutar Migraciones de Base de Datos

Una vez deployed:

```bash
# Opción A: Desde tu máquina local
export DATABASE_URL="postgresql://... (copiar de Vercel)"
npx prisma migrate deploy
npx prisma db seed

# Opción B: Desde Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy --schema=./prisma/schema.prisma
```

### 5️⃣ Configurar Stripe Webhook

1. **Ir a Stripe Dashboard**
   - https://dashboard.stripe.com/webhooks
   - Click en "Add endpoint"

2. **Configurar Endpoint**
   - Endpoint URL: `https://tu-dominio.vercel.app/api/v1/webhooks/stripe`
   - Description: `Gallo Trader Bootcamp Webhook`
   - Version: `Latest API version`

3. **Seleccionar Eventos**
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`

4. **Obtener Webhook Secret**
   - Copiar el `Signing secret` (empieza con `whsec_...`)
   - Agregar a Vercel como `STRIPE_WEBHOOK_SECRET`

5. **Re-deploy para aplicar cambio**
   ```bash
   git commit --allow-empty -m "Update webhook secret"
   git push origin main
   ```

### 6️⃣ Verificación Post-Deployment

#### Test del Sitio
- [ ] Landing page carga correctamente
- [ ] Video de YouTube se reproduce
- [ ] Navegación a secciones funciona
- [ ] Botón de WhatsApp aparece y abre chat
- [ ] Footer muestra logo del gallo

#### Test de Checkout
- [ ] Click en "Asegurar mi Cupo - $1,000" abre Stripe
- [ ] Usar tarjeta de prueba: `4242 4242 4242 4242`
- [ ] Completar pago redirige a `/bootcamp/success`
- [ ] Discord link se muestra correctamente

#### Test de Webhook
- [ ] En Stripe Dashboard → Webhooks → Ver eventos
- [ ] Confirmar que `checkout.session.completed` llegó
- [ ] Status code debe ser `200`

#### Test de Email (si activaste Resend)
- [ ] Verificar inbox del email de prueba
- [ ] Confirmar que llegó email de bienvenida
- [ ] Discord link funciona en el email

### 7️⃣ Configurar Dominio Personalizado (Opcional)

1. **Agregar Dominio en Vercel**
   - Settings → Domains
   - Agregar: `gallotrader.com` o subdominio deseado

2. **Configurar DNS**
   ```
   Tipo: CNAME
   Name: @ o www
   Value: cname.vercel-dns.com
   ```

3. **Actualizar Variables**
   ```env
   NEXTAUTH_URL=https://gallotrader.com
   ```

4. **Re-deploy**

### 8️⃣ Monitoreo y Mantenimiento

#### Analytics (incluido gratis en Vercel)
- Dashboard → Analytics
- Ver: Visitors, Page Views, Conversions

#### Logs
- Dashboard → Deployments → Seleccionar deployment → Logs
- Revisar errores de runtime

#### Performance
- Dashboard → Speed Insights
- Core Web Vitals automáticos

## 🔥 Checklist Final de Producción

### Base de Datos
- [ ] Postgres database creada en Vercel
- [ ] Migraciones ejecutadas
- [ ] Seeds aplicados (planes de precios)
- [ ] Conexión funcional

### Variables de Entorno
- [ ] DATABASE_URL configurada
- [ ] DIRECT_URL configurada
- [ ] NEXTAUTH_SECRET generado (32+ caracteres)
- [ ] NEXTAUTH_URL apunta a dominio de producción
- [ ] STRIPE_SECRET_KEY (modo live)
- [ ] STRIPE_WEBHOOK_SECRET configurado
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (modo live)
- [ ] NEXT_PUBLIC_DISCORD_INVITE_URL verificado
- [ ] NEXT_PUBLIC_WHATSAPP_NUMBER correcto

### Stripe
- [ ] Webhook configurado apuntando a producción
- [ ] Eventos seleccionados correctamente
- [ ] Secret del webhook en variables de entorno
- [ ] Modo live activado (no test)
- [ ] Pago de $1,000 configurado

### Funcionalidades
- [ ] Landing page bootcamp funcional
- [ ] Video de YouTube cargando
- [ ] WhatsApp button visible y funcional
- [ ] Checkout de Stripe abriendo
- [ ] Página de success mostrando Discord
- [ ] Navegación entre secciones
- [ ] Logo del gallo en footer

### Seguridad
- [ ] .env NO subido a Git (.gitignore)
- [ ] Secrets en Vercel Environment Variables
- [ ] Webhook signature verificada
- [ ] NEXTAUTH_SECRET fuerte
- [ ] CORS headers configurados

### Performance
- [ ] Build exitoso sin warnings
- [ ] Imágenes optimizadas
- [ ] Core Web Vitals buenos
- [ ] Mobile responsive
- [ ] Lighthouse score > 90

## 🆘 Troubleshooting

### Error: "Database connection failed"
```bash
# Verificar URLs
echo $DATABASE_URL
echo $DIRECT_URL

# Re-generar Prisma client
npx prisma generate
npx prisma migrate deploy
```

### Error: "Webhook signature mismatch"
- Verificar que `STRIPE_WEBHOOK_SECRET` en Vercel coincide con Stripe Dashboard
- Asegurar que el endpoint URL es exacto (con `/api/v1/webhooks/stripe`)
- Revisar logs en Stripe Dashboard

### Error: "Build failed"
```bash
# Local test
npm run build

# Limpiar caché
rm -rf .next node_modules
npm install
npm run build
```

### WhatsApp no abre
- Verificar que el número está en formato internacional: `5217771035232`
- Probar link directo: `https://wa.me/5217771035232`

### Video no carga
- Verificar URL: `https://www.youtube.com/watch?v=vIgw3dzQyOw`
- Revisar console del navegador para errores de CORS
- Verificar iframe permissions en browser

## 📱 Comandos Útiles Post-Deployment

```bash
# Ver logs en tiempo real
vercel logs --follow

# Ver deployment actual
vercel inspect

# Rollback a deployment anterior
vercel rollback

# Ejecutar comando en producción
vercel env pull .env.production

# Ver analytics
vercel analytics

# Ver dominios
vercel domains ls
```

## 🎯 URLs Importantes

- **Sitio en producción:** https://tu-proyecto.vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Discord Invite:** https://discord.gg/YFrN3mDk
- **WhatsApp:** https://wa.me/5217771035232

## 🚀 Siguiente Paso

**¡Ya puedes hacer el deployment!**

```bash
# 1. Commit final
git add .
git commit -m "🚀 Production ready: Master Funding Bootcamp"
git push origin main

# 2. Ir a Vercel y hacer deploy
# https://vercel.com/new

# 3. Configurar Stripe webhook
# 4. Hacer primer test de pago
# 5. ¡Lanzar el bootcamp! 🎉
```

---

**Tiempo estimado de deployment:** 15-20 minutos
**Costo mensual estimado:** $0 (tier gratuito de Vercel hasta cierto tráfico)

¡Éxito con el lanzamiento! 🐓💰
