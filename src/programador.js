const cron = require('node-cron');
const { enviarMensaje } = require('./mensaje.js');

// Mensajes del recordatorio
const MENSAJE_INICIO_TURNO = '¡Hola! La lavadora está disponible. Recuerda que tienes 48 horas (2 días) para lavar, secar y bajar tu ropa del tendedero para dejarlo libre para los demás.';
const MENSAJE_AVISO_VENCIMIENTO = '¡Atención! Faltan 3 horas para que tu turno de la lavadora termine. Por favor, retira tu ropa para dejar el espacio libre.';

// Tareas para el inicio del turno, con 42 horas de diferencia entre cada una
const TAREAS_INICIO_TURNO = [
    {
        numero: '573103212134@c.us',
        tiempo: '0 0 9 * * 1', // Lunes a las 9:00 AM
    },
    {
        numero: '573138883232@c.us',
        tiempo: '0 0 3 * * 3', // Miércoles a las 3:00 AM
    },
    {
        numero: '573228765432@c.us',
        tiempo: '0 0 21 * * 4', // Jueves a las 9:00 PM
    },
    {
        numero: '573215678910@c.us',
        tiempo: '0 0 15 * * 6', // Sábado a las 3:00 PM
    },
];

// Tareas para el aviso de vencimiento (3 horas antes del inicio del siguiente turno)
const TAREAS_AVISO_VENCIMIENTO = [
    {
        numero: '573103212134@c.us',
        tiempo: '0 0 6 * * 1', // Lunes a las 6:00 AM
    },
    {
        numero: '573138883232@c.us',
        tiempo: '0 0 0 * * 2', // Martes a las 12:00 AM (medianoche)
    },
    {
        numero: '573228765432@c.us',
        tiempo: '0 0 18 * * 4', // Jueves a las 6:00 PM
    },
    {
        numero: '573215678910@c.us',
        tiempo: '0 0 12 * * 6', // Sábado a las 12:00 PM (mediodía)
    },
];

function programador_tareas(cliente) {
    console.log('Iniciando programación de recordatorios de lavadora...');
    
    // Bucle para programar los recordatorios de inicio de turno
    TAREAS_INICIO_TURNO.forEach(tarea => {
        const { numero, tiempo } = tarea;
        if (cron.validate(tiempo)) {
            cron.schedule(tiempo, async () => {
                try {
                    await enviarMensaje(cliente, numero, MENSAJE_INICIO_TURNO);
                    console.log(`Recordatorio de inicio de turno enviado a ${numero}.`);
                } catch (error) {
                    console.error(`Error al enviar recordatorio a ${numero}:`, error);
                }
            });
            console.log(`Tarea de inicio de turno programada para ${numero}: ${tiempo}`);
        } else {
            console.error(`Error: El horario de inicio de turno para ${numero} es inválido: ${tiempo}`);
        }
    });

    // Bucle para programar los recordatorios de aviso de vencimiento
    TAREAS_AVISO_VENCIMIENTO.forEach(tarea => {
        const { numero, tiempo } = tarea;
        if (cron.validate(tiempo)) {
            cron.schedule(tiempo, async () => {
                try {
                    await enviarMensaje(cliente, numero, MENSAJE_AVISO_VENCIMIENTO);
                    console.log(`Aviso de vencimiento enviado a ${numero}.`);
                } catch (error) {
                    console.error(`Error al enviar aviso de vencimiento a ${numero}:`, error);
                }
            });
            console.log(`Tarea de aviso de vencimiento programada para ${numero}: ${tiempo}`);
        } else {
            console.error(`Error: El horario de aviso de vencimiento para ${numero} es inválido: ${tiempo}`);
        }
    });
}

module.exports = {
    programador_tareas,
};