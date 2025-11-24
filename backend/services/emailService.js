// ============================================
// EMAIL SERVICE
// Envía correos usando Nodemailer o SendGrid
// ============================================

const nodemailer = require('nodemailer');

/**
 * Configurar transporter de email
 * Soporta Gmail, SendGrid, Brevo, etc.
 */
function createEmailTransporter() {
  // Opción 1: Gmail (Desarrollo)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD // App Password de Gmail
      }
    });
  }

  // Opción 2: SendGrid (Producción - Recomendado)
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  // Opción 3: Brevo (Alternativa gratuita)
  if (process.env.BREVO_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.BREVO_API_KEY
      }
    });
  }

  // Fallback: configuración SMTP genérica
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
}

/**
 * Envía email al dueño de la tienda con detalles de la cotización
 */
async function sendEmailToStore(quotationData) {
  try {
    console.log('📧 Enviando email a la tienda...');

    const transporter = createEmailTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.STORE_EMAIL,
      subject: `🎁 Nueva Cotización - ${quotationData.productName}`,
      html: generateStoreEmailHTML(quotationData),
      text: generateStoreEmailText(quotationData)
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email a tienda enviado correctamente');

    return {
      success: true,
      message: 'Email a tienda enviado',
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error al enviar email a tienda:', error.message);

    return {
      success: false,
      message: 'Error al enviar email a tienda',
      error: error.message
    };
  }
}

/**
 * Envía email de confirmación al cliente
 */
async function sendEmailToCustomer(quotationData) {
  try {
    console.log('📧 Enviando email de confirmación al cliente...');

    const transporter = createEmailTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: quotationData.customerEmail,
      subject: '✅ Cotización Recibida - Emozioni',
      html: generateCustomerEmailHTML(quotationData),
      text: generateCustomerEmailText(quotationData)
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email de confirmación enviado al cliente');

    return {
      success: true,
      message: 'Email de confirmación enviado al cliente',
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error al enviar email al cliente:', error.message);

    return {
      success: false,
      message: 'Error al enviar email al cliente',
      error: error.message
    };
  }
}

// ============================================
// TEMPLATES DE EMAIL
// ============================================

/**
 * HTML email para el dueño de la tienda
 */
function generateStoreEmailHTML(data) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Cotización</title>
  <style>
    body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #56ABCF 0%, #29D5FF 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { padding: 30px; }
    .section { margin-bottom: 25px; }
    .section-title { color: #56ABCF; font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #56ABCF; padding-bottom: 5px; }
    .info-row { display: flex; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .info-label { font-weight: bold; color: #444243; width: 140px; }
    .info-value { color: #666; flex: 1; }
    .total-box { background: #f8f9fa; border-left: 4px solid #29D5FF; padding: 15px; margin: 20px 0; }
    .total-box .total { font-size: 24px; color: #56ABCF; font-weight: bold; }
    .extras-list { list-style: none; padding-left: 0; }
    .extras-list li:before { content: '✓'; color: #29D5FF; font-weight: bold; margin-right: 10px; }
    .footer { background: #444243; color: white; padding: 20px; text-align: center; font-size: 14px; }
    .message-box { background: #fff8e1; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎁 Nueva Cotización</h1>
      <p style="margin: 10px 0 0 0;">Emozioni Guadalajara</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">📦 Producto Solicitado</div>
        <div class="info-row">
          <div class="info-label">Producto:</div>
          <div class="info-value"><strong>${data.productName}</strong></div>
        </div>
        <div class="info-row">
          <div class="info-label">Precio Base:</div>
          <div class="info-value">$${data.productPrice} MXN</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🎁 Datos del Destinatario</div>
        <div class="info-row">
          <div class="info-label">Nombre:</div>
          <div class="info-value">${data.recipientName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Dirección:</div>
          <div class="info-value">${data.recipientAddress}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Teléfono:</div>
          <div class="info-value">${data.recipientPhone}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">👤 Datos del Cliente</div>
        <div class="info-row">
          <div class="info-label">Nombre:</div>
          <div class="info-value">${data.customerName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email:</div>
          <div class="info-value"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></div>
        </div>
        <div class="info-row">
          <div class="info-label">Celular:</div>
          <div class="info-value">${data.customerPhone}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Motivo:</div>
          <div class="info-value">${data.customerOccasion}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📅 Entrega</div>
        <div class="info-row">
          <div class="info-label">Fecha:</div>
          <div class="info-value">${data.deliveryDate}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Hora:</div>
          <div class="info-value">${data.deliveryTime}</div>
        </div>
      </div>

      ${data.message ? `
      <div class="section">
        <div class="section-title">💬 Mensaje Personalizado</div>
        <div class="message-box">${data.message}</div>
      </div>
      ` : ''}

      ${data.extras && data.extras.length > 0 ? `
      <div class="section">
        <div class="section-title">✨ Extras Solicitados</div>
        <ul class="extras-list">
          ${data.extras.map(extra => `<li>${extra}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div class="total-box">
        <div style="text-align: center;">
          <div style="color: #666; margin-bottom: 5px;">TOTAL DE LA COTIZACIÓN</div>
          <div class="total">$${data.total} MXN</div>
        </div>
      </div>

      <p style="text-align: center; color: #666; margin-top: 30px;">
        <strong>Fecha de solicitud:</strong> ${new Date().toLocaleString('es-MX')}
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;">Emozioni - Delivering Happiness</p>
      <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Guadalajara, Jalisco, México</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Texto plano para el dueño de la tienda (fallback)
 */
function generateStoreEmailText(data) {
  return `
🎁 NUEVA COTIZACIÓN EMOZIONI

📦 PRODUCTO: ${data.productName}
💰 Precio Base: $${data.productPrice} MXN

🎁 DESTINATARIO:
Nombre: ${data.recipientName}
Dirección: ${data.recipientAddress}
Teléfono: ${data.recipientPhone}

👤 CLIENTE:
Nombre: ${data.customerName}
Email: ${data.customerEmail}
Celular: ${data.customerPhone}
Motivo: ${data.customerOccasion}

📅 ENTREGA: ${data.deliveryDate} a las ${data.deliveryTime}

${data.message ? `💬 MENSAJE:\n${data.message}\n` : ''}

${data.extras && data.extras.length > 0 ? `✨ EXTRAS:\n${data.extras.map(e => `• ${e}`).join('\n')}\n` : ''}

💵 TOTAL: $${data.total} MXN

Fecha: ${new Date().toLocaleString('es-MX')}
  `;
}

/**
 * HTML email para el cliente (confirmación)
 */
function generateCustomerEmailHTML(data) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cotización Recibida</title>
  <style>
    body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #56ABCF 0%, #29D5FF 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; }
    .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
    .content { padding: 40px 30px; }
    .success-icon { text-align: center; font-size: 64px; margin-bottom: 20px; }
    .message { font-size: 16px; line-height: 1.6; color: #444; text-align: center; margin-bottom: 30px; }
    .info-box { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .info-box h3 { margin: 0 0 15px 0; color: #56ABCF; font-size: 18px; }
    .info-row { padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: bold; color: #444243; display: inline-block; width: 120px; }
    .info-value { color: #666; }
    .cta-button { display: inline-block; background: linear-gradient(135deg, #56ABCF 0%, #29D5FF 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; margin: 20px 0; font-weight: bold; box-shadow: 0 4px 15px rgba(86, 171, 207, 0.3); }
    .footer { background: #444243; color: white; padding: 30px; text-align: center; }
    .footer-links { margin-top: 15px; }
    .footer-links a { color: #29D5FF; text-decoration: none; margin: 0 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ ¡Cotización Recibida!</h1>
      <p>Gracias por confiar en Emozioni</p>
    </div>
    
    <div class="content">
      <div class="success-icon">🎉</div>
      
      <div class="message">
        <p><strong>Hola ${data.customerName},</strong></p>
        <p>Hemos recibido tu solicitud de cotización exitosamente. Nuestro equipo la está revisando y te contactaremos pronto para confirmar los detalles.</p>
      </div>

      <div class="info-box">
        <h3>📦 Resumen de tu Cotización</h3>
        <div class="info-row">
          <span class="info-label">Producto:</span>
          <span class="info-value">${data.productName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Destinatario:</span>
          <span class="info-value">${data.recipientName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Entrega:</span>
          <span class="info-value">${data.deliveryDate} - ${data.deliveryTime}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Total:</span>
          <span class="info-value"><strong>$${data.total} MXN</strong></span>
        </div>
      </div>

      <div style="text-align: center;">
        <p><strong>⏱️ Tiempo de respuesta estimado:</strong> 2-4 horas en horario laboral</p>
        <a href="https://wa.me/${process.env.STORE_PHONE?.replace(/\+/g, '')}" class="cta-button">
          💬 Contactar por WhatsApp
        </a>
      </div>

      <div style="background: #fff8e1; border-left: 4px solid #ffc107; padding: 15px; margin: 30px 0; border-radius: 4px;">
        <strong>📌 Importante:</strong> Para confirmar tu pedido, nos pondremos en contacto contigo por WhatsApp o teléfono. Asegúrate de tener disponible el <strong>${data.customerPhone}</strong>.
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0; font-size: 18px; font-weight: bold;">Emozioni - Delivering Happiness</p>
      <p style="margin: 10px 0; font-size: 14px;">📍 Guadalajara, Jalisco, México</p>
      <p style="margin: 5px 0; font-size: 14px;">📞 ${process.env.STORE_PHONE}</p>
      <p style="margin: 5px 0; font-size: 14px;">📧 ${process.env.STORE_EMAIL}</p>
      
      <div class="footer-links">
        <a href="https://www.instagram.com/emozioni">Instagram</a>
        <a href="https://www.facebook.com/emozioni">Facebook</a>
        <a href="https://emozioni.com">Sitio Web</a>
      </div>
      
      <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
        © ${new Date().getFullYear()} Emozioni. Todos los derechos reservados.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Texto plano para el cliente (fallback)
 */
function generateCustomerEmailText(data) {
  return `
✅ ¡COTIZACIÓN RECIBIDA!

Hola ${data.customerName},

Hemos recibido tu solicitud de cotización exitosamente. Nuestro equipo la está revisando y te contactaremos pronto.

📦 RESUMEN:
Producto: ${data.productName}
Destinatario: ${data.recipientName}
Entrega: ${data.deliveryDate} - ${data.deliveryTime}
Total: $${data.total} MXN

⏱️ Tiempo de respuesta: 2-4 horas en horario laboral

Nos pondremos en contacto al ${data.customerPhone}

---
Emozioni - Delivering Happiness
📍 Guadalajara, Jalisco, México
📞 ${process.env.STORE_PHONE}
📧 ${process.env.STORE_EMAIL}

© ${new Date().getFullYear()} Emozioni
  `;
}

module.exports = {
  sendEmailToStore,
  sendEmailToCustomer
};
