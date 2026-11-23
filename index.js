const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ٹیلی گرام بوٹ ٹوکن
const BOT_TOKEN = '9208160776:AAGCJTTVQSJ45UgBGAo23tPKc8uayuQuRsI';

app.use(express.json());

// ہوم پیج پر ویلکم میسج یا پیئرنگ انٹرفیس دکھانے کے لیے
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Shahzad Zakhmi Bot 007</title>
                <style>
                    body { background-color: #0f172a; color: #fff; font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
                    .card { background: #1e293b; padding: 30px; border-radius: 15px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }
                    h1 { color: #f43f5e; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Shahzad Zakhmi MD / Bot 007</h1>
                    <p>✨ Your Bot Server is Live & Running Successfully! ✨</p>
                    <p>Telegram Bot Token Connected Securely.</p>
                </div>
            </body>
        </html>
    `);
});

// ٹیلی گرام کی طرف سے آنے والے میسجز کو ہینڈل کرنے کے لیے ویب ہک (Webhook)
app.post(`/bot${BOT_TOKEN}`, (req, res) => {
    const update = req.body;
    
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        // اگر کوئی /start لکھے تو یہ جواب دے گا
        if (text === '/start') {
            const replyMessage = "مرحبا! شہزاد زخمی بوٹ 007 فعال ہو چکا ہے۔ آپ کو کیسی مدد چاہیے؟";
            // یہاں آپ ٹیلی گرام API کے ذریعے رسپانس بھیج سکتے ہیں
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
