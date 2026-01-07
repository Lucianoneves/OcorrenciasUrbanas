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

        // Verifica se existem ordens com esse numero e ocorrenciaId
        const ordens = await prismaClient.ordenServico.findMany({
            where: {
                numero: numero,
                ocorrenciaId: ocorrenciaId
            }
        });

        if (ordens.length === 0) {
            throw new Error("Nenhuma ocorrencia encontrada com este id vinculada a esta ordem.");
        }

        // Desvincula a ocorrência da ordem de serviço (seta ocorrenciaId para null)
        const result = await prismaClient.ordenServico.updateMany({
            where: { numero, ocorrenciaId },
            data: {
                ocorrenciaId: null
            }
        });

        return { modifiedCount: result.count };
    }
}

export { RemoveOcorrenciaFromOrdemService }
