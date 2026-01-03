 import { Request, Response, NextFunction } from 'express';
 import { CreateUserService } from '../../serves/user/CreateUserService'; 


  class CreateUserController { 
    async handle (req: Request, res: Response, next: NextFunction)  { 
      try {
        const { name, email, password } = req.body; 

        console.log({name, email, password}); // imprime os dados no console

        const createUserService = new CreateUserService(); // cria uma instância do serviço de criação de usuário 
        const  user = await createUserService.execute({
          name:name,
          email:email,
          password:password,
        });

        return res.json(user); // retorna a mensagem de sucesso
      } catch (error) {
        return next(error);
      }
 }
}

export { CreateUserController };
