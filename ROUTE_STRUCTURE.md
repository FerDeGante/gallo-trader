# Estructura de Rutas - Gallo Trader

## 📁 Arquitectura de Carpetas

La aplicación está organizada usando **Route Groups** de Next.js para separar claramente las diferentes secciones:

```
app/src/app/
├── (landing)/              # 🌐 Landing Page Pública
│   ├── layout.tsx          # Layout con NavBar + Footer
│   ├── page.tsx            # Página principal de marketing
│   └── page.module.css     # Estilos de la landing
│
├── (platform)/             # 🎓 Plataforma de Cursos (Requiere Autenticación)
│   ├── layout.tsx          # Layout con AuthGuard
│   ├── aula/               # Área de estudiantes
│   └── admin/              # Panel de administración
│
├── (auth)/                 # 🔐 Autenticación y Checkout
│   ├── layout.tsx          # Layout limpio centrado
│   ├── login/              # Inicio de sesión
│   ├── registro/           # Registro de usuarios
│   └── checkout/           # Proceso de pago
│       ├── success/        # Confirmación de pago
│       └── cancel/         # Pago cancelado
│
├── api/                    # 🔌 API Routes (sin agrupar)
│   ├── auth/               # Endpoints de autenticación
│   └── v1/                 # API versionada
│
├── layout.tsx              # Layout raíz (Providers globales)
├── providers.tsx           # Providers de NextAuth, etc.
├── globals.css             # Estilos globales
└── favicon.ico             # Icono
```

## 🎯 Route Groups - Explicación

Los paréntesis `()` en las carpetas crean **Route Groups** que:

- ✅ **No afectan las URLs**: `(landing)/page.tsx` → `/`
- ✅ **Permiten layouts específicos**: Cada grupo tiene su propio layout
- ✅ **Organizan lógicamente**: Separan concerns sin cambiar rutas

## 🌐 URLs Resultantes

| Grupo | Archivo | URL Final | Descripción |
|-------|---------|-----------|-------------|
| `(landing)` | `page.tsx` | `/` | Página principal |
| `(platform)` | `aula/page.tsx` | `/aula` | Aula virtual |
| `(platform)` | `admin/page.tsx` | `/admin` | Panel admin |
| `(auth)` | `login/page.tsx` | `/login` | Login |
| `(auth)` | `registro/page.tsx` | `/registro` | Registro |
| `(auth)` | `checkout/success/page.tsx` | `/checkout/success` | Pago exitoso |
| Sin grupo | `api/v1/programs/route.ts` | `/api/v1/programs` | API endpoint |

## 📋 Layouts Jerárquicos

```
RootLayout (layout.tsx)
├── Providers (NextAuth, etc.)
│
├── LandingLayout (landing)/layout.tsx
│   ├── NavBar
│   ├── {children} → Landing sections
│   └── Footer
│
├── PlatformLayout (platform)/layout.tsx
│   └── AuthGuard
│       └── {children} → Aula o Admin
│
└── AuthLayout (auth)/layout.tsx
    └── {children} → Login, Registro, Checkout (centrado)
```

## 🔒 Protección de Rutas

- **`(landing)`**: Acceso público
- **`(platform)`**: Protegido con `AuthGuard` en el layout
- **`(auth)`**: Acceso público (login, registro)
- **`api/`**: Protección en cada endpoint según necesidad

## 🚀 Beneficios de esta Estructura

1. **Separación Clara**: Marketing vs. Plataforma vs. Auth
2. **Mantenibilidad**: Fácil encontrar y organizar componentes
3. **Performance**: Layouts específicos solo cargan lo necesario
4. **Escalabilidad**: Agregar nuevas secciones es simple
5. **Developer Experience**: Estructura intuitiva y autodocumentada

## 📝 Convenciones

- Componentes de marketing → `/components/marketing/`
- Componentes de aula → `/components/aula/`
- Componentes de admin → `/components/admin/`
- Componentes compartidos → `/components/ui/`
- API handlers → `/server/modules/`
