import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        nome: z.
        string({message: "Nome é obrigatório em texto"})
        .min(2, {message: "Nome deve ter no mínimo 2 caracteres"}),
    }),
});
