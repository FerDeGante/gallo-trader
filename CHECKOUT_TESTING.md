# 🧪 Guía de Pruebas de Checkout

Este documento explica cómo probar el flujo completo de checkout de Stripe y asegurar que funcione correctamente.

## 📋 Pre-requisitos

1. **Variables de entorno configuradas** en `.env`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PRICE_ID=price_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   NEXTAUTH_URL=http://localhost:3000
   ```

2. **Base de datos seeded**:
   ```bash
   npm run db:seed
   ```

3. **Servidor corriendo**:
   ```bash
   npm run dev
   ```

## ✅ Paso 1: Validar Configuración de Stripe

Antes de hacer cualquier prueba, verifica que Stripe esté correctamente configurado:

```bash
npm run test:stripe
```

Este comando:
- ✅ Verifica que todas las variables de entorno estén presentes
- ✅ Valida el formato de las API keys
- ✅ Prueba la conexión con Stripe API
- ✅ Verifica que el Price ID exista y esté activo
- ✅ Crea una test checkout session para validar configuración

**Resultado esperado:**
```
✅ TODAS LAS VALIDACIONES PASARON
🎉 Tu configuración de Stripe está lista!
```

Si hay errores, corrígelos antes de continuar.

---

## 🧪 Paso 2: Ejecutar Test Automatizado de Checkout

Una vez validada la configuración, ejecuta el test de flujo completo:

```bash
npm run test:checkout
```

Este test simula todo el flujo:
1. Obtiene un usuario de prueba (`cliente5@example.com`)
2. Obtiene el programa activo
3. Crea un registro de pago en la DB
4. Crea una Stripe Checkout Session
5. Te proporciona la URL de checkout
6. Espera 10 segundos para que completes el pago
7. Verifica el estado del pago
8. Verifica la creación del enrollment

**Resultado esperado:**
```
📊 RESUMEN DEL TEST:
✅ Payment record creado
✅ Stripe session creada
✅ URL de checkout generada
✅ Metadata correctamente configurada
```

---

## 🎯 Paso 3: Prueba Manual E2E (End-to-End)

### 3.1. Como Usuario Autenticado

1. **Login** con un usuario de prueba:
   - Email: `cliente5@example.com`
   - Password: `Password123!`

2. **Navega** a la landing page: `http://localhost:3000`

3. **Haz click** en "Acceder Ahora" en la sección de precio

4. **Completa el checkout** con datos de prueba de Stripe:
   - **Tarjeta**: `4242 4242 4242 4242`
   - **Fecha**: Cualquier fecha futura (ej: 12/34)
   - **CVC**: Cualquier 3 dígitos (ej: 123)
   - **Email**: Tu email real o de prueba
   - **ZIP**: Cualquier código postal

5. **Verifica la redirección** a `/checkout/success`

6. **Espera** el mensaje de confirmación y auto-login

7. **Accede al aula**: Deberías ser redirigido automáticamente a `/aula`

8. **Verifica acceso** al contenido del programa

### 3.2. Como Usuario Invitado (Guest)

1. **Cierra sesión** (si estás logueado)

2. **Navega** a la landing page

3. **Haz click** en "Acceder Ahora"

4. **Completa el checkout** con tarjeta de prueba

5. **Verifica** que el sistema:
   - Cree automáticamente una cuenta con tu email
   - Te haga login automáticamente
   - Te de acceso al programa
   - Te redirija al aula

---

## 🧪 Tarjetas de Prueba de Stripe

### Tarjetas Exitosas

| Número | Escenario |
|--------|-----------|
| `4242 4242 4242 4242` | Pago exitoso básico |
| `4000 0025 0000 3155` | Requiere 3D Secure |
| `5555 5555 5555 4444` | Mastercard exitosa |

### Tarjetas con Error (para probar manejo de errores)

| Número | Error |
|--------|-------|
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0069` | Expired card |

---

## 📊 Verificaciones Post-Pago

Después de completar un pago exitoso, verifica:

### En la Base de Datos

```bash
npm run db:studio
```

1. **Tabla `Payment`**:
   - ✅ Registro con status `SUCCEEDED`
   - ✅ `providerPaymentId` contiene el Stripe Session ID
   - ✅ `amount` correcto
   - ✅ `rawProviderPayload` contiene datos de Stripe

2. **Tabla `Enrollment`**:
   - ✅ Registro con status `ACTIVE`
   - ✅ `source` = `PAYMENT`
   - ✅ `paymentId` referencia al payment correcto
   - ✅ `startDate` está presente

3. **Tabla `User`**:
   - ✅ Si era guest, usuario creado con email del checkout

### En el Panel del Aula

1. Navega a `http://localhost:3000/aula`
2. ✅ Debes ver el programa al que tienes acceso
3. ✅ Puedes acceder a las lecciones
4. ✅ Videos se reproducen correctamente

### En Stripe Dashboard

1. Ve a: https://dashboard.stripe.com/test/payments
2. ✅ Deberías ver el pago reciente
3. ✅ Status: `Succeeded`
4. ✅ Metadata contiene `userId`, `programId`, `paymentId`

---

## 🐛 Problemas Comunes y Soluciones

### ❌ Error: "STRIPE_PRICE_ID no configurado"

**Solución:**
```bash
# Verifica que .env tenga:
STRIPE_PRICE_ID=price_1Sa1pZRyUBQh2ODOiH7N1fik
```

### ❌ Error: "Programa no encontrado o no disponible"

**Solución:**
```bash
# Re-seedea la base de datos:
npm run db:seed
```

### ❌ Checkout redirect falla con 500

**Solución:**
1. Revisa logs del servidor: `npm run dev`
2. Verifica que `NEXTAUTH_URL` esté correcto
3. Asegúrate que webhook endpoint esté configurado (en producción)

### ❌ Pago exitoso pero no se crea enrollment

**Causa:** Webhook no está procesando correctamente

**Solución en localhost:**
1. El webhook solo funciona en producción o con Stripe CLI
2. En desarrollo, el endpoint `/api/v1/checkout/confirm` se encarga del enrollment
3. Verifica que la página `/checkout/success` esté llamando a este endpoint

**Solución con Stripe CLI:**
```bash
stripe listen --forward-to localhost:3000/api/v1/webhooks/stripe
# Copia el webhook secret
# Agrégalo a .env como STRIPE_WEBHOOK_SECRET
```

### ❌ "Max clients reached" en DB

**Solución:**
```bash
# Reinicia el servidor para resetear pool:
lsof -ti:3000 | xargs kill -9
npm run dev
```

---

## 🎯 Checklist Final de Pruebas

Antes de desplegar a producción, verifica:

- [ ] `npm run test:stripe` pasa todas las validaciones
- [ ] `npm run test:checkout` crea session exitosamente
- [ ] Checkout como usuario autenticado funciona
- [ ] Checkout como guest crea cuenta automáticamente
- [ ] Redirección a `/checkout/success` funciona
- [ ] Auto-login después del pago funciona
- [ ] Enrollment se crea con status ACTIVE
- [ ] Usuario tiene acceso real al contenido en `/aula`
- [ ] Tarjetas de error muestran mensajes apropiados
- [ ] Webhook de Stripe está configurado (producción)
- [ ] Emails de confirmación se envían (si configurado)

---

## 📝 Logs Importantes

Durante las pruebas, revisa los logs del servidor para ver el flujo completo:

```
💳 Iniciando creación de checkout session...
✅ Programa encontrado: {...}
💾 Creando registro de pago en DB...
✅ Payment creado: {...}
🎫 Creando sesión de Stripe Checkout...
✅ Sesión de Stripe creada: {...}
🎉 Checkout session creada exitosamente
```

Estos logs te ayudarán a identificar exactamente dónde falla el proceso si algo sale mal.

---

## 🚀 Próximos Pasos

Una vez que todas las pruebas pasen:

1. **Configura Stripe Webhook** en producción:
   - URL: `https://tu-dominio.com/api/v1/webhooks/stripe`
   - Eventos: `checkout.session.completed`, `charge.refunded`

2. **Actualiza variables de entorno** en Railway/Vercel:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_produccion_...
   NEXTAUTH_URL=https://tu-dominio.com
   ```

3. **Prueba en producción** con Mode Test de Stripe

4. **Cambia a Live Mode** cuando estés listo para pagos reales

---

## 💡 Tips

- **Siempre prueba primero en Test Mode** antes de activar Live Mode
- **Guarda los logs** de transacciones importantes
- **Monitorea Stripe Dashboard** para ver pagos en tiempo real
- **Configura alertas** en Stripe para pagos fallidos
- **Mantén backups** de la base de datos antes de migraciones

---

**¿Necesitas ayuda?** Revisa:
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
