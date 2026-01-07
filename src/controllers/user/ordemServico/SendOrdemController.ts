import { Request, Response } from 'express';
import { SendOrdemService } from '../../../serves/ordemServico/SendOrdemService';

class SendOrdemController {
    async handle(req: Request, res: Response) {
        const { name, ordenServicoId } = req.body;

        const sendOrdemService = new SendOrdemService();


        const order = await sendOrdemService.execute({ name, ordenServicoId });

        res.json(order);

    }
}

export { SendOrdemController }