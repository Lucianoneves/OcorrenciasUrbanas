import prismaClient from "../../prisma/index";


interface DeleteOcorrenciasServiceProps{
    ocorrenciaId: number;
}

class DeleteOcorrenciasService {
    async execute({ ocorrenciaId }: DeleteOcorrenciasServiceProps) {
      try{
        await prismaClient.ocorrencia.update({
            where: {
                id: Number(ocorrenciaId),
            },
            data: {
                disable: true
            }
        })
      

      return {message: "Ocorrência excluída com sucesso"}
        }catch (err: any) {
            console.log(err)
            throw new Error(`Erro ao excluir ocorrência: ${err.message}`);
        }
    }
}

export { DeleteOcorrenciasService }
