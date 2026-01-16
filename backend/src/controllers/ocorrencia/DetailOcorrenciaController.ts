import { Request, Response } from 'express';
import { DetailOcorrenciaService } from '../../serves/ocorrencias/DetailOcorrenciaService';

class DetailOcorrenciaController {
    async handle(req: Request, res: Response) {
        const ocorrencia_id = req.query.ocorrencia_id as string | undefined;

        if (!ocorrencia_id) {
            return res.status(400).json({ error: "ID da ocorrência é obrigatório" });
        }

        const idNumber = Number(ocorrencia_id);

        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ error: "ID da ocorrência inválido" });
        }

        const detailOcorrenciaService = new DetailOcorrenciaService();

        const ocorrencia = await detailOcorrenciaService.execute({
            ocorrencia_id: idNumber
        })

        return res.json(ocorrencia);

    }
}

export { DetailOcorrenciaController }
