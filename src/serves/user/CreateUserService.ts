import prismaClient from '../../prisma/index';
import { hash } from 'bcryptjs';


interface CreateUserProps{
  name: string;
  email: string;
  password: string;
}


class CreateUserService {
  async execute({name, email, password}: CreateUserProps) {   // método execute para executar a criação de um usuário

    const userAlreadyExists  = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    })

    if(userAlreadyExists) {
      throw new Error("Email já existente");
    }

    const passwordHas = await hash(password, 8);
  

    const user = await prismaClient.user.create({
      data: {
        user_id: Math.floor(Math.random() * 1000000), // Gerando um ID aleatório temporário
        name: name,
        email: email,
        password: passwordHas,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,        
        createdAt: true,

      },
    });

    return user;
  }
}

export { CreateUserService };