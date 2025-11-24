# 🚀 Sistema de Notificaciones Automáticas - Emozioni Backend

## 📋 Descripción

Backend completo que automatiza **3 flujos simultáneos** cuando un cliente envía una cotización:

1. ✅ **WhatsApp al dueño** - Notificación instantánea con todos los datos
2. ✅ **Email al dueño** - Copia completa de la cotización con diseño profesional
3. ✅ **Email al cliente** - Confirmación de recepción automática

---

## 🏗️ Arquitectura

```
emozioni/
├── frontend/
│   ├── index.html
│   ├── css/
│   └── js/
│       └── main.js (actualizado con fetch al backend)
│
└── backend/
    ├── server.js (servidor Express principal)
    ├── package.json
    ├── .env (configuración - NO SUBIR A GIT)
    ├── .env.example (plantilla de configuración)
    │
    ├── controllers/
    │   └── quotationController.js (lógica de negocio)
    │
    └── services/
        ├── whatsappService.js (integración Twilio/WhatsApp)
        └── emailService.js (integración Nodemailer/SendGrid)
```

---

## 📦 Instalación

### 1. **Instalar Node.js**

Si no lo tienes instalado:

- Descarga desde: https://nodejs.org/ (versión LTS recomendada)
- Verifica instalación:

```bash
node --version
npm --version
```

### 2. **Instalar Dependencias del Backend**

```bash
cd backend
npm install
```

Esto instalará:

- `express` - Servidor web
- `cors` - Habilitar requests desde el frontend
- `dotenv` - Variables de entorno
- `nodemailer` - Envío de emails
- `axios` - Peticiones HTTP (WhatsApp API)
- `helmet` - Seguridad
- `express-rate-limit` - Prevenir spam

### 3. **Configurar Variables de Entorno**

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
PORT=3000

# --- WHATSAPP (Twilio) ---
TWILIO_ACCOUNT_SID=tu_account_sid
TWILIO_AUTH_TOKEN=tu_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+5213313310327

# --- EMAIL (Gmail para desarrollo) ---
EMAIL_SERVICE=gmail
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu_app_password
EMAIL_FROM=Emozioni <tu-email@gmail.com>

STORE_EMAIL=hola@emozioni.com
STORE_PHONE=+5213313310327
STORE_NAME=Emozioni Guadalajara
```

---

## 🔧 Configuración de Servicios Externos

### 📱 **1. WhatsApp con Twilio** (Recomendado - Más Fácil)

#### **Paso 1: Crear cuenta en Twilio**

1. Ve a https://www.twilio.com/try-twilio
2. Regístrate gratis (incluye $15 USD de crédito)
3. Verifica tu número de teléfono

#### **Paso 2: Activar WhatsApp Sandbox**

1. En el dashboard de Twilio: **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Sigue las instrucciones para conectar tu WhatsApp personal
3. Envía el código de activación desde tu WhatsApp al número de Twilio
4. Copia tus credenciales:
   - `Account SID` → `TWILIO_ACCOUNT_SID`
   - `Auth Token` → `TWILIO_AUTH_TOKEN`
   - Número de WhatsApp de Twilio → `TWILIO_WHATSAPP_FROM`
   - Tu número personal → `TWILIO_WHATSAPP_TO`

#### **Ejemplo de configuración**:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=tu_token_secreto_aqui
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
TWILIO_WHATSAPP_TO=whatsapp:+5213313310327
```

#### **Nota**: El sandbox es gratis pero tiene limitaciones. Para producción, necesitas:

- Solicitar un número de WhatsApp Business oficial
- Costo: ~$25 USD/mes + mensajes

---

### 📧 **2. Email con Gmail** (Desarrollo - Gratis)

#### **Paso 1: Habilitar App Passwords en Gmail**

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. **Seguridad** → **Verificación en 2 pasos** (actívala si no la tienes)
3. **Seguridad** → **App Passwords**
4. Genera una contraseña para "Correo" en "Otro dispositivo personalizado"
5. Copia la contraseña de 16 dígitos (sin espacios)

#### **Paso 2: Configurar .env**

```env
EMAIL_SERVICE=gmail
EMAIL_USER=tu-correo@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  # Contraseña de app (sin espacios)
EMAIL_FROM=Emozioni <tu-correo@gmail.com>
STORE_EMAIL=tu-correo@gmail.com
```

#### **Limitaciones de Gmail**:

- Máximo 500 emails/día
- Solo para desarrollo/testing
- Para producción usa SendGrid o Brevo

---

### 📧 **3. Email con SendGrid** (Producción - Recomendado)

#### **Ventajas**:

- ✅ Gratis hasta 100 emails/día
- ✅ Deliverability superior
- ✅ Analytics integrados
- ✅ Templates profesionales

#### **Configuración**:

1. Regístrate en https://sendgrid.com/
2. Verifica tu email
3. **Settings** → **API Keys** → **Create API Key**
4. Copia el API Key

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Emozioni <hola@emozioni.com>
STORE_EMAIL=hola@emozioni.com
```

#### **Modificar en `emailService.js`**:

El código ya está preparado, solo comenta la sección de Gmail y descomenta SendGrid.

---

### 📧 **4. Email con Brevo** (Alternativa Gratuita)

- Gratis hasta 300 emails/día
- Registro: https://www.brevo.com/
- Similar a SendGrid

```env
BREVO_API_KEY=tu_api_key_aqui
EMAIL_FROM=Emozioni <hola@emozioni.com>
```

---

## 🚀 Iniciar el Backend

### **Modo Desarrollo** (con auto-reload):

```bash
cd backend
npm run dev
```

### **Modo Producción**:

```bash
cd backend
npm start
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

## 🧪 Testing

### **1. Health Check**

Verifica que el servidor esté funcionando:

```bash
curl http://localhost:3000/api/health
```

Respuesta esperada:

```json
{
  "success": true,
  "message": "Emozioni API funcionando correctamente",
  "timestamp": "2025-11-24T...",
  "environment": "development"
}
```

### **2. Test de Cotización con Postman/Insomnia**

**POST** `http://localhost:3000/api/quotation/send`

**Body (JSON)**:

```json
{
  "productName": "Desayuno Premium",
  "productPrice": 650,
  "recipientName": "María García",
  "recipientAddress": "Av. Chapultepec 123, Col. Americana, Guadalajara",
  "recipientPhone": "3312345678",
  "customerName": "Juan Pérez",
  "customerEmail": "juan@example.com",
  "customerPhone": "3398765432",
  "customerOccasion": "Cumpleaños",
  "deliveryDate": "viernes, 1 de diciembre de 2025",
  "deliveryTime": "09:00",
  "message": "¡Feliz cumpleaños! Con mucho cariño",
  "extras": ["Globo", "Tarjeta personalizada"],
  "total": 800
}
```

**Respuesta exitosa (200)**:

```json
{
  "success": true,
  "message": "Cotización enviada exitosamente por todos los canales",
  "results": {
    "whatsapp": { "success": true, "messageId": "SM..." },
    "storeEmail": { "success": true, "messageId": "<...>" },
    "customerEmail": { "success": true, "messageId": "<...>" }
  }
}
```

---

## 🌐 Configuración del Frontend

El frontend ya está actualizado en `frontend/js/main.js`:

### **Desarrollo Local**:

```javascript
const API_URL = "http://localhost:3000/api/quotation/send";
```

### **Producción** (cuando subas a servidor):

```javascript
const API_URL = "https://api.emozioni.com/api/quotation/send";
// O tu dominio/IP del servidor
```

---

## 🔒 Seguridad Implementada

### 1. **Helmet** - Headers de seguridad HTTP

### 2. **CORS** - Solo dominios permitidos

### 3. **Rate Limiting** - Máximo 10 requests por IP cada 15 minutos

### 4. **Validación de datos** - Verifica campos obligatorios

### 5. **Variables de entorno** - Credenciales nunca en el código

---

## 📤 Deployment (Subir a Producción)

### **Opción 1: Heroku** (Gratis)

#### **1. Instalar Heroku CLI**

```bash
npm install -g heroku
```

#### **2. Login y crear app**

```bash
heroku login
cd backend
heroku create emozioni-backend
```

#### **3. Configurar variables de entorno**

```bash
heroku config:set TWILIO_ACCOUNT_SID=ACxxx...
heroku config:set TWILIO_AUTH_TOKEN=xxx...
heroku config:set EMAIL_USER=tu-email@gmail.com
heroku config:set EMAIL_PASSWORD=xxx...
# ... (todas las variables del .env)
```

#### **4. Deploy**

```bash
git add .
git commit -m "Backend de notificaciones"
git push heroku main
```

#### **5. Verificar**

```bash
heroku open
heroku logs --tail
```

---

### **Opción 2: Railway** (Más Fácil)

1. Ve a https://railway.app/
2. Conecta tu repositorio de GitHub
3. Selecciona la carpeta `backend`
4. Agrega variables de entorno en el dashboard
5. Deploy automático

---

### **Opción 3: VPS (DigitalOcean/Linode)**

#### **1. Crear Droplet Ubuntu**

#### **2. Instalar Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### **3. Subir código**

```bash
scp -r backend/ user@tu-ip:/var/www/emozioni-backend
```

#### **4. Instalar PM2** (process manager)

```bash
sudo npm install -g pm2
cd /var/www/emozioni-backend
npm install --production
pm2 start server.js --name emozioni-backend
pm2 startup
pm2 save
```

#### **5. Nginx como reverse proxy**

```nginx
server {
    listen 80;
    server_name api.emozioni.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🐛 Troubleshooting

### **Error: "CORS policy blocked"**

**Solución**: Agrega tu dominio frontend a `ALLOWED_ORIGINS` en `.env`:

```env
ALLOWED_ORIGINS=http://localhost:5500,https://emozioni.com
```

---

### **Error: "Twilio authentication failed"**

**Solución**: Verifica que:

1. `TWILIO_ACCOUNT_SID` y `TWILIO_AUTH_TOKEN` sean correctos
2. El WhatsApp Sandbox esté activo
3. Hayas enviado el código de activación desde tu WhatsApp

---

### **Error: "Email not sent"**

**Solución para Gmail**:

1. Verifica que la App Password sea correcta (16 caracteres sin espacios)
2. Activa "Verificación en 2 pasos" en tu cuenta Google
3. Intenta con otro email o usa SendGrid

---

### **Error: "Cannot connect to backend"**

**Solución**:

1. Verifica que el backend esté corriendo: `npm run dev`
2. Checa el puerto: `http://localhost:3000/api/health`
3. Revisa CORS en navegador (F12 → Console)

---

## 📊 Monitoreo

### **Logs en tiempo real**:

```bash
# Desarrollo
npm run dev

# Producción con PM2
pm2 logs emozioni-backend
```

### **Métricas**:

- Twilio Dashboard: https://console.twilio.com/
- SendGrid Dashboard: https://app.sendgrid.com/
- Logs del servidor en `console.log()`

---

## 💰 Costos Estimados

### **Desarrollo (Gratis)**:

- Twilio Sandbox: $0 (limitado)
- Gmail: $0 (500 emails/día)
- Heroku/Railway: $0 (tier gratuito)

### **Producción (Mínimo Viable)**:

- Twilio WhatsApp: ~$25 USD/mes
- SendGrid Free: $0 (100 emails/día)
- Railway Pro: ~$5 USD/mes
- **Total**: ~$30 USD/mes

### **Producción (Profesional)**:

- Twilio WhatsApp: ~$25 USD/mes
- SendGrid Essentials: $20 USD/mes (50K emails)
- VPS DigitalOcean: $12 USD/mes
- Dominio: $12 USD/año
- **Total**: ~$60 USD/mes

---

## 🔄 Flujo Completo

```
1. Cliente llena formulario en emozioni.com
   ↓
2. Frontend envía POST a http://localhost:3000/api/quotation/send
   ↓
3. Backend recibe datos y ejecuta 3 servicios simultáneamente:
   ├─ WhatsApp Service → Twilio API → WhatsApp del dueño
   ├─ Email Service → Gmail/SendGrid → Email del dueño
   └─ Email Service → Gmail/SendGrid → Email del cliente
   ↓
4. Backend responde con resultado (success/partial/error)
   ↓
5. Frontend muestra modal de éxito + confetti
```

---

## ✨ Próximas Mejoras

- [ ] Panel de administración (ver todas las cotizaciones)
- [ ] Base de datos (guardar historial)
- [ ] Estadísticas y reportes
- [ ] Notificaciones push
- [ ] Integración con Google Calendar (reservar fecha)
- [ ] Pasarela de pago (cobrar anticipo)
- [ ] Chat en vivo

---

## 📞 Soporte

**Desarrollador**: Daniel V (@DanielV-94)  
**Repositorio**: [Emoziony-GDL](https://github.com/DanielV-94/Emoziony-GDL)  
**Email**: hola@emozioni.com

---

## 📄 Licencia

© 2025 Emozioni. Todos los derechos reservados.

---

**¡Tu sistema de notificaciones automáticas está listo! 🚀**
