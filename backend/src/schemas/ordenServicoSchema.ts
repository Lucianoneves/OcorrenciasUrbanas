import { z } from "zod";


// Esquema para criar ordem de serviço
export const createOrdenServicoSchema = z.object({
  body: z.object({
    numero: z.number({ message: "O número da ordem é obrigatório" }).int().positive("O número deve ser positivo"),
    name: z.string({ message: "O nome é obrigatório" }).min(1, "O nome não pode ser vazio"),
    ocorrenciaId: z.number({ message: "O ID da ocorrência é obrigatório" }).int().positive("O ID da ocorrência deve ser válido")
  })
}); 


// Esquema para remover ocorrência de ordem de serviço
export const removeOcorrenciaFromOrdemSchema = z.object({
  body: z.object({
    numero: z.number({ message: "O número da ordem é obrigatório" }).int().positive("O número deve ser positivo"),
    ocorrenciaId: z.number({ message: "O ID da ocorrência é obrigatório" }).int().positive("O ID da ocorrência deve ser válido")
  })
});

// Esquema para detalhar ordem de serviço
export const detailOrdenServicoSchema = z.object({
  query: z.object({
    ordenServicoId: z.string({ message: "O ID da ordem é obrigatório" }).transform((val) => Number(val))
  })
});


// Esquema para enviar ordem de serviço
export const sendOrdenServicoSchema = z.object({
  body: z.object({
    name: z.string({ message: "O nome é obrigatório" }).min(1, "O nome não pode ser vazio"),
    ordenServicoId: z.number({ message: "O ID da ordem é obrigatório" }).int().positive("O ID da ordem deve ser válido")
  })
});


export const finishOrdenServicoSchema = z.object({
  body: z.object({
    ordenServicoId: z.number({ message: "O ID da ordem é obrigatório" }).int().positive("O ID da ordem deve ser válido")
  })
});


export const deleteOrdenServicoSchema = z.object({
  query: z.object({
    ordenServicoId: z.string({ message: "O ID da ordem é obrigatório" }).transform((val) => Number(val))
  })
});
