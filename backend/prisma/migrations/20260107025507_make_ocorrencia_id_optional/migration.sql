-- DropForeignKey
ALTER TABLE "OrdenServico" DROP CONSTRAINT "OrdenServico_ocorrenciaId_fkey";

-- AlterTable
ALTER TABLE "OrdenServico" ALTER COLUMN "ocorrenciaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrdenServico" ADD CONSTRAINT "OrdenServico_ocorrenciaId_fkey" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
