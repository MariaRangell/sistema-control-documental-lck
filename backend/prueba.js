const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ControlDocumental',
  password: '28toby',
  port: 5432,
});

async function testConexion() {
  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');

    const res = await client.query('SELECT NOW()');
    console.log('Fecha y hora actual:', res.rows[0]);

  } catch (err) {
    console.error('Error en conexión o consulta:', err);
  } finally {
    await client.end();
    console.log('Conexión cerrada');
  }
}

testConexion();
