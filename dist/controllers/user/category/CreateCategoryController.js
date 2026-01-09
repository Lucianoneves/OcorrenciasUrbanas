"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const CreateCategory_Service_1 = require("../../../serves/ocorrencias/CreateCategory.Service");
class CreateCategoryController {
    async handle(req, res, next) {
        try {
            const { nome, descricao } = req.body;
            const createCategory = new CreateCategory_Service_1.CreateCategoryService();
            const category = await createCategory.execute({ nome, descricao });
            return res.status(201).json(category);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.CreateCategoryController = CreateCategoryController;
//# sourceMappingURL=CreateCategoryController.js.map