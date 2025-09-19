-- CreateTable
CREATE TABLE "usuarios" (
    "nombre" VARCHAR(25),
    "rol" VARCHAR(25),
    "usuario" VARCHAR(25),
    "contraseña" VARCHAR(25),
    "empresa" VARCHAR(25),
    "id" SERIAL NOT NULL,
    "correo" VARCHAR(100),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);
