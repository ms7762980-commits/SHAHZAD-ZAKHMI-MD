const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html lang="ur" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>زخمی 007 بوٹ - اسٹیٹس</title>
        <style>
            body {
                background-color: #0d1117;
                color: #00ffcc;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;
                padding: 50px 20px;
            }
            .card {
                background: rgba(22, 27, 34, 0.9);
                border: 2px solid #00ffcc;
                border-radius: 15px;
                padding: 30px;
                max-width: 400px;
                margin: auto;
                box-shadow: 0 0 20px rgba(0, 255, 204, 0.4);
            }
            h1 { color: #ff0055; font-size: 26px; text-shadow: 0 0 10px rgba(255, 0, 85, 0.5); }
            p { font-size: 16px; color: #ffffff; }
            .status {
                display: inline-block;
                background: #00ffcc;
                color: #0d1117;
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: bold;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🔥 زخمی 007 بوٹ 🔥</h1>
            <p>سرور کامیابی سے آن لائن ہے اور ڈپلয় ہو چکا ہے!</p>
            <div class="status">● اسٹیٹس: ایکٹو (Active)</div>
        </div>
    </body>
    </html>
  `);
});

// Vercel کے لیے پورٹ سیٹنگ
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
