#!/bin/bash
set -e

echo "🚀 Iniciando deployment en Railway..."

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json no encontrado"
  exit 1
fi

# Verificar que Railway CLI está instalado
if ! command -v railway &> /dev/null; then
  echo "❌ Railway CLI no está instalado"
  echo "Instala con: npm install -g @railway/cli"
  exit 1
fi

# Verificar autenticación
if ! railway whoami &> /dev/null; then
  echo "❌ No estás autenticado en Railway"
  echo "Ejecuta: railway login"
  exit 1
fi

# Verificar que el proyecto está vinculado
if ! railway status &> /dev/null; then
  echo "⚠️  No hay proyecto vinculado"
  echo "Opciones:"
  echo "  1. Crear nuevo proyecto: railway init"
  echo "  2. Vincular existente: railway link"
  exit 1
fi

echo "✅ Verificaciones pasadas"
echo ""

# Mostrar variables configuradas
echo "📋 Variables de entorno configuradas:"
railway variables | grep -E "DATABASE_URL|NEXTAUTH_URL|STRIPE_SECRET_KEY|AUTH_SECRET" || echo "⚠️  Algunas variables críticas no están configuradas"
echo ""

# Preguntar si continuar
read -p "¿Continuar con el deployment? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Deployment cancelado"
  exit 1
fi

# Deploy
echo ""
echo "🚀 Desplegando en Railway..."
railway up --detach

echo ""
echo "✅ Deployment iniciado!"
echo ""
echo "📊 Para ver el progreso:"
echo "  railway logs --follow"
echo ""
echo "🌐 Para abrir el dashboard:"
echo "  railway open"
