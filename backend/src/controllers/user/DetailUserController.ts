import { NextFunction, Request, Response } from "express";
import { DetailUserService } from "../../serves/user/DetailUserService";



class DetailUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const user_id = req.user_id;   
      
      if (typeof user_id !== "number" || Number.isNaN(user_id)) {
        return res.status(401).json({ error: "Token inválido." });
      }

      const detailUser= new DetailUserService();
      const user = await detailUser.execute(user_id);

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  }
}

export { DetailUserController};
