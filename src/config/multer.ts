import multer from 'multer'


//usar o memory storage para armazenar as imagens e enviar diretamente para o cloudinary


export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
    fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
        const allowedMimes= ["image/jpeg", "image/jpg", "image/png", "image/gif"];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("Tipo de arquivo inválido. Apenas JPEG, JPG, PNG e GIF são permitidos."))
        }
       
        }
    }

