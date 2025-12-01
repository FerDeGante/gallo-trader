# Gallo Trader – Plataforma Premium de Trading

Este repositorio contiene el **backend** de la plataforma Gallo Trader: una academia digital de trading seria y premium, enfocada en ayudar a principiantes, novatos y traders frustrados a construir **bases sólidas** y operar con **cabeza fría**, sin vender "estrategias mágicas".

> ⚠️ **Disclaimer**:  
> Gallo Trader ofrece **formación educativa**, no asesoría de inversión.  
> Operar en los mercados financieros implica riesgo de pérdida parcial o total del capital.

---

## 🎯 Características implementadas

✅ **A1-A6**: MVP Core
- Prisma 7 con PostgreSQL (Supabase)
- CRUD completo de programas con endpoints públicos y admin
- NextAuth v5 con JWT strategy
- Pagos con Stripe + webhooks
- Auto-enrollment al completar pago
- Portal de estudiantes con control de acceso por tokens

✅ **B1-B2**: Admin & Analytics
- Panel admin completo (users, enrollments, payments)
- Dashboard con métricas (revenue, conversión, progreso)
- Sistema de tracking de progreso por lección

✅ **B3**: Security
- Rate limiting (Upstash Redis / in-memory fallback)
- Error handling middleware
- Validaciones con Zod
- Signature verification (Stripe & Coinbase)

✅ **B4**: Crypto Payments
- Coinbase Commerce integration (checkout + webhook)
- Pagos alternativos en criptomonedas

---

## 🛠️ Stack técnico

- **Runtime**: Node.js 20+ (TypeScript)
- **Framework**: Next.js 16.0.5 con App Router
- **ORM**: Prisma 7.0.1 con @prisma/adapter-pg
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth v5 (beta)
- **Payments**: Stripe + Coinbase Commerce
- **Validation**: Zod
- **Security**: @upstash/ratelimit, bcryptjs
- **Deployment**: Vercel-ready

---

## 📦 Instalación y setup

### 1. Prerrequisitos

- Node.js 20 LTS o superior
- PostgreSQL (Supabase, Neon, Railway, etc.)
- Cuenta de Stripe (test mode)
- (Opcional) Cuenta de Coinbase Commerce
- (Opcional) Upstash Redis para rate limiting distribuido

### 2. Clonar e instalar dependencias

\`\`\`bash
git clone <repo>
cd frontend
npm install
\`\`\`

### 3. Variables de entorno

Crea archivo \`.env\` basado en \`.env.example\`:

\`\`\`bash
cp .env.example .env
\`\`\`

**Variables requeridas**:

\`\`\`env
# Database (Supabase pooler para app, direct URL para migrations)
DATABASE_URL="postgresql://user:pass@host:5432/db"
DIRECT_URL="postgresql://user:pass@host:6543/db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="" # openssl rand -base64 32

# Stripe (test mode)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Desde Stripe Dashboard > Developers > Webhooks
\`\`\`

**Variables opcionales**:

\`\`\`env
# Crypto payments (Coinbase Commerce)
COINBASE_COMMERCE_API_KEY="..."
COINBASE_COMMERCE_WEBHOOK_SECRET="..."

# Rate limiting distribuido (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
\`\`\`

### 4. Generar Prisma Client y migrar base de datos

\`\`\`bash
# Generar client
npx prisma generate

# Ejecutar migraciones
npx prisma migrate deploy

# Seed inicial (1 programa, 5 módulos, 6 lecciones)
npm run db:seed
\`\`\`

### 5. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

Servidor en \`http://localhost:3000\`

---

## 📚 Modelo de datos

**12 tablas principales**:

- \`User\` – Usuarios (alumnos y admins). Roles: USER, ADMIN
- \`Program\` – Programas premium con slug, precio, descripción
- \`Module\` – Agrupación lógica de lecciones dentro de un programa
- \`Lesson\` – Videos individuales (YouTube ID + metadata)
- \`Enrollment\` – Control de acceso: quién tiene acceso a qué programa
- \`Payment\` – Registro de pagos (Stripe, Coinbase Commerce)
- \`LessonAccessToken\` – Tokens efímeros JWT (5 min) para reproducir lecciones
- \`LessonProgress\` – Tracking de progreso: completitud, tiempo visto
- \`AdminAuditLog\` – Logs de acciones administrativas
- \`Account\`, \`Session\`, \`VerificationToken\` – Soporte NextAuth

**Enums**:
- \`Role\`: USER, ADMIN
- \`EnrollmentStatus\`: PENDING, ACTIVE, SUSPENDED, EXPIRED, REVOKED
- \`EnrollmentSource\`: PAYMENT, ADMIN_GRANT, TRIAL, MIGRATION
- \`PaymentProvider\`: STRIPE, COINBASE_COMMERCE
- \`PaymentStatus\`: PENDING, SUCCEEDED, FAILED, REQUIRES_ACTION, REFUNDED, CANCELLED
- \`LessonType\`: VIDEO, ARTICLE, QUIZ, DOWNLOAD
- \`AdminAction\`: GRANT_ACCESS, REVOKE_ACCESS, SUSPEND_ACCESS, RESTORE_ACCESS, etc.

Ver esquema completo en \`prisma/schema.prisma\`

---

## 🚀 API Endpoints (23 rutas)

### Públicos (sin auth)

#### Programas
\`\`\`http
GET /api/v1/programs
GET /api/v1/programs/:slug
\`\`\`

### Autenticados (require auth)

#### Usuario
\`\`\`http
GET /api/v1/me
\`\`\`

#### Checkout y pagos
\`\`\`http
POST /api/v1/checkout/stripe
POST /api/v1/checkout/crypto
GET /api/v1/payments/me
\`\`\`

#### Contenido (estudiantes)
\`\`\`http
GET /api/v1/aula/outline
GET /api/v1/programs/:programId/outline
GET /api/v1/lessons/:lessonId
POST /api/v1/lessons/:lessonId/access-token
GET /api/v1/lessons/:lessonId/play?token={JWT}
\`\`\`

#### Progreso
\`\`\`http
POST /api/v1/lessons/:lessonId/progress
GET /api/v1/lessons/progress/me
GET /api/v1/programs/:programId/progress
\`\`\`

### Admin (require role ADMIN)

#### Usuarios
\`\`\`http
GET /api/v1/admin/users
GET /api/v1/admin/users/:userId
PATCH /api/v1/admin/users/:userId
DELETE /api/v1/admin/users/:userId
\`\`\`

#### Enrollments
\`\`\`http
GET /api/v1/admin/enrollments
POST /api/v1/admin/enrollments
PATCH /api/v1/admin/enrollments/:enrollmentId
\`\`\`

#### Pagos y dashboard
\`\`\`http
GET /api/v1/admin/payments
GET /api/v1/admin/programs/:programId/dashboard
\`\`\`

### Webhooks (sin auth, verificación por signature)

\`\`\`http
POST /api/v1/webhooks/stripe
POST /api/v1/webhooks/crypto
\`\`\`

---

## 🔐 Seguridad

- **Rate limiting**: 10 req/10s por IP (configurable, con Redis distribuido opcional)
- **Authentication**: JWT tokens con NextAuth v5
- **Authorization**: Middleware \`requireAuth()\`, \`requireAdmin()\`
- **Webhook security**: Signature verification (Stripe/Coinbase)
- **Password hashing**: bcryptjs (salt rounds: 10)
- **Input validation**: Zod schemas en todos los endpoints
- **Error handling**: Middleware centralizado con error types

---

## 🧪 Scripts útiles

\`\`\`json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:generate": "prisma generate",
  "db:migrate": "prisma migrate deploy",
  "db:seed": "tsx prisma/seed.ts",
  "db:studio": "prisma studio",
  "db:reset": "prisma migrate reset && npm run db:seed"
}
\`\`\`

**Comandos comunes**:

\`\`\`bash
# Ver base de datos en UI
npm run db:studio

# Reset completo + seed
npm run db:reset

# Ver logs de Prisma
DEBUG=prisma:* npm run dev
\`\`\`

---

## 📁 Estructura del proyecto

\`\`\`
frontend/
├── prisma/
│   ├── schema.prisma         # Esquema de BD (12 tablas)
│   └── seed.ts               # Seed data
├── src/
│   ├── app/
│   │   ├── api/v1/           # REST API routes
│   │   │   ├── programs/     # CRUD programas
│   │   │   ├── checkout/     # Stripe + Crypto
│   │   │   ├── webhooks/     # Stripe + Crypto
│   │   │   ├── lessons/      # Access tokens, progress
│   │   │   ├── payments/     # Historial usuario
│   │   │   ├── aula/         # Portal estudiante
│   │   │   └── admin/        # Panel admin
│   │   └── auth/[...nextauth]/  # NextAuth routes
│   ├── lib/
│   │   └── auth.ts           # NextAuth config + helpers
│   └── server/
│       ├── db.ts             # Prisma client (Prisma 7 + pg adapter)
│       ├── lib/
│       │   ├── stripe.ts     # Stripe client
│       │   ├── coinbase.ts   # Coinbase Commerce client
│       │   ├── rate-limit.ts # Rate limiting utilities
│       │   └── security.ts   # Signature verification, hashing
│       ├── middleware/
│       │   ├── rate-limit.ts     # Rate limit middleware
│       │   └── error-handler.ts  # Error handling middleware
│       ├── modules/
│       │   ├── program/      # Repository + Service + Schemas
│       │   ├── enrollment/
│       │   ├── payment/
│       │   ├── lesson/
│       │   └── user/
│       └── utils/
│           ├── errors.ts     # Custom error classes
│           └── response.ts   # API response helpers
├── .env.example              # Template variables entorno
├── prisma.config.ts          # Prisma 7 config (nuevo formato)
└── README.md                 # Este archivo
\`\`\`

---

## 🔄 Flujo de pago (Stripe)

1. Frontend: \`POST /api/v1/checkout/stripe\` → backend crea Stripe Checkout Session
2. Usuario completa pago en Stripe
3. Stripe envía evento \`checkout.session.completed\` a webhook
4. Backend valida signature, marca Payment como SUCCEEDED
5. Backend activa automáticamente Enrollment con status ACTIVE
6. Usuario puede acceder al contenido

## 🔄 Flujo de pago (Crypto)

1. Frontend: \`POST /api/v1/checkout/crypto\` → backend crea Coinbase Charge
2. Usuario paga con crypto en Coinbase Commerce
3. Coinbase envía evento \`charge:confirmed\` a webhook
4. Backend valida signature, marca Payment como SUCCEEDED
5. Backend activa automáticamente Enrollment con status ACTIVE
6. Usuario puede acceder al contenido

---

## 🎓 Flujo de acceso a lección

1. Usuario autenticado solicita: \`POST /api/v1/lessons/:id/access-token\`
2. Backend verifica Enrollment activo
3. Backend genera JWT token efímero (exp: 5 min) guardado en \`LessonAccessToken\`
4. Frontend redirige a: \`GET /api/v1/lessons/:id/play?token={JWT}\`
5. Backend valida token, retorna JSON con \`youtubeVideoId\`
6. Frontend reproduce video con YouTube Player API
7. Usuario reporta progreso: \`POST /api/v1/lessons/:id/progress { watchedSeconds }\`

---

## 🚧 Próximas tareas (ROADMAP.MD)

- [x] **A1-A6**: MVP Core
- [x] **B1-B2**: Admin panel & Progress tracking
- [x] **B3**: Security layer
- [x] **B4**: Crypto payments
- [ ] **C1**: Documentación completa *(en curso)*
- [ ] **C2**: Analytics y eventos (GA4, Meta Pixel)
- [ ] **C3**: Observability (Sentry, logging estructurado con pino)

---

## 📄 Licencia

Privado – Gallo Trader © 2025

---

## 👨‍💻 Autor

Fernando De Gante  
Gallo Trader – Trading sin mentiras, con cabeza fría.

---

## 🎓 Tareas C completadas

### ✅ C1: Documentación

- **README.md**: Setup completo, 23 endpoints documentados, arquitectura, flujos de pago
- **OBSERVABILITY.md**: Guía de analytics, error monitoring y logging
- **.env.example**: Variables de entorno con comentarios explicativos
- **Scripts npm**: db:seed, db:reset, db:studio, etc.

### ✅ C2: Analytics

- **Event Schema**: 15+ eventos tracked (checkout, lessons, progress, admin)
- **Providers**: GA4 (Measurement Protocol), Meta Pixel (Conversions API), Console Logger
- **Integration**: Tracking automático en payment, enrollment, lesson services
- **Config**: `src/server/lib/analytics.ts`, `analytics-providers.ts`, `analytics-setup.ts`

### ✅ C3: Observability

- **Sentry**: Error monitoring con context, filtering, sampling
- **Pino Logger**: Structured logging con niveles (debug/info/warn/error)
- **Error Handler**: Middleware integrado con Sentry + logger
- **Config**: `sentry.server.config.ts`, `sentry.client.config.ts`, `src/server/lib/logger.ts`

---

## 📊 Estado del proyecto

| Fase | Tareas | Estado |
|------|--------|--------|
| **A** | MVP Core (A1-A6) | ✅ 100% |
| **B** | Admin + Security (B1-B4) | ✅ 100% |
| **C** | Docs + Analytics + Observability (C1-C3) | ✅ 100% |

**Total**: 13/13 tareas completadas 🎉

---
