import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

// Configuración conexión PostgreSQL
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "ControlDocumental", // 👈 cámbialo por el nombre real
  password: "28toby",   // 👈 tu password
  port: 5432,
});

// Endpoint de login
app.post("/login", async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND contraseña = $2",
      [usuario, contraseña]
    );

    if (result.rows.length > 0) {
      res.json({
        success: true,
        user: result.rows[0], // aquí regresa nombre, rol, empresa, id...
      });
    } else {
      res.json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend corriendo en http://localhost:${port}`);
});
