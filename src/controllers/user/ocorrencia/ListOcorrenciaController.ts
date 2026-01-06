import { Request, Response } from 'express';
import { ListOcorrenciaService } from '../../../serves/ocorrencias/ListOcorrenciaService';

class ListOcorrenciaController {
    async handle(req: Request, res: Response) {
        const { disable } = req.query;

        const listOcorrenciaService = new ListOcorrenciaService();

        // Converte query param para boolean. 
        // Se 'true' -> true. Qualquer outra coisa (undefined, null, 'false', '') -> false.
        const disableBoolean = disable === 'true';

        const ocorrencias = await listOcorrenciaService.execute({
            disable: disableBoolean ?? false,
        });

        return res.json(ocorrencias);
    }
}

export { ListOcorrenciaController }
