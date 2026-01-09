"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
const index_1 = __importDefault(require("../../prisma/index"));
class CreateCategoryService {
    async execute({ nome, descricao, description }) {
        const categoriaNome = nome ?? " ";
        const categoriaDescricao = descricao ?? description ?? " ";
        if (!categoriaNome) {
            throw new Error("Nome é obrigatório");
        }
        const category = await index_1.default.categoria.create({
            data: {
                nome: categoriaNome,
                descricao: categoriaDescricao,
            },
            select: {
                id: true,
                nome: true,
                descricao: true,
                createdAt: true,
            }
        });
        return category;
    }
}
exports.CreateCategoryService = CreateCategoryService;
//# sourceMappingURL=CreateCategory.Service.js.map