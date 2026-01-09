"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserService = void 0;
const index_1 = __importDefault(require("../../prisma/index"));
class DetailUserService {
    async execute(user_id) {
        try {
            const user = await index_1.default.user.findFirst({
                where: {
                    id: user_id,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return user;
        }
        catch (error) {
            throw new Error("Usuário não encontrado");
        }
    }
}
exports.DetailUserService = DetailUserService;
//# sourceMappingURL=DetailUserService.js.map