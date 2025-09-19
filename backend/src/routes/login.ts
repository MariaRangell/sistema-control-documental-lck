import express from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint de inicio de sesión - CORREGIDO PARA PRISMA
router.post('/api/login', async (req, res) => {
  // Aceptar tanto 'contraseña' como 'contrasena' para compatibilidad
  const { usuario, contraseña, contrasena } = req.body;
  const password = contraseña || contrasena;

  if (!usuario || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Debe enviar usuario y contraseña' 
    });
  }

  try {
    // Buscar el usuario en la base de datos usando Prisma
    const user = await prisma.usuarios.findUnique({
      where: {
        usuario: usuario
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.contraseña);

    if (!validPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Respuesta exitosa - FORMATO CORREGIDO para compatibilidad con frontend
    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        usuario: user.usuario,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// Verificación de código (para compatibilidad con tu frontend)
router.post('/api/verify-code', (req, res) => {
  const { code } = req.body;
  res.json({ success: code === "1234" });
});

// Ruta para obtener usuarios usando Prisma
router.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.usuarios.findMany({
      select: {
        id: true,
        usuario: true,
        correo: true,
        rol: true,
        createdAt: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    // Mapear para compatibilidad con el frontend
    const mappedUsers = users.map(user => ({
      id: user.id,
      name: user.usuario,
      email: user.correo || '',
      role: user.rol || 'user',
      status: 'active',
      lastLogin: user.createdAt?.toISOString().slice(0, 16).replace('T', ' ') || ''
    }));

    res.json(mappedUsers);
  } catch (error) {
    console.error('❌ /api/users:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

export default router;