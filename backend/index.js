const { Client } = require('pg');

// Configuración de conexión
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ControlDocumental',
  password: '28toby',
  port: 5432,  // puerto por defecto de PostgreSQL
});

async function conectarYConsultar() {
  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');

    const res = await client.query('SELECT NOW()'); // consulta simple
    console.log('Fecha y hora actual:', res.rows[0]);

  } catch (err) {
    console.error('Error al conectar o consultar:', err);
  } finally {
    await client.end();
    console.log('Conexión cerrada');
  }
}

conectarYConsultar();
