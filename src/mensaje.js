async function enviarMensaje(cliente, destino, mensaje) {
    try {
        let chatId;

        if (destino.endsWith('@g.us')) {
            // Es un grupo
            chatId = destino;
        } else {
            // Es un contacto individual
            chatId = destino.includes('@s.whatsapp.net')
                ? destino
                : `${destino}@s.whatsapp.net`;
        }

        await cliente.sendMessage(chatId, mensaje);
        console.log(`📩 Mensaje enviado a ${chatId}`);
    } catch (error) {
        console.error("❌ Error enviando mensaje:", error);
    }
}

module.exports = { enviarMensaje };
