import { Request, Response, NextFunction } from 'express';
import { AuthUserService } from '../../serves/user/AuthUserService';


class AuthUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const authUserService = new AuthUserService();
      const login = await authUserService.execute({ email, password });

      return res.json({ login });
    } catch (error) {
      return next(error);
    }
  }
}
export  {AuthUserController};
