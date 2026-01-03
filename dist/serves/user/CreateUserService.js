"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const index_1 = __importDefault(require("../../prisma/index"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ name, email, password }) {
        const userAlreadyExists = await index_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("Email já existente");
        }
        const passwordHas = await (0, bcryptjs_1.hash)(password, 8);
        const user = await index_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHas,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return user;
    }
}
exports.CreateUserService = CreateUserService;
//# sourceMappingURL=CreateUserService.js.map