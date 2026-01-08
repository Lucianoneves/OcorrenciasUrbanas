import prismaClient from "../../prisma";

interface DeleteOrdemProps {
    ordenServicoId: number;
}

class DeleteOrdemService {
    async execute({ ordenServicoId }: DeleteOrdemProps) {
        try {

            //  Verificar se ordem existe
            const ordem = await prismaClient.ordenServico.findFirst({
                where: {
                    id: ordenServicoId
                }
            })

            if (!ordem) {
                throw new Error("Falha ao deletar ordem");
            }

            //Deletar Ordem
            await prismaClient.ordenServico.delete({
                where: {
                    id: ordenServicoId
                }
            })


            return { message: "Ordem deletada com sucesso" };

        } catch (err) {
            console.log(err)
            throw new Error("Erro ao deletar ordem")
        }

    }
}

export { DeleteOrdemService }




