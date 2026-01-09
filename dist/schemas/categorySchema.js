"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        nome: zod_1.z.
            string({ message: "Nome é obrigatório em texto" })
            .min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
    }),
});
//# sourceMappingURL=categorySchema.js.map