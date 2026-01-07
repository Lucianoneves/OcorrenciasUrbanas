import prismaClient from "../../prisma";

interface FinishOrdemProps {
    ordenServicoId: number;
}

class FinishOrdemService {
    async execute({ ordenServicoId }: FinishOrdemProps) {
        try {

            //  Verificar se ordem existe
            const ordem = await prismaClient.ordenServico.findFirst({
                where: {
                    id: ordenServicoId
                }
            })

            if (!ordem) {
                throw new Error("Ordem não encontrada");
            }

            //Atualiza o status para CONCLUIDA
            const updateOrder = await prismaClient.ordenServico.update({
                where: {
                    id: ordenServicoId
                },
                data: {
                    status: "CONCLUIDA",
                },
                select: {
                    id: true,
                    name: true,
                    numero: true,
                    draft: true,
                    status: true,
                    endereco: true,
                    protocolo: true,
                    createdAt: true,
                }
            })

            // Se houver uma ocorrência vinculada, atualiza o status dela também para CONCLUIDA
            if (ordem.ocorrenciaId) {
                await prismaClient.ocorrencia.update({
                    where: {
                        id: ordem.ocorrenciaId
                    },
                    data: {
                        status: "CONCLUIDA"
                    }
                });
            }

            return updateOrder;

        } catch (err) {
            console.log(err)
            throw new Error("Erro ao finalizar ordem")
        }

    }
}

export { FinishOrdemService }
