import prismaClient from "../../prisma";

interface RemoveProps {
    numero: number;
    ocorrenciaId: number;
}

class RemoveOcorrenciaFromOrdemService {
    async execute({ numero, ocorrenciaId }: RemoveProps) {
        if (!Number.isInteger(numero) || !Number.isInteger(ocorrenciaId) || numero <= 0 || ocorrenciaId <= 0) {
            throw new Error("Parâmetros inválidos");
        }

        const ocorrencia = await prismaClient.ocorrencia.findUnique({
            where: { id: ocorrenciaId }
        });

        if (!ocorrencia) {
            throw new Error("Ocorrência não encontrada");
        }

        const result = await prismaClient.ordenServico.deleteMany({
            where: { numero, ocorrenciaId }
        });

        return { deletedCount: result.count };
    }
}

export { RemoveOcorrenciaFromOrdemService }
