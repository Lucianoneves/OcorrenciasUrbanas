"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../../serves/user/AuthUserService");
class AuthUserController {
    async handle(req, res, next) {
        try {
            const { email, password } = req.body;
            const authUserService = new AuthUserService_1.AuthUserService();
            const login = await authUserService.execute({ email, password });
            return res.json({ login });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.AuthUserController = AuthUserController;
//# sourceMappingURL=AuthUserController.js.map