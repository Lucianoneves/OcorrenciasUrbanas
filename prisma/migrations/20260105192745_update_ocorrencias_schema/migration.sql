/*
  Warnings:

  - You are about to drop the column `criadorId` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoId` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `ocorrencias` table. All the data in the column will be lost.
  - You are about to drop the `enderecos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ocorrencias" DROP CONSTRAINT "ocorrencias_criadorId_fkey";

-- DropForeignKey
ALTER TABLE "ocorrencias" DROP CONSTRAINT "ocorrencias_enderecoId_fkey";

-- AlterTable
ALTER TABLE "ocorrencias" DROP COLUMN "criadorId",
DROP COLUMN "enderecoId",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "endereco" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "enderecos";

-- CreateTable
CREATE TABLE "admins" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
