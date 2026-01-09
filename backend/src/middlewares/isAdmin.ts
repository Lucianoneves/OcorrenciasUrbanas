import { Request, Response, NextFunction } from 'express';
import prismaClient from '../prisma/index';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user_id = req.user_id;

    if (typeof user_id !== "number" || Number.isNaN(user_id)) {
        return res.status(401).json({
            error: "Usuário sem permissão."
        })
    }

    const user = await prismaClient.user.findUnique({
        where: {
            id: user_id,
        },
        select: {
            id: true,
            role: true,
        }
    });

    if (!user) {
        return res.status(401).json({
            error: "Usuário sem permissão."
        })
    }

    if (user.role !== "ADMIN") {
        return res.status(403).json({
            error: "Usuário sem permissão."
        })
    }

    return next();
};


