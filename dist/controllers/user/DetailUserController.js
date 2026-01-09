"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const DetailUserService_1 = require("../../serves/user/DetailUserService");
class DetailUserController {
    async handle(req, res, next) {
        try {
            const user_id = req.user_id;
            if (typeof user_id !== "number" || Number.isNaN(user_id)) {
                return res.status(401).json({ error: "Token inválido." });
            }
            const detailUser = new DetailUserService_1.DetailUserService();
            const user = await detailUser.execute(user_id);
            return res.json(user);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.DetailUserController = DetailUserController;
//# sourceMappingURL=DetailUserController.js.map