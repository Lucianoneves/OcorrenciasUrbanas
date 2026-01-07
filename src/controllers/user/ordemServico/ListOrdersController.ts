import { Request, Response } from 'express';
import { ListOrdersService } from '../../../serves/ordemServico/ListOrdersService';

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const status = req.query.status as string || undefined;

        const listOrdersService = new ListOrdersService();

        const ordens = await listOrdersService.execute({ status });

        return res.json(ordens);
    }
}

export { ListOrdersController }
