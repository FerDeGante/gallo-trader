#!/bin/bash

# 🚀 Script de Deployment Automatizado para Vercel
# Ejecuta este script para deployar el Master Funding Bootcamp

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🐓 Master Funding Bootcamp - Vercel Deploy"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Verificar directorio
echo -e "${BLUE}📂 Verificando directorio...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Ejecuta desde /app${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Directorio correcto${NC}"
echo ""

# 2. Verificar Git
echo -e "${BLUE}📝 Verificando Git...${NC}"
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ No es un repositorio Git${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git inicializado${NC}"
echo ""

# 3. Verificar cambios pendientes
echo -e "${BLUE}🔍 Verificando cambios pendientes...${NC}"
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${GREEN}✅ No hay cambios sin commitear${NC}"
else
    echo -e "${YELLOW}⚠️  Hay cambios sin commitear${NC}"
    git status --short
    echo ""
    read -p "¿Quieres commitear estos cambios? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        git add .
        read -p "Mensaje de commit: " commit_msg
        git commit -m "$commit_msg"
        echo -e "${GREEN}✅ Cambios commiteados${NC}"
    else
        echo -e "${YELLOW}⚠️  Continuando sin commitear...${NC}"
    fi
fi
echo ""

# 4. Build del proyecto
echo -e "${BLUE}🏗️  Compilando proyecto...${NC}"
if npm run build > /tmp/vercel-build.log 2>&1; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Build falló${NC}"
    tail -30 /tmp/vercel-build.log
    exit 1
fi
echo ""

# 5. Verificar archivos críticos
echo -e "${BLUE}📄 Verificando archivos críticos...${NC}"
CRITICAL_FILES=(
    "vercel.json"
    ".vercelignore"
    "public/gallo_simbolo.png"
    "src/components/ui/WhatsAppButton.tsx"
    "prisma/schema.prisma"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ Falta: $file${NC}"
        exit 1
    fi
done
echo ""

# 6. Verificar Vercel CLI
echo -e "${BLUE}🔧 Verificando Vercel CLI...${NC}"
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI no instalado${NC}"
    read -p "¿Quieres instalarlo? (s/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        npm i -g vercel
        echo -e "${GREEN}✅ Vercel CLI instalado${NC}"
    else
        echo -e "${YELLOW}⚠️  Deploy manual requerido en vercel.com${NC}"
        exit 0
    fi
else
    echo -e "${GREEN}✅ Vercel CLI disponible${NC}"
fi
echo ""

# 7. Push a Git
echo -e "${BLUE}⬆️  Pusheando a GitHub...${NC}"
CURRENT_BRANCH=$(git branch --show-current)
echo "Branch actual: $CURRENT_BRANCH"

read -p "¿Hacer push a GitHub? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    git push origin $CURRENT_BRANCH
    echo -e "${GREEN}✅ Push exitoso${NC}"
else
    echo -e "${YELLOW}⚠️  Saltando push${NC}"
fi
echo ""

# 8. Deploy a Vercel
echo -e "${BLUE}🚀 Deploying a Vercel...${NC}"
read -p "¿Deploy a producción? (s/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Ss]$ ]]; then
    vercel --prod
    echo ""
    echo -e "${GREEN}✅ Deploy completado${NC}"
else
    echo -e "${YELLOW}⚠️  Deploy cancelado${NC}"
    echo "Puedes deployar manualmente en: https://vercel.com/dashboard"
    exit 0
fi
echo ""

# 9. Instrucciones post-deployment
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 ¡DEPLOYMENT EXITOSO!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}📋 PRÓXIMOS PASOS:${NC}"
echo ""
echo "1. 🗄️  Crear Base de Datos Postgres en Vercel:"
echo "   https://vercel.com/dashboard → Storage → Create Database"
echo ""
echo "2. 🔑 Configurar Variables de Entorno:"
echo "   https://vercel.com/dashboard → Settings → Environment Variables"
echo "   - DATABASE_URL (de Vercel Postgres)"
echo "   - DIRECT_URL (de Vercel Postgres)"
echo "   - NEXTAUTH_SECRET (openssl rand -base64 32)"
echo "   - NEXTAUTH_URL (tu dominio de producción)"
echo "   - STRIPE_SECRET_KEY (dashboard.stripe.com)"
echo "   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
echo "   - STRIPE_WEBHOOK_SECRET (configurar después)"
echo ""
echo "3. 🔄 Ejecutar Migraciones:"
echo "   vercel env pull .env.production"
echo "   npx prisma migrate deploy"
echo "   npx prisma db seed"
echo ""
echo "4. 🔔 Configurar Stripe Webhook:"
echo "   https://dashboard.stripe.com/webhooks"
echo "   Endpoint: https://TU-DOMINIO.vercel.app/api/v1/webhooks/stripe"
echo "   Eventos: checkout.session.completed"
echo ""
echo "5. ✅ Verificar Funcionalidad:"
echo "   - Landing page carga"
echo "   - Video de YouTube funciona"
echo "   - WhatsApp button (777-103-5232) abre chat"
echo "   - Checkout de Stripe ($1,000) funciona"
echo "   - Success page muestra Discord link"
echo ""
echo -e "${GREEN}🎯 ¡Bootcamp listo para lanzar!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
