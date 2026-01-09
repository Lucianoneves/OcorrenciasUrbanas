import { NextFunction, Request, Response } from "express";
import { CreateCategoryService } from "../../serves/category/CreateCategory.Service";

class CreateCategoryController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, descricao } = req.body
            const createCategory = new CreateCategoryService()

            const category = await createCategory.execute({ nome, descricao })

            return res.status(201).json(category)
        } catch (error) {
            return next(error);
        }
    }
}

export { CreateCategoryController };
