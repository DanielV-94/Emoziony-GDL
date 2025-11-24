// ============================================
// QUOTATION CONTROLLER
// Maneja el flujo completo de notificaciones
// ============================================

const { sendWhatsAppNotification } = require('../services/whatsappService');
const { sendEmailToStore, sendEmailToCustomer } = require('../services/emailService');

/**
 * Procesa una cotización y envía notificaciones simultáneas
 * @route POST /api/quotation/send
 */
async function sendQuotationNotifications(req, res) {
  try {
    console.log('📨 Nueva solicitud de cotización recibida');

    // Validar datos recibidos
    const quotationData = req.body;

    if (!quotationData || !quotationData.customerEmail || !quotationData.customerName) {
      return res.status(400).json({
        success: false,
        message: 'Datos de cotización incompletos. Se requiere email y nombre del cliente.'
      });
    }

    console.log('✅ Datos validados:', {
      producto: quotationData.productName,
      cliente: quotationData.customerName,
      total: quotationData.total
    });

    // Ejecutar los 3 flujos de manera asíncrona (simultánea)
    const [whatsappResult, storeEmailResult, customerEmailResult] = await Promise.allSettled([
      sendWhatsAppNotification(quotationData),
      sendEmailToStore(quotationData),
      sendEmailToCustomer(quotationData)
    ]);

    // Analizar resultados
    const results = {
      whatsapp: whatsappResult.status === 'fulfilled' ? whatsappResult.value : { success: false, error: whatsappResult.reason },
      storeEmail: storeEmailResult.status === 'fulfilled' ? storeEmailResult.value : { success: false, error: storeEmailResult.reason },
      customerEmail: customerEmailResult.status === 'fulfilled' ? customerEmailResult.value : { success: false, error: customerEmailResult.reason }
    };

    // Verificar cuántos flujos fueron exitosos
    const successCount = Object.values(results).filter(r => r.success).length;

    console.log(`📊 Resultados: ${successCount}/3 notificaciones enviadas exitosamente`);
    console.log('📱 WhatsApp:', results.whatsapp.success ? '✅' : '❌');
    console.log('📧 Email Tienda:', results.storeEmail.success ? '✅' : '❌');
    console.log('📧 Email Cliente:', results.customerEmail.success ? '✅' : '❌');

    // Responder al cliente
    if (successCount === 3) {
      return res.status(200).json({
        success: true,
        message: 'Cotización enviada exitosamente por todos los canales',
        results: results
      });
    } else if (successCount > 0) {
      return res.status(207).json({ // 207 Multi-Status
        success: true,
        message: `Cotización enviada parcialmente (${successCount}/3 canales)`,
        results: results,
        warning: 'Algunos canales de notificación fallaron'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error al enviar notificaciones en todos los canales',
        results: results
      });
    }

  } catch (error) {
    console.error('❌ Error en sendQuotationNotifications:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno al procesar la cotización',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = {
  sendQuotationNotifications
};
