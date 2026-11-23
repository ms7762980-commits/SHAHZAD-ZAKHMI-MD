const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const config = require('./config');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('کنکشن بند ہو گیا، دوبارہ کوشش جاری ہے...', shouldReconnect);
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log(`✅ ${config.botName} کامیابی کے ساتھ لائیو ہو گیا ہے!`);
            console.log(`👑 اونر: ${config.ownerName} (${config.ownerNumber})`);
        }
    });

    sock.ev.on('creds.update', saveCreds);

    // بوٹ مینو اور کمانڈز
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (text && (text.toLowerCase() === '.menu' || text.toLowerCase() === '/menu')) {
            await sock.sendMessage(from, { 
                text: `🔥 *${config.botName}* 🔥\n\nخوش آمدید شہزاد بھائی! یہ بوٹ *${config.ownerName}* کا تیار کردہ ہے۔\n\n📌 *اونر:* ${config.ownerName}\n📌 *ڈویلپر:* ${config.developerName}\n📌 *چینل:* ${config.channelLink}` 
            });
        }
    });
}

startBot();
