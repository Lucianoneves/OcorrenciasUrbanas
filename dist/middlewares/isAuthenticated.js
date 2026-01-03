"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({
            error: "token não  fornecido."
        });
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const userId = Number(sub);
        if (!Number.isFinite(userId)) {
            return res.status(401).json({
                error: "token  inválido."
            });
        }
        req.user_id = userId;
        return next();
    }
    catch (error) {
        return res.status(401).json({
            error: "token  inválido."
        });
    }
}
//# sourceMappingURL=isAuthenticated.js.map