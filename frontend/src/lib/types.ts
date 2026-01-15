export interface User{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF" | "CIDADAO";
    createedAt: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF" | "CIDADAO";
    token:string
}   

export interface Category {
    id: number;
    nome: string;
    descricao: string;
    createdAt: string;
    updatedAt: string;
}

export interface Ocorrencia {
    id: number;
    titulo: string;
    descricao: string;
    gravidade: "BAIXA" | "MEDIA" | "ALTA";
    status: "PENDENTE" | "EM_ANALISE" | "ATRASADA" | "CONCLUIDA" | "CANCELADA";
    protocolo: string;
    categoriaId: number;
    responsavelId?: number | null;
    endereco: string;
    createdAt: string;
    updatedAt: string;
    categoria?: {
        id: number;
        nome: string;
    };
    imagens?: {
        id: number;
        url: string;
    }[];
}