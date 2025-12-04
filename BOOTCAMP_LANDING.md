# Master Funding Bootcamp - Landing Page

## 📋 Resumen

Landing page profesional para el **Master Funding Bootcamp** de Gallo Trader, diseñada para convertir visitantes en estudiantes del bootcamp intensivo de 7 días.

## 🚀 Características

### Diseño
- **Mismo diseño visual de la landing principal**: Mantiene la identidad visual y UX de alta calidad
- **Logo actualizado**: Utiliza el símbolo de gallo (`/public/gallo_simbolo.png`) en lugar del emoji
- **Diseño responsive**: Optimizado para todos los dispositivos
- **Animaciones fluidas**: Transiciones y efectos visuales profesionales

### Secciones de la Landing

1. **Hero Section** (`BootcampHeroSection`)
   - Badge de urgencia con cupos limitados
   - Título impactante con gradiente
   - Precio destacado ($1,000 USD)
   - CTA directo al checkout
   - Stats del bootcamp (7 días, $100K cuenta, estrategia probada)
   - Banner de urgencia (15 cupos)

2. **Value Section** (`BootcampValueSection`)
   - 6 beneficios principales del bootcamp
   - Cards con iconos y descripciones
   - Hover effects profesionales

3. **Content Section** (`BootcampContentSection`)
   - Timeline de 7 días
   - Contenido detallado de cada día
   - Diseño tipo roadmap vertical

4. **Bonus Section** (`BootcampBonusSection`)
   - 4 bonos valorados en $1,388 total
   - Calculadora de valor total
   - Badge de "GRATIS" en cada bono

5. **Pricing Section** (`BootcampPricingSection`)
   - Precio destacado con call-to-action
   - Lista completa de beneficios incluidos
   - Garantía de seguridad (Stripe)
   - FAQ con 4 preguntas comunes
   - Urgency banner

## 💳 Checkout de Stripe

### Endpoint de API
**`POST /api/v1/checkout/bootcamp`**

```typescript
// Request
{
  "successUrl": "https://yoursite.com/bootcamp/success",
  "cancelUrl": "https://yoursite.com/bootcamp"
}

// Response
{
  "data": {
    "url": "https://checkout.stripe.com/..."
  }
}
```

### Características del Checkout
- Precio fijo: **$1,000 USD**
- Modo de pago: Tarjeta de crédito/débito
- Recolección de dirección de facturación
- Metadata incluye: `product_type: 'bootcamp'`

## 📧 Sistema de Email de Bienvenida

### Webhook de Stripe
Cuando un pago se completa exitosamente, el webhook de Stripe:

1. Detecta el evento `checkout.session.completed`
2. Verifica que `metadata.product_type === 'bootcamp'`
3. Envía email de bienvenida automáticamente

### Template de Email
**Ubicación**: `/src/server/lib/email-templates.ts`

**Funciones**:
- `getBootcampWelcomeEmailTemplate()` - HTML email
- `getBootcampWelcomeEmailText()` - Texto plano (fallback)

**Contenido del Email**:
- ✅ Confirmación de pago
- 🎮 Enlace a Discord VIP: https://discord.gg/YFrN3mDk
- 📋 3 próximos pasos
- 📦 Lista de lo que incluye
- 🎨 Diseño profesional con colores de la marca

### Integración con Servicio de Email
Para activar el envío real de emails, descomentar y configurar en `/api/v1/webhooks/stripe/route.ts`:

```typescript
// Ejemplo con Resend
const { Resend } = await import('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Gallo Trader <bootcamp@gallotrader.com>',
  to: email,
  subject: '¡Bienvenido al Master Funding Bootcamp! 🎉',
  html: htmlContent,
  text: textContent,
});
```

## 🎯 Página de Éxito

**Ruta**: `/bootcamp/success`

Después de completar el pago, el usuario es redirigido a una página de confirmación que incluye:

- ✓ Mensaje de éxito visual
- 📧 Instrucciones para revisar email
- 🎮 Botón directo a Discord
- 📋 Próximos pasos numerados
- 💬 Información de soporte

## 🗂 Estructura de Archivos

```
src/
├── app/
│   ├── (bootcamp)/
│   │   ├── layout.tsx                    # Layout del bootcamp
│   │   └── bootcamp/
│   │       ├── page.tsx                  # Página principal
│   │       └── success/
│   │           ├── page.tsx              # Página de éxito
│   │           └── success.module.css
│   └── api/
│       └── v1/
│           ├── checkout/
│           │   └── bootcamp/
│           │       └── route.ts          # Endpoint de checkout
│           └── webhooks/
│               └── stripe/
│                   └── route.ts          # Webhook actualizado
├── components/
│   ├── bootcamp/
│   │   ├── BootcampHeroSection.tsx
│   │   ├── BootcampHeroSection.module.css
│   │   ├── BootcampValueSection.tsx
│   │   ├── BootcampValueSection.module.css
│   │   ├── BootcampContentSection.tsx
│   │   ├── BootcampContentSection.module.css
│   │   ├── BootcampBonusSection.tsx
│   │   ├── BootcampBonusSection.module.css
│   │   ├── BootcampPricingSection.tsx
│   │   └── BootcampPricingSection.module.css
│   └── layout/
│       └── NavBar.tsx                    # Actualizado con logo
└── server/
    └── lib/
        └── email-templates.ts            # Templates de email

```

## 🔧 Variables de Entorno

Asegúrate de tener configuradas:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (opcional, para activar envíos)
RESEND_API_KEY=re_...
```

## 🚦 Cómo Usar

### 1. Acceder a la Landing
```
https://yoursite.com/bootcamp
```

### 2. Proceso de Compra
1. Usuario hace clic en "Inscribirme Ahora"
2. Redirige a Stripe Checkout
3. Usuario completa el pago
4. Redirige a `/bootcamp/success`
5. Recibe email automático con acceso a Discord

### 3. Testing Local
```bash
# Terminal 1: Iniciar servidor de desarrollo
npm run dev

# Terminal 2: Stripe CLI para webhooks locales
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe

# Usar la clave del webhook que te da Stripe CLI en .env.local
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📊 Métricas y Optimizaciones

### SEO
- Metadata optimizada para bootcamp
- Open Graph tags
- Structured data para eventos

### Performance
- Lazy loading de imágenes
- CSS Modules para estilos aislados
- Componentes optimizados de Next.js

### Conversión
- CTAs claros y directos
- Urgencia con cupos limitados
- Valor destacado ($1,388 en bonos)
- Garantías de seguridad
- FAQ para objeciones

## 🎨 Personalización

### Cambiar Precio
Editar en `BootcampPricingSection.tsx` y `/api/v1/checkout/bootcamp/route.ts`:
```typescript
unit_amount: 100000, // $1,000.00 en centavos
```

### Cambiar Enlace de Discord
Actualizar en:
- `BootcampHeroSection.tsx`
- `success/page.tsx`
- `email-templates.ts`

### Modificar Bonos
Editar array `bonuses` en `BootcampBonusSection.tsx`

## 📝 Notas

- El sistema de email está preparado pero requiere configurar un servicio (Resend, SendGrid, etc.)
- El webhook de Stripe maneja tanto pagos del bootcamp como del programa principal
- Todos los estilos mantienen coherencia con el diseño de la landing principal
- El logo del navbar ahora usa la imagen del símbolo de gallo en toda la aplicación

## 🔗 Enlaces Importantes

- Landing del Bootcamp: `/bootcamp`
- Página de Éxito: `/bootcamp/success`
- Discord VIP: https://discord.gg/YFrN3mDk
- Checkout API: `/api/v1/checkout/bootcamp`
- Webhook Stripe: `/api/v1/webhooks/stripe`

---

**Creado el**: 3 de diciembre de 2025
**Versión**: 1.0.0
**Listo para producción**: ✅
