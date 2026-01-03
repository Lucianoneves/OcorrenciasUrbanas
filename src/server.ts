import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

dotenv.config(); // ✅ carrega .env

const app = express();

const jsonParser = express.json();
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET" || req.method === "HEAD") {
    return next();
  }

  return jsonParser(req, res, next);
});
app.use(cors());
app.use(router);

// ✅ Middleware de tratamento de erros (CORRETO)
app.use(
  (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
