#!/bin/bash

echo "🚀 Gallo Trader Bootcamp - Deploy Check"
echo "========================================"

# Verificar que el logo existe
echo "📸 Verificando assets..."
if [ -f "public/gallo_simbolo.png" ]; then
    echo "✅ Logo encontrado"
else
    echo "❌ Logo no encontrado: public/gallo_simbolo.png"
    exit 1
fi

# Verificar que no hay errores
echo ""
echo "📝 Verificando errores de TypeScript..."
npm run lint

# Generar cliente de Prisma
echo ""
echo "🔧 Generando cliente de Prisma..."
npm run db:generate

# Build
echo ""
echo "🏗️  Compilando aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build exitoso!"
    echo ""
    echo "📋 Próximos pasos para Vercel:"
    echo "1. Configura las variables de entorno en Vercel (ver VERCEL_DEPLOYMENT.md)"
    echo "2. En Root Directory, establece: app"
    echo "3. Deploy automático desde Git"
    echo ""
    echo "📋 Próximos pasos para Railway:"
    echo "1. Conecta tu repo de GitHub"
    echo "2. Configura las variables de entorno (ver RAILWAY_DEPLOYMENT.md)"
    echo "3. Railway detectará Next.js automáticamente"
    echo ""
else
    echo "❌ Build falló. Por favor corrige los errores antes de desplegar."
    exit 1
fi
