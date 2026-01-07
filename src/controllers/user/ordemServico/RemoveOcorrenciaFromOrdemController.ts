import { Request, Response } from 'express';
import { RemoveOcorrenciaFromOrdemService } from '../../../serves/ordemServico/RemoveOcorrenciaFromOrdemService';

class RemoveOcorrenciaFromOrdemController {
    async handle(req: Request, res: Response) {
        const numero = req.query.numero || req.body?.numero;
        const ocorrenciaId = req.query.ocorrenciaId || req.body?.ocorrenciaId;

        if (!numero || !ocorrenciaId) {
            return res.status(400).json({ error: "Parâmetros 'numero' e 'ocorrenciaId' são obrigatórios." });
        }

        const service = new RemoveOcorrenciaFromOrdemService();

        try {
            const result = await service.execute({
                numero: Number(numero),
                ocorrenciaId: Number(ocorrenciaId)
            });

            return res.json({ message: "Ocorrência excluida com sucesso", modifiedCount: result.modifiedCount });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { RemoveOcorrenciaFromOrdemController }
