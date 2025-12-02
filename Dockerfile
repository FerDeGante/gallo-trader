# Usa Node.js 24 (Alpine para imagen más ligera)
FROM node:24-alpine

# Instala dependencias del sistema necesarias para Prisma
RUN apk add --no-cache \
    openssl \
    libc6-compat

# Establece directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependencias
RUN npm ci

# Copia el resto del código
COPY . .

# Genera cliente de Prisma
RUN npm run db:generate

# Build de Next.js
RUN npm run build

# Expone puerto
EXPOSE 3000

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["npm", "start"]
