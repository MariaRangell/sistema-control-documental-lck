import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario administrador
  const passwordHash = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@lck.com' },
    update: {},
    create: {
      email: 'admin@lck.com',
      password: passwordHash,
      nombre: 'Administrador',
      apellido: 'Sistema',
      rol: 'admin',
    },
  });

  // Crear categorías por defecto
  const categorias = [
    {
      nombre: 'Contratos',
      descripcion: 'Documentos relacionados con contratos legales',
    },
    {
      nombre: 'Facturas',
      descripcion: 'Documentos de facturación',
    },
    {
      nombre: 'Recursos Humanos',
      descripcion: 'Documentos del departamento de RRHH',
    },
  ];

  for (const categoria of categorias) {
    await prisma.categoria.upsert({
      where: { nombre: categoria.nombre },
      update: {},
      create: categoria,
    });
  }

  console.log('Base de datos inicializada correctamente');
}

main()
  .catch((e) => {
    console.error('Error al inicializar la base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 