const db = require('../config/db');

async function criarUsuario(nome, email, senhaHash) {
  const query = `
    INSERT INTO users (nome, email, senha_hash)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email, created_at
  `;
  const values = [nome, email, senhaHash];

  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = {
  criarUsuario,
};
