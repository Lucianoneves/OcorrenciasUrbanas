"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valedateSchema = void 0;
const zod_1 = require("zod");
const valedateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                error: "Error validação",
                details: error.issues.map(issue => ({
                    campo: issue.path.slice(1).join("*"),
                    message: issue.message,
                }))
            });
        }
        return res.status(500).json({
            error: "Erro interno",
        });
    }
};
exports.valedateSchema = valedateSchema;
//# sourceMappingURL=validateSchema.js.map