import prismaClient from "../../prisma/index";
import cloudinary from "../../config/cloudinary";
import { Readable } from 'node:stream'

interface CreateOcorrenciasServiceRequest {
    titulo: string;
    descricao: string;
    categoriaId: string;
    imageBuffer: Buffer;
    imagens: string;
}

class CreateOcorrenciasService {
    async execute({
        titulo,
        descricao,
        categoriaId,
        imageBuffer,
        imagens }: CreateOcorrenciasServiceRequest) {

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
        // OBS: Como o schema exige campos como latitude, longitude, endereco e criador, 
        // e eles não estão vindo no request atual, vou usar valores padrão temporários 
        // ou precisaremos atualizar o Controller para enviar esses dados.
        // Vou assumir valores padrão para permitir a compilação, mas isso deve ser revisto.
        
        

   
}
}

export { CreateOcorrenciasService }
