import prismaClient from "../../prisma";

interface CreateOrdemServiceProps {
    numero: number;
    name: string;
    ocorrenciaId: number;
}

class CreateOrdemServicoService {
    async execute({ numero, name, ocorrenciaId }: CreateOrdemServiceProps) {
        
        // Verificar se ocorrência existe
        const ocorrenciaExists = await prismaClient.ocorrencia.findUnique({
            where: { id: ocorrenciaId }
        });

        if (!ocorrenciaExists) {
            throw new Error("Ocorrência não encontrada");
        }

        // Gerar protocolo único
        const protocolo = `OS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const ordenServico = await prismaClient.ordenServico.create({
            data: {
                numero,
                name,
                protocolo,
                status: "PENDENTE",
                endereco: ocorrenciaExists.endereco || "",
                ocorrenciaId,
                draft: true
            }
        });

        return ordenServico;
    }
}

export { CreateOrdemServicoService }
