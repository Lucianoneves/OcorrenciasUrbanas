import { Request, Response } from 'express';
import { RemoveOcorrenciaFromOrdemService } from '../../../serves/ordemServico/RemoveOcorrenciaFromOrdemService';

class RemoveOcorrenciaFromOrdemController {
    async handle(req: Request, res: Response) {
        const { numero, ocorrenciaId } = req.body;

        const service = new RemoveOcorrenciaFromOrdemService();

        try {
            const result = await service.execute({
                numero: Number(numero),
                ocorrenciaId: Number(ocorrenciaId)
            });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: "Ordem não encontrada para este número e ocorrência" });
            }

            return res.json({ deletedCount: result.deletedCount });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { RemoveOcorrenciaFromOrdemController }
