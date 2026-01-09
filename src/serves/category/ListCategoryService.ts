import prismaClient from "../../prisma/index";

class ListCategoryService {
    async execute() {
        const categories = await prismaClient.categoria.findMany({
            select: {
                id: true,
                nome: true,
                descricao: true,
                createdAt: true,
            }
        });

        return categories;
    
    }
}

export { ListCategoryService };
