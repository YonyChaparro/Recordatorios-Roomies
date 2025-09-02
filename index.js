const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { programador_tareas } = require('./src/programador.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📲 Escanea este código QR con WhatsApp');
});

client.on('ready', async () => {
    console.log('✅ Cliente listo');

    // Usamos directamente el ID del grupo
    const grupoId = "120363420327657169@g.us";
    console.log(`📌 Enviando mensajes automáticos al grupo con ID: ${grupoId}`);

    programador_tareas(client, grupoId);
});

client.initialize();
