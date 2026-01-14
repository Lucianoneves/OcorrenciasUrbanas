import prismaClient from "../../prisma";

interface ListOcorrenciaRequest {
    disable?: boolean;
}

class ListOcorrenciaService {
    async execute({ disable }: ListOcorrenciaRequest) {
        
        const ocorrencias = await prismaClient.ocorrencia.findMany({
            where: {
                disable: disable
            },
            select: {
                id: true,
                titulo: true,
                descricao: true,
                status: true,
                gravidade: true,
                protocolo: true,
                endereco: true,
                disable: true,
                createdAt: true,
                categoria: {
                    select: {
                        id: true,
                        nome: true
                    }
                },
                imagens: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            }
        })

        return ocorrencias;
    }
}

export { ListOcorrenciaService }
