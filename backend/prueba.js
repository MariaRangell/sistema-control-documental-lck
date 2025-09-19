const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ControlDocumental',
  password: '28toby',
  port: 5432,
});

async function obtenerUsuarios() {
  try {
    await client.connect();
    console.log('Conectado a PostgreSQL');

    const res = await client.query('SELECT * FROM usuarios'); // Consulta todos los usuarios
    console.log('Usuarios en la tabla:');
    res.rows.forEach((usuario, index) => {
      console.log(`${index + 1}:`, usuario);
    });

  } catch (err) {
    console.error('Error en consulta:', err);
  } finally {
    await client.end();
    console.log('Conexión cerrada');
  }
}

obtenerUsuarios();
