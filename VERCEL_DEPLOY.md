# Vercel Deployment Guide

## Variables de Entorno en Vercel

Configura estas variables en: **Settings > Environment Variables**

### Frontend Variables
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

### API Connection (apuntará a Railway)
```
API_URL=https://tu-app.railway.app
NEXT_PUBLIC_API_URL=https://tu-app.railway.app
```

### NextAuth
```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=<tu_secret_generado>
AUTH_SECRET=<mismo_secret>
```

### Stripe Public Key (solo la pública en Vercel)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## Configuración del Proyecto

1. **Root Directory**: `app`
2. **Framework Preset**: Next.js
3. **Build Command**: `npm run build` (automático)
4. **Output Directory**: `.next` (automático)

## Notas Importantes

- ✅ Solo el frontend se despliega en Vercel
- ✅ Las rutas `/api/*` se redirigen automáticamente a Railway
- ✅ No necesitas configurar variables de base de datos aquí
- ✅ Stripe Secret Key y database están solo en Railway

## Después del Deploy

1. Copia la URL de Vercel
2. Actualiza `NEXTAUTH_URL` con esa URL
3. Actualiza `NEXT_PUBLIC_APP_URL` con esa URL
4. Redeploy para aplicar cambios
