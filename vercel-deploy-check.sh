#!/bin/bash

# Script de verificación pre-deployment para Vercel
# Ejecuta este script antes de hacer push a producción

echo "🔍 Iniciando verificación pre-deployment..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# 1. Verificar que estamos en el directorio correcto
echo "📂 Verificando directorio..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encuentra package.json. Ejecuta desde /app${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Directorio correcto${NC}"
echo ""

# 2. Verificar archivos esenciales
echo "📄 Verificando archivos esenciales..."
FILES=(
    "vercel.json"
    ".vercelignore"
    ".env.example"
    "prisma/schema.prisma"
    "public/gallo_simbolo.png"
    "src/components/ui/WhatsAppButton.tsx"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ Falta: $file${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# 3. Verificar que .env no está en Git
echo "🔒 Verificando seguridad..."
if [ -f ".env" ]; then
    if git ls-files --error-unmatch .env 2>/dev/null; then
        echo -e "${RED}❌ PELIGRO: .env está en Git!${NC}"
        echo "   Ejecuta: git rm --cached .env"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}✅ .env no está en Git${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No existe archivo .env (normal en CI/CD)${NC}"
fi
echo ""

# 4. Verificar dependencias
echo "📦 Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe${NC}"
else
    echo -e "${YELLOW}⚠️  Instalando dependencias...${NC}"
    npm install
fi
echo ""

# 5. Build del proyecto
echo "🏗️  Compilando proyecto..."
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✅ Build exitoso${NC}"
else
    echo -e "${RED}❌ Build falló. Ver /tmp/build.log${NC}"
    tail -20 /tmp/build.log
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 6. Verificar TypeScript
echo "📘 Verificando TypeScript..."
if npx tsc --noEmit > /tmp/tsc.log 2>&1; then
    echo -e "${GREEN}✅ Sin errores de TypeScript${NC}"
else
    echo -e "${RED}❌ Errores de TypeScript encontrados${NC}"
    tail -20 /tmp/tsc.log
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 7. Verificar Prisma
echo "🗄️  Verificando Prisma..."
if npx prisma validate > /tmp/prisma.log 2>&1; then
    echo -e "${GREEN}✅ Schema de Prisma válido${NC}"
else
    echo -e "${RED}❌ Schema de Prisma inválido${NC}"
    cat /tmp/prisma.log
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 8. Verificar variables de entorno necesarias
echo "🔑 Verificando variables de entorno..."
REQUIRED_VARS=(
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
)

if [ -f ".env" ]; then
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env; then
            echo -e "${GREEN}✅ $var${NC}"
        else
            echo -e "${YELLOW}⚠️  Falta en .env local: $var${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  No hay .env local. Asegurar que están en Vercel${NC}"
fi
echo ""

# 9. Verificar componentes clave
echo "🎨 Verificando componentes..."
COMPONENTS=(
    "src/components/bootcamp/BootcampHeroSection.tsx"
    "src/components/bootcamp/BootcampVideoSection.tsx"
    "src/components/bootcamp/BootcampPricingSection.tsx"
    "src/components/ui/WhatsAppButton.tsx"
    "src/components/layout/Footer.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        echo -e "${GREEN}✅ $(basename $component)${NC}"
    else
        echo -e "${RED}❌ Falta: $component${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# 10. Verificar rutas de API
echo "🔌 Verificando APIs..."
APIS=(
    "src/app/api/v1/checkout/bootcamp/route.ts"
    "src/app/api/v1/webhooks/stripe/route.ts"
    "src/app/api/health/route.ts"
)

for api in "${APIS[@]}"; do
    if [ -f "$api" ]; then
        echo -e "${GREEN}✅ $(basename $(dirname $api))/$(basename $api)${NC}"
    else
        echo -e "${RED}❌ Falta: $api${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# 11. Verificar tamaño del bundle
echo "📊 Analizando tamaño del bundle..."
if [ -d ".next" ]; then
    BUNDLE_SIZE=$(du -sh .next | cut -f1)
    echo -e "${GREEN}✅ Tamaño del bundle: $BUNDLE_SIZE${NC}"
    
    # Advertir si es muy grande
    BUNDLE_MB=$(du -sm .next | cut -f1)
    if [ $BUNDLE_MB -gt 100 ]; then
        echo -e "${YELLOW}⚠️  Bundle grande (>100MB). Considera optimizar.${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No se encontró .next (ejecuta build primero)${NC}"
fi
echo ""

# 12. Git status
echo "📝 Estado de Git..."
if git diff --quiet && git diff --cached --quiet; then
    echo -e "${GREEN}✅ No hay cambios sin commitear${NC}"
else
    echo -e "${YELLOW}⚠️  Hay cambios sin commitear:${NC}"
    git status --short
fi
echo ""

# Resumen final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ ¡TODO LISTO PARA DEPLOYMENT! 🚀${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. git add ."
    echo "2. git commit -m 'Production ready'"
    echo "3. git push origin main"
    echo "4. Deploy en Vercel"
    echo "5. Configurar Stripe webhook"
else
    echo -e "${RED}❌ Se encontraron $ERRORS errores${NC}"
    echo "Por favor corrige los errores antes de deployar"
    exit 1
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
