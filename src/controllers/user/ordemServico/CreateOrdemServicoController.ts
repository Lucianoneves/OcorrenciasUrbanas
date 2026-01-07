import { Request, Response } from 'express';
import { CreateOrdemServicoService } from '../../../serves/ordemServico/CreateOrdemServicoService';

class CreateOrdemServicoController {
    async handle(req: Request, res: Response) {
        const { numero, name, ocorrenciaId } = req.body;

        const createOrdemServico = new CreateOrdemServicoService();

        try {
            const ordem = await createOrdemServico.execute({
                numero,
                name,
                ocorrenciaId
            });
            return res.json(ordem);
        } catch (err: any) {
             console.log(err);
            return res.status(400).json({ error: err.message });
        }
    }
}

export { CreateOrdemServicoController }
