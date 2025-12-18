const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// Kita guna laluan utama "/" supaya tak pusing lagi
app.get('/', async (req, res) => {
    try {
        const { zone, period, datestart, dateend } = req.query;
        
        // Jika orang saja-saja buka link tanpa parameter
        if (!zone) {
            return res.send("Server Solatku Aktif! Sila masukkan parameter.");
        }

        let url = `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&zone=${zone}&period=${period}`;
        
        if (period === 'duration') {
            url += `&datestart=${datestart}&dateend=${dateend}`;
        }

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan kat port ${PORT}`));
