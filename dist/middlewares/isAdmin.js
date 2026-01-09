"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const index_1 = __importDefault(require("../prisma/index"));
const isAdmin = async (req, res, next) => {
    const user_id = req.user_id;
    if (typeof user_id !== "number" || Number.isNaN(user_id)) {
        return res.status(401).json({
            error: "Usuário sem permissão."
        });
    }
    const user = await index_1.default.user.findUnique({
        where: {
            id: user_id,
        },
        select: {
            id: true,
            role: true,
        }
    });
    if (!user) {
        return res.status(401).json({
            error: "Usuário sem permissão."
        });
    }
    if (user.role !== "ADMIN") {
        return res.status(403).json({
            error: "Usuário sem permissão."
        });
    }
    return next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=isAdmin.js.map