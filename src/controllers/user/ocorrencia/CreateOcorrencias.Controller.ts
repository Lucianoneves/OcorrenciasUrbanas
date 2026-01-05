import prisma from '../../../prisma';
import  {Request, Response} from 'express';
import { CreateOcorrenciasService } from '../../../serves/ocorrencias/CreateOcorrencias.Service';
import { Categoria } from '../../../generated/prisma/browser';





class CreateOcorrenciasController  {
    async handle(req: Request, res: Response)  {
        const {titulo, descricao, categoriaId} = req.body;

        if(!req.file){
            throw new Error("Nenhum arquivo foi enviado.")
        }

        const createOcorrencias = new CreateOcorrenciasService();

        const ocorrencia = await createOcorrencias.execute({
            titulo,
            descricao,
            categoriaId,
            imageBuffer: req.file.buffer,
            imagens: req.file.originalname,
        });
           

         res.json(ocorrencia)


        }
    }
        
    export { CreateOcorrenciasController }
          







           

            
        

    

       

     


