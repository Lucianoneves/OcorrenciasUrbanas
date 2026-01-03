import prismaClient from "../../prisma/index";


interface CreateCategoryProps {
  nome?: string;
  descricao?: string;  
  description?: string;
}

class CreateCategoryService{
    async execute({ nome, descricao,  description }: CreateCategoryProps){
        const categoriaNome = nome ?? " ";
        const categoriaDescricao = descricao ?? description ?? " ";

        if (!categoriaNome) {
            throw new Error("Nome é obrigatório");
        }

        const category = await prismaClient.category.create({
            data:{
                nome: categoriaNome,
                descricao: categoriaDescricao,
            },
            select:{
                id: true,
                nome: true,
                descricao: true,
                createdAt: true,
            }
        })

        return category
    }
}

export  {CreateCategoryService}

