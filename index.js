const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', async (req, res) => {
    try {
        const { zone, period, datestart, dateend } = req.query;
        if (!zone) return res.send("Server Aktif. Sila masukkan parameter.");

        let url = `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&zone=${zone}&period=${period}`;
        if (period === 'duration') {
            url += `&datestart=${datestart}&dateend=${dateend}`;
        }

        // TAMBAHKAN CONFIG INI
        const response = await axios.get(url, {
            timeout: 15000, // Tunggu 15 saat
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Ralat JAKIM:", error.message);
        res.status(500).json({ 
            status: "Error", 
            message: "JAKIM Timeout / Sekat Akses. Cuba lagi.",
            detail: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan kat port ${PORT}`));
