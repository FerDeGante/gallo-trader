# ✅ Checklist de Deployment - Gallo Trader

## Pre-Deploy ✅ COMPLETADO

- [x] Build sin errores (`npm run build`)
- [x] Sin errores de TypeScript
- [x] Sin errores de ESLint
- [x] Código commiteado y pusheado a GitHub
- [x] Archivo `.env.example` actualizado
- [x] Documentación de deployment creada
- [x] `vercel.json` configurado

---

## Vercel Deployment 🚀

### 1. Conectar Proyecto
- [ ] Ve a [vercel.com](https://vercel.com)
- [ ] Click en "Add New Project"
- [ ] Importa el repositorio: `FerDeGante/gallo-trader`
- [ ] **IMPORTANTE**: Configura **Root Directory** como `app`

### 2. Variables de Entorno

Copia estas variables desde tu `.env.local`:

#### Database (Supabase)
```
DATABASE_URL=<tu_postgresql_url>
DIRECT_URL=<tu_postgresql_direct_url>
```

#### NextAuth
```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=<genera_con: openssl rand -base64 32>
```

#### Stripe
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=<configurar_después_del_deploy>
```

#### Upstash Redis
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

#### Sentry (Opcional)
```
SENTRY_AUTH_TOKEN=...
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

#### App Config
```
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
NODE_ENV=production
```

### 3. Configurar Stripe Webhook

Después del primer deploy:

1. Ve a [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Endpoint URL: `https://tu-dominio.vercel.app/api/v1/webhooks/stripe`
4. Selecciona eventos:
   - ✅ `checkout.session.completed`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Copia el **Signing secret** (empieza con `whsec_`)
6. Agrégalo como variable de entorno `STRIPE_WEBHOOK_SECRET` en Vercel
7. Re-deploy desde Vercel dashboard

### 4. Verificar Deploy

- [ ] Build exitoso en Vercel
- [ ] Sitio cargando correctamente
- [ ] Landing page visible
- [ ] Login funcional
- [ ] Checkout funcional
- [ ] Webhook de Stripe configurado
- [ ] Pago de prueba exitoso

---

## Railway Deployment (Alternativa/Backup) 🚂

### 1. Conectar Proyecto
- [ ] Ve a [railway.app](https://railway.app)
- [ ] Click "New Project" > "Deploy from GitHub repo"
- [ ] Selecciona: `FerDeGante/gallo-trader`
- [ ] **Root Directory**: `app`

### 2. Configurar Variables de Entorno

Railway puede usar las mismas variables que Vercel (ver arriba).

**Importante**: Railway puede proveer PostgreSQL automáticamente:
- [ ] Click "Add Service" > "Database" > "PostgreSQL"
- [ ] Railway generará `DATABASE_URL` automáticamente
- [ ] Copia la URL y úsala también como `DIRECT_URL`

### 3. Build Settings

Railway detecta Next.js automáticamente, pero verifica:

- **Build Command**: `npm run db:generate && npm run build`
- **Start Command**: `npm start`

### 4. Migraciones

Después del primer deploy, ejecuta:

```bash
railway run npm run db:migrate
railway run npm run db:seed  # Opcional - datos de prueba
```

---

## Post-Deploy ✅

### Verificaciones Finales

- [ ] Sitio en producción funcionando
- [ ] SSL/HTTPS activo
- [ ] Landing page carga correctamente
- [ ] Login funcional
- [ ] Checkout completo funciona
- [ ] Webhooks de Stripe configurados
- [ ] Pagos de prueba exitosos
- [ ] Redirección post-pago funciona
- [ ] Auto-creación de usuario funciona
- [ ] Auto-login funciona
- [ ] Acceso al aula después de pago

### Monitoreo

- [ ] Sentry configurado para errores
- [ ] Logs de Vercel/Railway revisados
- [ ] Stripe Dashboard mostrando eventos

### Seguridad

- [ ] Claves de producción (no test) en prod
- [ ] `NEXTAUTH_SECRET` único y seguro
- [ ] Variables de entorno nunca en código
- [ ] `.env.local` en `.gitignore`

---

## Contactos de Soporte

- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/help
- **Stripe**: https://support.stripe.com
- **Supabase**: https://supabase.com/support

---

## Comandos Útiles

```bash
# Verificar build local
npm run build

# Generar Prisma client
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Seed de datos
npm run db:seed

# Pull variables de Vercel
vercel env pull .env.local

# Ver logs de Railway
railway logs
```

---

## 🎉 Deploy Exitoso

Si completaste todos los checkboxes, tu aplicación está desplegada y lista para recibir usuarios!

**URL de Producción**: `https://_________.vercel.app`

**Próximos pasos**:
1. Configura tu dominio personalizado
2. Agrega analytics (Google Analytics, Meta Pixel)
3. Configura emails transaccionales
4. Monitorea errores con Sentry
