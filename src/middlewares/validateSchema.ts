import  { NextFunction, Request, Response } from 'express';
import {ZodError, ZodType} from 'zod';


export const valedateSchema = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction ) =>{

    try{
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        })

        return next();          
    }catch(error){
        if(error instanceof ZodError){ // verifica se o erro é uma instância de ZodError
            return res.status(400).json({
                error: "Error validação",
                details: error.issues.map(issue => ({
                    campo: issue.path.slice(1).join("*"),
                    message: issue.message,
                }))
            })
        }

        return res.status(500).json({
            error: "Erro interno",
          
        })

    }
}; 
    
