import { Request, Response } from 'express';
import { ListOcorrenciasByCategoryService } from "../../serves/category/ListOcorrenciasByCategoryService";

class ListOcorrenciasByCategoryController {
    async handle(req: Request, res: Response) {
        const { categoryId } = req.query;

        if (!categoryId) {
            return res.status(400).json({ error: "Category ID is required" });
        }

        const listOcorrenciasByCategory = new ListOcorrenciasByCategoryService();

        const ocorrencias = await listOcorrenciasByCategory.execute({
            categoryId: Number(categoryId)
        });

        return res.json(ocorrencias);
    }
}

export { ListOcorrenciasByCategoryController }
