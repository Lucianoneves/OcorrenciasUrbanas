import prismaClient from "../../prisma";

interface DetailOrdemRequest {
    ordenServicoId: number;
}

class DetailOrdemServicoService {
    async execute({ ordenServicoId }: DetailOrdemRequest) {
        
        const ordem = await prismaClient.ordenServico.findFirst({
            where: {
                id: ordenServicoId
            },
            include: {
                ocorrencia: {
                    include: {
                        imagens: true,
                        categoria: true,
                    }
                }
            }
        })

        if (!ordem) {
            throw new Error("Ordem não encontrada");
        }

        return ordem;
    }
}

export { DetailOrdemServicoService }
