#!/bin/bash
set -e

echo "🔧 Configurando variables de entorno en Railway..."
echo ""

# Verificar Railway CLI
if ! command -v railway &> /dev/null; then
  echo "❌ Railway CLI no instalado"
  exit 1
fi

# Verificar autenticación
if ! railway whoami &> /dev/null; then
  echo "❌ No autenticado en Railway"
  exit 1
fi

# Verificar proyecto vinculado
if ! railway status &> /dev/null; then
  echo "❌ No hay proyecto vinculado"
  echo "Ejecuta: railway init o railway link"
  exit 1
fi

echo "✅ Configurando variables críticas..."
echo ""

# AUTH_SECRET
echo "Generando AUTH_SECRET..."
AUTH_SECRET=$(openssl rand -base64 32)
railway variables --set "AUTH_SECRET=$AUTH_SECRET"
echo "✅ AUTH_SECRET configurado"

# AUTH_TRUST_HOST
railway variables --set "AUTH_TRUST_HOST=true"
echo "✅ AUTH_TRUST_HOST configurado"

# URLs (usando variable de Railway)
railway variables --set 'NEXTAUTH_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}'
railway variables --set 'NEXT_PUBLIC_APP_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}'
echo "✅ URLs configuradas"

echo ""
echo "⚠️  VARIABLES QUE DEBES CONFIGURAR MANUALMENTE:"
echo ""
echo "1. STRIPE (requerido para pagos):"
echo "   railway variables --set \"STRIPE_SECRET_KEY=sk_...\""
echo "   railway variables --set \"NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...\""
echo "   railway variables --set \"STRIPE_WEBHOOK_SECRET=whsec_...\""
echo ""
echo "2. DATABASE (ya configurada automáticamente por Railway Postgres)"
echo ""
echo "3. UPSTASH REDIS (opcional - rate limiting):"
echo "   railway variables --set \"UPSTASH_REDIS_REST_URL=https://...\""
echo "   railway variables --set \"UPSTASH_REDIS_REST_TOKEN=...\""
echo ""
echo "4. SENTRY (opcional - monitoreo):"
echo "   railway variables --set \"SENTRY_DSN=https://...\""
echo ""
echo "📋 Ver todas las variables:"
echo "   railway variables"
echo ""
echo "✅ Configuración básica completada!"
