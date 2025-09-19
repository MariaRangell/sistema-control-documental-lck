import { PrismaClient } from '@prisma/client';

// Crear instancia única de Prisma
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Para debugging
});

// Verificar conexión al iniciar
prisma.$connect()
  .then(() => {
    console.log('✅ Conexión exitosa a la base de datos con Prisma');
  })
  .catch((err) => {
    console.error('❌ Error al conectar con Prisma:', err);
  });

export default prisma;