import { Request, Response } from 'express';
import { FinishOrdemService } from '../../serves/ordemServico/FinishOrdemService';


class FinishOrdemServicoController {
    async handle(req: Request, res: Response) {
        const {  ordenServicoId } = req.body;

        const finishOrdemService = new FinishOrdemService();


        const  updatedOrdem = await finishOrdemService.execute({ ordenServicoId });

        res.json(updatedOrdem);

    }
}

export { FinishOrdemServicoController }
