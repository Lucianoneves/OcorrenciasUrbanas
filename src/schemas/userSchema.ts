import { z } from 'zod';

export const createUserSchema = z.object({ // define o schema de validação para a criação de um usuário
    body: z.object({
      name: z.string().min(3,{message: 'Nome deve ter pelo menos 3 caracteres'}),
      email: z.string().email({message: 'Precisa ser um email válido'}),
      password: z.string().min(6,{message: 'Senha deve ter pelo menos 6 caracteres'}),
    }),
  });



  export const authUserSchema= z.object({
    body: z.object({
      email: z.string().email({message: 'Precisa ser um email válido'}),
      password: z.string().min(6,{message: 'Senha deve ter pelo menos 6 caracteres'}),
    })
  })
