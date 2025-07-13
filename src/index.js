const express = require('express');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'Conectado ao banco!', hora: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao conectar no banco' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
