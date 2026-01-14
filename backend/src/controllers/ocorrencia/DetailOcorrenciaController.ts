import { Request, Response } from 'express';
import { DetailOcorrenciaService } from '../../serves/ocorrencias/DetailOcorrenciaService';

class DetailOcorrenciaController {
    async handle(req: Request, res: Response) {
        const ocorrencia_id = req.query.ocorrencia_id as string;

        const detailOcorrenciaService = new DetailOcorrenciaService();

        const ocorrencia = await detailOcorrenciaService.execute({
            ocorrencia_id: Number(ocorrencia_id)
        })

        return res.json(ocorrencia);

    }
}

export { DetailOcorrenciaController }