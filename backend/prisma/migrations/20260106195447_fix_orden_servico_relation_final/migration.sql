-- CreateTable
CREATE TABLE "OrdenServico" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "protocolo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL DEFAULT '',
    "status" "StatusOcorrencia" NOT NULL DEFAULT 'PENDENTE',
    "ocorrenciaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrdenServico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrdenServico_protocolo_key" ON "OrdenServico"("protocolo");

-- AddForeignKey
ALTER TABLE "OrdenServico" ADD CONSTRAINT "OrdenServico_ocorrenciaId_fkey" FOREIGN KEY ("ocorrenciaId") REFERENCES "ocorrencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
