# ==========================================
# STAGE 1: Dependencies
# ==========================================
FROM node:24-alpine AS deps

# Instala dependencias del sistema necesarias para Prisma
RUN apk add --no-cache \
    openssl \
    libc6-compat

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instala solo dependencias de producción
RUN npm ci --only=production && \
    npm cache clean --force

# ==========================================
# STAGE 2: Builder
# ==========================================
FROM node:24-alpine AS builder

RUN apk add --no-cache \
    openssl \
    libc6-compat

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instala todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copia el código fuente
COPY . .

# Genera cliente de Prisma
RUN npx prisma generate

# Build de Next.js
RUN npm run build

# ==========================================
# STAGE 3: Runner (Imagen final)
# ==========================================
FROM node:24-alpine AS runner

RUN apk add --no-cache \
    openssl \
    libc6-compat \
    dumb-init

WORKDIR /app

# Crea usuario no-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia archivos necesarios desde builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Copia archivos compilados de Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Establece usuario
USER nextjs

# Expone puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Usa dumb-init para manejar señales correctamente
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Comando de inicio
CMD ["npm", "start"]
