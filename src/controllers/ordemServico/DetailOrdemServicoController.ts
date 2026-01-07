import { Request, Response } from 'express';
import { DetailOrdemServicoService } from '../../serves/ordemServico/DetailOrdemServicoService';

class DetailOrdemServicoController {
    async handle(req: Request, res: Response) {
        const ordenServicoId = req.query.ordenServicoId;

        const detailOrdemServicoService = new DetailOrdemServicoService();

        const ordem = await detailOrdemServicoService.execute({
            ordenServicoId: Number(ordenServicoId)
        })

        return res.json(ordem);

    }
}

export { DetailOrdemServicoController }
