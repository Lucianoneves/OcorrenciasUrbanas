import prismaClient from "../../prisma";


interface SendOrdemProps {
    name: string;
    ordenServicoId: number;
}

class SendOrdemService {
    async execute({ name, ordenServicoId }: SendOrdemProps) {
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


            //Atualiza a propriedade Draft 
            const updateOrder = await prismaClient.ordenServico.update({
                where: {
                    id: ordenServicoId
                },
                data: {
                    draft: false,  // ordem emviada para exexução  True = ordem em execução  e     false = ordem  recebida e aguardando execução
                    name: name
                },
                select: {
                    id: true,
                    name: true,
                    draft: true,
                    status: true,
                    endereco: true,
                    protocolo: true,
                    createdAt: true,
                }
            })

            return updateOrder;

        } catch (err) {
            console.log(err)
            throw new Error("Erro ao enviar ordem")
        }

    }
}

export { SendOrdemService }