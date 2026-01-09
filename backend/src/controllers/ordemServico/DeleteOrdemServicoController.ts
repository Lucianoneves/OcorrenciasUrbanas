import { Request, Response } from 'express';

import { DeleteOrdemService } from '../../serves/ordemServico/DeleteOrdemService';


class DeleteOrdemServicoController {
    async handle(req: Request, res: Response) {
        const  ordenServicoId  = req.query?.ordenServicoId as string;

        const deleteOrdemService = new DeleteOrdemService();


        const order = await deleteOrdemService.execute({ ordenServicoId: Number(ordenServicoId) });

        res.json(order);

    }
}

export { DeleteOrdemServicoController }
