import prismaClient from "../../prisma";

interface DetailOcorrenciaRequest {
    ocorrencia_id: number;
}

class DetailOcorrenciaService {
    async execute({ ocorrencia_id }: DetailOcorrenciaRequest) {
        const ocorrencia = await prismaClient.ocorrencia.findFirst({
            where: {
                id: ocorrencia_id
            },
            include: {
                categoria: true,
                imagens: true
            }
        })

        return ocorrencia;
    }
}

export { DetailOcorrenciaService }