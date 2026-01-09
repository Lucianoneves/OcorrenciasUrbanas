"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
        email: zod_1.z.string().email({ message: 'Precisa ser um email válido' }),
        password: zod_1.z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    }),
});
exports.authUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: 'Precisa ser um email válido' }),
        password: zod_1.z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
    })
});
//# sourceMappingURL=userSchema.js.map