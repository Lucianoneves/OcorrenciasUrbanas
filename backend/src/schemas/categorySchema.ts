import { z } from "zod";


// Schema para criação de uma categoria e com mensagens personalizadas de validações
export const createCategorySchema = z.object({
  body: z.object({
    nome: z
      .string({ message: "Nome é obrigatório em texto" })
      .min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
  }),
});
