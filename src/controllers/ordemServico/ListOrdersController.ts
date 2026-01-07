import { Request, Response } from 'express';
import { ListOrdersService } from '../../serves/ordemServico/ListOrdersService';

class ListOrdersController {
    async handle(req: Request, res: Response) {
        const status = req.query.status as string || undefined;
        const disableQuery = req.query.disable as string | undefined;

        let disable: boolean | undefined = undefined;

        if (disableQuery === 'true') {
            disable = true;
        } else if (disableQuery === 'false') {
            disable = false;
        }

        const listOrdersService = new ListOrdersService();

        const ordens = await listOrdersService.execute({ 
            status, 
            disable 
        });

        return res.json(ordens);
    }
}

export { ListOrdersController }
