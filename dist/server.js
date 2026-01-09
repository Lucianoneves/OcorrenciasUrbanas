"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const jsonParser = express_1.default.json();
app.use((req, res, next) => {
    if (req.method === "GET" || req.method === "HEAD") {
        return next();
    }
    return jsonParser(req, res, next);
});
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use((error, _req, res, _next) => {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message,
        });
    }
    return res.status(500).json({
        error: "Internal server error",
    });
});
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map