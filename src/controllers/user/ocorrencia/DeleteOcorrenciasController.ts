import { Request, Response } from 'express';
import { DeleteOcorrenciasService } from '../../../serves/ocorrencias/DeleteOcorrenciasService';

class DeleteOcorrenciasController {
    async handle(req: Request, res: Response) {

        const  id = Number(req.params.id);
        
        console.log("Delete Controller - Params:", req.params);
        console.log("Delete Controller - Query:", req.query);
        console.log("Delete Controller - Body:", req.body);

        if (isNaN(id)) {
             return res.status(400).json({ error: "Ocorrência ID é obrigatório nos parâmetros da rota." });
        }

        const deleteOcorrencias = new DeleteOcorrenciasService();

        try {
            const deleteMessage = await deleteOcorrencias.execute({ 
                ocorrenciaId: id,
            });

            return res.status(200).json(deleteMessage);
        } catch (err: any) {
            return res.status(400).json({
                error: err.message
            });
        }
    }
}

export { DeleteOcorrenciasController }
