const express = require('express');
const cors = require('cors');  // CORS modülünü ekleyin
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());  // 3000 numaralı porta izin veriyoruz
app.use('/dergiler', express.static('dergiler'));  // Statik dosyaları sunuyoruz

// PDF dosyalarını almak için bir endpoint oluşturuyoruz
app.get('/api/pdfs', (req, res) => {
    const uploadsDir = path.join(__dirname, 'dergiler');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Dosyalar alınamadı' });
        }
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.json(pdfFiles);
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
