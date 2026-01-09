import { z } from "zod";


// Schema para criação de uma ocorrência e com mensagens personalizadas de validações das ocorrências
export const createOcorrenciaSchema = z.object({
  body: z.object({
    titulo: z.string().min(2, { message: "O titulo da ocorrencia é obrigatório" }),
    descricao: z.string().min(2, { message: "A descrição da ocorrencia é obrigatória" }),
    endereco: z.string().min(2, { message: "O endereco da ocorrencia é obrigatório" }),

  }),
});

export const listOcorrenciaSchema = z.object({
  query: z.object({
    disable: z.string().optional().refine((value) => {
      if (!value) return true; // Se não for passado, é válido (opcional)
      return value === 'true' || value === 'false';
    }, {
      message: "O parâmetro disable deve ser 'true' ou 'false'"
    })
  })
});



export const listOcorrenciasCategorySchema = z.object({
  query: z.object({
    categoryId: z
      .string({ message: "O ID da categoria deve ser um número válido" })

  }),
});

