// ============================================
// WHATSAPP SERVICE
// Envía notificaciones vía WhatsApp Business API
// ============================================

const axios = require('axios');

/**
 * Envía notificación por WhatsApp al dueño de la tienda
 * Usa Twilio WhatsApp API (más fácil de configurar)
 * 
 * Alternativa: WhatsApp Business API oficial de Meta
 */
async function sendWhatsAppNotification(quotationData) {
  try {
    console.log('📱 Enviando notificación por WhatsApp...');

    // Verificar configuración
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.warn('⚠️  Credenciales de Twilio no configuradas');
      return {
        success: false,
        message: 'WhatsApp no configurado (credenciales faltantes)',
        skipped: true
      };
    }

    // Formatear mensaje
    const message = formatWhatsAppMessage(quotationData);

    // Opción 1: Twilio WhatsApp API (Recomendado)
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`;

    const response = await axios.post(
      twilioUrl,
      new URLSearchParams({
        From: process.env.TWILIO_WHATSAPP_FROM,
        To: process.env.TWILIO_WHATSAPP_TO,
        Body: message
      }),
      {
        auth: {
          username: process.env.TWILIO_ACCOUNT_SID,
          password: process.env.TWILIO_AUTH_TOKEN
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ WhatsApp enviado correctamente');

    return {
      success: true,
      message: 'Notificación WhatsApp enviada',
      messageId: response.data.sid
    };

  } catch (error) {
    console.error('❌ Error al enviar WhatsApp:', error.response?.data || error.message);

    return {
      success: false,
      message: 'Error al enviar WhatsApp',
      error: error.response?.data?.message || error.message
    };
  }
}

/**
 * Formatea el mensaje de WhatsApp con los datos de la cotización
 */
function formatWhatsAppMessage(data) {
  const {
    productName,
    productPrice,
    recipientName,
    recipientAddress,
    recipientPhone,
    customerName,
    customerEmail,
    customerPhone,
    customerOccasion,
    deliveryDate,
    deliveryTime,
    message,
    extras,
    total
  } = data;

  return `🎉 *NUEVA COTIZACIÓN EMOZIONI*

📦 *Producto:* ${productName}
💰 *Precio Base:* $${productPrice} MXN

🎁 *DESTINATARIO:*
Nombre: ${recipientName}
Dirección: ${recipientAddress}
Teléfono: ${recipientPhone}

👤 *DATOS DEL CLIENTE:*
Nombre: ${customerName}
Email: ${customerEmail}
Celular: ${customerPhone}
Motivo: ${customerOccasion}

📅 *Entrega:* ${deliveryDate} a las ${deliveryTime}

💬 *Mensaje:*
${message || 'Sin mensaje'}

${extras && extras.length > 0 ? `✨ *Extras:*\n${extras.map(e => `• ${e}`).join('\n')}` : ''}

💵 *TOTAL: $${total} MXN*

---
_Responde este mensaje para contactar al cliente_`;
}

module.exports = {
  sendWhatsAppNotification
};
