import prismaClient from "../../prisma";

interface ListOcorrenciasByCategoryRequest {
    categoryId: number;
}

class ListOcorrenciasByCategoryService {
    async execute({ categoryId }: ListOcorrenciasByCategoryRequest) {
        try {
            const ocorrencias = await prismaClient.ocorrencia.findMany({
                where: {
                    categoriaId: categoryId,
                    disable: false
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

        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message);
            }
            throw new Error("Erro ao listar ocorrências por categoria");
        }
    }
}

export { ListOcorrenciasByCategoryService }
