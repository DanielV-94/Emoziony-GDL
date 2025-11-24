# 🎯 Guía de Inicio Rápido - 5 Minutos

## 🚀 Sistema de Notificaciones Implementado

Tu proyecto ahora tiene **3 flujos automáticos** cuando un cliente envía una cotización:

```
┌─────────────────────────────────────────────────────────────┐
│  Cliente llena formulario en www.emozioni.com              │
│  y hace clic en "Enviar Cotización"                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (JavaScript)                                      │
│  • Valida datos                                             │
│  • Envía POST a http://localhost:3000/api/quotation/send   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  BACKEND (Node.js + Express)                                │
│  • Recibe datos de cotización                               │
│  • Ejecuta 3 servicios simultáneamente ━━━━━━━━━━━━┓       │
└─────────────────┬───────────────────────────────────────────┘
                  │                          │          │
        ┌─────────┴─────────┐       ┌────────┴──────┐  │
        ▼                   ▼        ▼               ▼  ▼
    ┌──────────┐      ┌──────────┐  ┌──────────┐   ┌──────────┐
    │ WhatsApp │      │  Email   │  │  Email   │   │ Respuesta│
    │ al Dueño │      │ al Dueño │  │al Cliente│   │ al Front │
    └──────────┘      └──────────┘  └──────────┘   └──────────┘
         │                 │             │               │
         ▼                 ▼             ▼               ▼
    📱 Twilio        📧 Nodemailer  📧 Nodemailer    ✅ Modal
    WhatsApp API     /SendGrid      /SendGrid         de Éxito
```

---

## ⚡ Setup en 3 Pasos

### **Paso 1: Instalar Dependencias** (2 minutos)

**Windows (PowerShell)**:

```powershell
cd C:\Users\Admin\Downloads\emozioni\backend
.\start.bat
```

**Mac/Linux (Terminal)**:

```bash
cd /path/to/emozioni/backend
chmod +x start.sh
./start.sh
```

O manualmente:

```bash
cd backend
npm install
```

---

### **Paso 2: Configurar Credenciales** (3 minutos)

El script automáticamente creará `.env` desde `.env.example`.

**Edita `backend/.env`** con tus datos:

#### **Opción A: Solo Email (Testing Rápido)**

```env
PORT=3000

# --- EMAIL (Gmail) ---
EMAIL_SERVICE=gmail
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # App Password de Gmail
EMAIL_FROM=Emozioni <tu-correo@gmail.com>

STORE_EMAIL=tu-correo@gmail.com
STORE_PHONE=+5213313310327
STORE_NAME=Emozioni Guadalajara

# WhatsApp (dejar vacío por ahora)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

**Cómo obtener App Password de Gmail**:

1. https://myaccount.google.com/security
2. Activa "Verificación en 2 pasos"
3. "Contraseñas de aplicaciones" → Genera una nueva
4. Copia los 16 caracteres (sin espacios)

---

#### **Opción B: Email + WhatsApp (Completo)**

```env
PORT=3000

# --- WHATSAPP (Twilio) ---
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_aqui
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+5213313310327

# --- EMAIL ---
EMAIL_SERVICE=gmail
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=Emozioni <tu-correo@gmail.com>

STORE_EMAIL=tu-correo@gmail.com
STORE_PHONE=+5213313310327
STORE_NAME=Emozioni Guadalajara
```

**Cómo obtener credenciales de Twilio**:

1. Regístrate gratis: https://www.twilio.com/try-twilio
2. Dashboard → Messaging → Try WhatsApp
3. Sigue instrucciones para activar Sandbox
4. Copia `Account SID` y `Auth Token`

---

### **Paso 3: Iniciar Backend** (10 segundos)

```bash
cd backend
npm run dev
```

Verás:

```
🚀 ========================================
🎁 Emozioni Backend API
📡 Servidor corriendo en puerto 3000
🌍 Entorno: development
⏰ Iniciado: [fecha/hora]
🚀 ========================================
```

---

## 🧪 Probar que Funciona

### **1. Health Check**

Abre en el navegador: http://localhost:3000/api/health

Deberías ver:

```json
{
  "success": true,
  "message": "Emozioni API funcionando correctamente",
  "timestamp": "2025-11-24T..."
}
```

### **2. Prueba Completa**

1. **Abre** `frontend/index.html` en el navegador (con Live Server)
2. **Llena** el formulario de cotización con datos de prueba
3. **Haz clic** en "Enviar Cotización"
4. **Espera** unos segundos (loading)
5. **Verás**:
   - ✅ Modal de éxito con confetti
   - 📱 WhatsApp en tu teléfono (si configuraste Twilio)
   - 📧 2 emails (uno para ti, otro al cliente)

---

## 📁 Estructura de Archivos Creados

```
emozioni/
│
├── frontend/
│   └── js/
│       └── main.js (✅ ACTUALIZADO - ahora llama al backend)
│
└── backend/                    ← NUEVO
    ├── package.json            ← Dependencias
    ├── .env                    ← TU CONFIGURACIÓN (NO SUBIR A GIT)
    ├── .env.example            ← Plantilla
    ├── .gitignore              ← Protege .env
    ├── README.md               ← Documentación completa
    ├── start.sh / start.bat    ← Scripts de inicio rápido
    ├── server.js               ← Servidor Express principal
    │
    ├── controllers/
    │   └── quotationController.js   ← Lógica de cotizaciones
    │
    └── services/
        ├── whatsappService.js       ← Integración Twilio
        └── emailService.js          ← Integración Nodemailer/SendGrid
```

---

## 🔧 Configuración del Frontend

**Ya está hecho**, pero por si necesitas cambiar la URL del backend:

**Archivo**: `frontend/js/main.js`

```javascript
// Línea ~310
const API_URL = "http://localhost:3000/api/quotation/send";

// Para producción, cambia a:
// const API_URL = 'https://api.emozioni.com/api/quotation/send';
```

---

## 📧 Templates de Email Incluidos

### **Email al Dueño de la Tienda**

- ✅ Diseño profesional con colores de marca
- ✅ Todos los datos del pedido
- ✅ Resumen de extras
- ✅ Total destacado
- ✅ Fecha/hora de solicitud

### **Email al Cliente (Confirmación)**

- ✅ Mensaje de agradecimiento
- ✅ Resumen de su cotización
- ✅ Tiempo estimado de respuesta
- ✅ Botón de WhatsApp
- ✅ Datos de contacto

---

## ⚠️ Troubleshooting

### **"Cannot connect to backend"**

```bash
# Verifica que el backend esté corriendo
cd backend
npm run dev

# Verifica el puerto
curl http://localhost:3000/api/health
```

### **"Email authentication failed"**

```bash
# Gmail: Verifica que la App Password sea correcta
# Debe tener 16 caracteres sin espacios
# Ejemplo: abcdefghijklmnop (no: abcd efgh ijkl mnop)
```

### **"Twilio unauthorized"**

```bash
# Verifica:
# 1. Account SID es correcto (empieza con AC)
# 2. Auth Token es correcto
# 3. Activaste el WhatsApp Sandbox enviando el código
```

### **"CORS blocked"**

```bash
# Agrega tu dominio en backend/.env:
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500
```

---

## 🚀 Siguiente Paso: Subir a Producción

Cuando esté listo para producción, lee:

- `backend/README.md` - Sección "Deployment"

Opciones recomendadas:

1. **Railway** (Más fácil) - https://railway.app/
2. **Heroku** (Gratis con límites) - https://heroku.com/
3. **DigitalOcean** (VPS profesional) - $12/mes

---

## 💡 Consejos

### **Desarrollo**:

- ✅ Usa Gmail (gratis, 500 emails/día)
- ✅ Twilio Sandbox (gratis, limitado)
- ✅ Localhost (http://localhost:3000)

### **Producción**:

- ✅ SendGrid o Brevo (mejor deliverability)
- ✅ Twilio número oficial ($25/mes)
- ✅ Dominio propio (api.emozioni.com)
- ✅ HTTPS (certificado SSL)

---

## 📊 Costos Estimados

| Servicio          | Desarrollo       | Producción         |
| ----------------- | ---------------- | ------------------ |
| WhatsApp (Twilio) | Gratis (Sandbox) | $25 USD/mes        |
| Email             | Gratis (Gmail)   | $0-20 USD/mes      |
| Hosting Backend   | Gratis (Railway) | $5-12 USD/mes      |
| **Total**         | **$0**           | **$30-57 USD/mes** |

---

## ✅ Checklist Rápido

- [ ] Node.js instalado (`node --version`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` configurado
- [ ] Backend corriendo (`npm run dev`)
- [ ] Health check funciona (http://localhost:3000/api/health)
- [ ] Frontend actualizado (ya lo está)
- [ ] Prueba de formulario exitosa
- [ ] WhatsApp recibido (opcional)
- [ ] 2 emails recibidos

---

## 🎉 ¡Listo!

Tu sistema de notificaciones automáticas está completamente funcional.

Cuando un cliente envíe una cotización:

1. 📱 Recibirás WhatsApp instantáneo
2. 📧 Recibirás email con todos los detalles
3. 📧 El cliente recibirá confirmación automática

**¿Dudas?** Lee `backend/README.md` para documentación completa.

---

**Desarrollado por**: Daniel V (@DanielV-94)  
**Proyecto**: Emozioni - Delivering Happiness  
**Fecha**: Noviembre 2025
