#!/bin/bash

# Script para configurar variables de entorno en Vercel

echo "🔧 Configurando variables de entorno en Vercel..."

# Variables públicas del bootcamp
vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL production <<< "https://discord.gg/YFrN3mDk"
vercel env add NEXT_PUBLIC_DISCORD_INVITE_URL preview <<< "https://discord.gg/YFrN3mDk"

vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production <<< "5217771035232"
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER preview <<< "5217771035232"

# Stripe Webhook Secret (agregar después de configurar en Stripe)
echo ""
echo "⚠️  IMPORTANTE: Configura también en el dashboard de Vercel:"
echo "   - STRIPE_WEBHOOK_SECRET (obtener de stripe.com/webhooks)"
echo "   - Verifica que DATABASE_URL apunte a producción"
echo "   - Verifica que NEXTAUTH_URL sea tu dominio de producción"
echo ""
echo "✅ Variables configuradas!"
