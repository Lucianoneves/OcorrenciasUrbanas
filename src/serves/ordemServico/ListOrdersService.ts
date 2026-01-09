import prismaClient from "../../prisma";

interface ListOrdersRequest {
  status?: string;
  disable?: boolean;
}

class ListOrdersService {
    async execute({ status, disable }: ListOrdersRequest) {
        const ordens = await prismaClient.ordenServico.findMany({
            where: {
                // Se status for fornecido, filtra por ele.
                // Precisamos garantir que o tipo do status bata com o enum se for strict, 
                // mas como string ele passa se o valor for válido.
                status: status ? status as any : undefined, 
                disable: disable
            },
            select: {
                id: true,
                numero: true,
                name: true,
                protocolo: true,
                endereco: true,
                status: true,
                disable: true,
                createdAt: true,
                ocorrencia: {
                    select: {
                        id: true,
                        titulo: true,
                        descricao: true,
                        gravidade: true, 
                        status: true,
                        endereco: true,
                        imagens: {
                            select: {
                                id: true,
                                url: true
                            }
                        }
                    }
                }
            }
        });

        return ordens;
    }
}

export { ListOrdersService }
