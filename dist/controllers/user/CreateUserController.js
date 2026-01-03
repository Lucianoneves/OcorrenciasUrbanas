"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../serves/user/CreateUserService");
class CreateUserController {
    async handle(req, res, next) {
        try {
            const { name, email, password } = req.body;
            console.log({ name, email, password });
            const createUserService = new CreateUserService_1.CreateUserService();
            const user = await createUserService.execute({
                name: name,
                email: email,
                password: password,
            });
            return res.json(user);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.CreateUserController = CreateUserController;
//# sourceMappingURL=CreateUserController.js.map