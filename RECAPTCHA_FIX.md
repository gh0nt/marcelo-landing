# 🔧 reCAPTCHA Error Fix para Vercel

## ❌ **Error Original:**

```
Uncaught Error: Missing required parameters: sitekey
Application error: a client-side exception has occurred
```

## ✅ **Solución Implementada:**

### **Problema identificado:**

- reCAPTCHA intentaba renderizarse sin `sitekey` configurada en Vercel
- El componente fallaba al no encontrar `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

### **Cambios realizados:**

#### 1. **🔧 Frontend Condicional (ContactForm.tsx):**

```tsx
// Renderiza reCAPTCHA solo si la sitekey está disponible
{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
  <ReCAPTCHA
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    onChange={setRecaptchaToken}
  />
) : (
  <div>🔒 reCAPTCHA no configurado</div>
)}

// Validación condicional en submit
const isRecaptchaEnabled = !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
if (isRecaptchaEnabled && !recaptchaToken) {
  // Solo requiere reCAPTCHA si está configurado
}

// Botón habilitado condicionalmente
disabled={
  isSubmitting ||
  (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? !recaptchaToken : false)
}
```

#### 2. **🔧 Backend Condicional (route.ts):**

```typescript
// Validación solo si la secret key está configurada
const isRecaptchaEnabled = !!process.env.RECAPTCHA_SECRET_KEY;

if (isRecaptchaEnabled) {
  if (!recaptchaToken || !(await validateRecaptcha(recaptchaToken))) {
    return error;
  }
} else {
  console.log("reCAPTCHA not configured, skipping validation");
}

// Función de validación con fallback
async function validateRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return true; // Permitir si no está configurado
  }
  // ... resto de validación
}
```

## 🚀 **Resultado:**

### ✅ **Con reCAPTCHA configurado:**

- Renderiza componente reCAPTCHA completo
- Valida token antes de enviar
- Protección anti-spam activa
- UX completa con verificación

### ✅ **Sin reCAPTCHA (Vercel sin configurar):**

- Muestra placeholder informativo
- Permite envío sin verificación
- No genera errores JavaScript
- Funcionalidad básica preservada

## 🎯 **Estados de Funcionamiento:**

### **Estado 1: Producción Completa**

```bash
# Variables en Vercel:
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key
RECAPTCHA_SECRET_KEY=tu_secret_key
```

**Resultado:** ✅ reCAPTCHA completo + Validación backend

### **Estado 2: Básico (Sin configurar)**

```bash
# Sin variables reCAPTCHA en Vercel
```

**Resultado:** ✅ Formulario funcional sin reCAPTCHA

## 📋 **Para configurar reCAPTCHA en Vercel:**

1. **Ve a tu proyecto en Vercel**
2. **Settings > Environment Variables**
3. **Agrega:**
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 6LfNHdYrAAAAALTHzrloqHbt6-L1w7ndV2BhA2tZ
   RECAPTCHA_SECRET_KEY = 6LfNHdYrAAAAAHKc-9yp4kkego97hr1Fm8FyeWLi
   ```
4. **Redeploy** el proyecto

## 🎉 **Beneficios de la solución:**

- ✅ **Sin errores** en el cliente
- ✅ **Graceful degradation** - funciona sin configuración
- ✅ **Flexible** - se adapta al entorno
- ✅ **Robusta** - maneja tanto casos configurados como no configurados
- ✅ **UX preservada** - usuario no nota la diferencia

---

> **Nota**: El sitio ahora funciona perfectamente en Vercel sin requerir configuración adicional, pero puede ser mejorado agregando las variables de reCAPTCHA para mayor seguridad.
