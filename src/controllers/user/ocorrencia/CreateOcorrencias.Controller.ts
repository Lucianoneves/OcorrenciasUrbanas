import { Request, Response } from 'express';
import { CreateOcorrenciasService } from '../../../serves/ocorrencias/CreateOcorrencias.Service';

class CreateOcorrenciasController {
    async handle(req: Request, res: Response) {
        // Log para debug
        console.log("=== DEBUG CREATE OCORRENCIA ===");
        console.log("Headers:", req.headers['content-type']);
        console.log("Body recebido:", req.body);
        console.log("Arquivo recebido:", req.file ? req.file.originalname : "Nenhum");

        // Tenta pegar do body, mas se vazio tenta pegar de query (caso usuário mande errado)
        const titulo = req.body.titulo || req.query.titulo;
        const descricao = req.body.descricao || req.query.descricao;
        const categoriaId = req.body.categoriaId || req.query.categoriaId;
        const endereco = req.body.endereco || req.query.endereco;
        const protocolo = req.body.protocolo || req.query.protocolo;
        const gravidade = req.body.gravidade || req.query.gravidade;
        const status = req.body.status || req.query.status;

        if (!req.file) {
            throw new Error("Nenhum arquivo foi enviado.")
        }

        const createOcorrencias = new CreateOcorrenciasService();

        // Garantir que os campos sejam strings ou undefined
        const ocorrencia = await createOcorrencias.execute({
            titulo: titulo as string,
            descricao: descricao as string,
            categoriaId: categoriaId as string,
            imageBuffer: req.file.buffer,
            imagens: req.file.originalname,
            endereco: endereco as string,
            protocolo: protocolo as string,
            gravidade: gravidade as string,
            status: status as string
        });

        res.json(ocorrencia)
    }
}

export { CreateOcorrenciasController }
