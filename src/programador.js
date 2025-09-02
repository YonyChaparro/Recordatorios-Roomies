const cron = require('node-cron');
const { enviarMensaje } = require('./mensaje.js');

const MSG_SALUDOS = [
    'Hola grupo 👋, este es un mensaje automático enviado desde WhatsApp de Yony',
    '¡Qué tal grupo! 🚀 Este es un recordatorio automático',
    'Saludos 👨‍💻, este es un mensaje automático para el grupo',
];

function programador_tareas(cliente, grupoId) {
    const tiempo = '0 51 23 * * *'; // Todos los días a las 23:35
    if (cron.validate(tiempo)) {
        console.log('⏰ Cron inicializado');
        cron.schedule(tiempo, async () => {
            try {
                const saludo = MSG_SALUDOS[Math.floor(Math.random() * MSG_SALUDOS.length)];
                await enviarMensaje(cliente, grupoId, saludo);
                console.log('✅ Mensaje enviado al grupo');
            } catch (error) {
                console.log('❌ Error en cron', error);
            }
        });
    }
}

module.exports = {
    programador_tareas,
};
