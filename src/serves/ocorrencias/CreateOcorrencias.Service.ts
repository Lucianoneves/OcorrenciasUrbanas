import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { Readable } from 'node:stream'

interface CreateOcorrenciasServiceRequest {
    titulo: string;
    descricao: string;
    categoriaId: string;
    imageBuffer: Buffer;
    imagens: string;
    endereco: string;
    protocolo: string;
    gravidade: string;
    status: string;
}

class CreateOcorrenciasService {
    async execute({
        titulo,
        descricao,
        categoriaId,
        imageBuffer,
        imagens,
        endereco,
        protocolo,
        // gravidade, // removido pois não é usado
        // status, // removido pois não é usado
    }: 
    
    CreateOcorrenciasServiceRequest) {

        if (!titulo) {
            console.log("Erro: Título ausente ou vazio. Recebido:",titulo);
            throw new Error("Título é obrigatório");
        }
        if (!descricao) {
             throw new Error("Descrição é obrigatória");
        }

        if (!categoriaId) {
             throw new Error("Categoria é obrigatória");
        }



        // Verifica se a categoria existe
        const categoryExists = await prismaClient.categoria.findUnique({
            where: {
                id: Number(categoriaId)
            }
        })

        if (!categoryExists) {
            throw new Error("Categoria não existe.")
        }

        let bannerURL = ""

        try {
            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "ocorrencias",
                        resource_type: "image",
                        public_id: `${Date.now()}-${imagens.split(".")[0]}`,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                const bufferStream = Readable.from(imageBuffer)
                bufferStream.pipe(uploadStream);
            });

            bannerURL = result.secure_url;

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao fazer upload da imagem no Cloudinary.")
        }

        // Criar ocorrência no banco
        
       

     const ocorrencia = await prismaClient.ocorrencia.create({
  data: {
    titulo: titulo, 
    descricao: descricao,
    protocolo: protocolo,
    categoriaId: Number(categoriaId),
    endereco: endereco, // ✔️ correto
    imagens: {
      create: {
        url: bannerURL,
      },
    },
  },
  select: {
    id: true,
    titulo: true,
    descricao: true,
    protocolo: true,
    status: true,
    endereco: true,
    categoria: {
      select: {
        id: true,
        nome: true,
      },
    },
    imagens: true,
  },
});


        return ocorrencia;
    }
}

export { CreateOcorrenciasService };
