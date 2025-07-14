const bcrypt = require('bcrypt');
const { criarUsuario } = require('../models/userModel');

async function register(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await criarUsuario(nome, email, senhaHash);
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro no registro:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

module.exports = {
  register,
};
