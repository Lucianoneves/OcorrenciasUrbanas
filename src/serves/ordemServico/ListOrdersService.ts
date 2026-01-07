import prismaClient from "../../prisma";

class ListOrdersService {
    async execute(p0: { status: string | undefined; }) {
        const ordens = await prismaClient.ordenServico.findMany({
            select: {
                id: true,
                numero: true,
                name: true,
                protocolo: true,
                endereco: true,
                status: true,
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
