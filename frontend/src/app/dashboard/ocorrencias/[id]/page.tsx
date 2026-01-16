import { apiClient } from "@/lib/api";
import { Ocorrencia } from "@/lib/types";
import { getToken } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getOcorrencia(id: string) {
    const token = await getToken();
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
        console.error("ID da ocorrência inválido recebido na rota de detalhes:", id);
        return null;
    }

    try {
        const response = await apiClient<Ocorrencia>(`/ocorrencias/detail?ocorrencia_id=${numericId}`, {
            token,
            next: {
                tags: [`ocorrencia-${numericId}`]
            }
        });
        return response;
    } catch (error) {
        console.error("Erro ao buscar detalhes da ocorrência:", error);
        return null;
    }
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function OcorrenciaDetailsPage({ params }: PageProps) {
    const { id } = await params;
    
    const ocorrencia = await getOcorrencia(id);

    if (!ocorrencia) {
        notFound();
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <Link href="/dashboard/ocorrencias" className="text-sm text-gray-400 hover:text-white mb-6 inline-block transition-colors">
                &larr; Voltar para lista
            </Link>

            <div className="bg-app-card border border-app-border rounded-lg overflow-hidden shadow-lg">
                <div className="p-6 border-b border-app-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <span className="font-mono text-sm text-brand-primary font-bold">{ocorrencia.protocolo}</span>
                             <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                ocorrencia.status === 'CONCLUIDA' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                ocorrencia.status === 'PENDENTE' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                ocorrencia.status === 'CANCELADA' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                            }`}>
                                {ocorrencia.status.replace('_', ' ')}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">{ocorrencia.titulo}</h1>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                         ocorrencia.gravidade === 'ALTA' ? 'text-red-400 bg-red-400/10 border border-red-400/20' :
                         ocorrencia.gravidade === 'MEDIA' ? 'text-orange-400 bg-orange-400/10 border border-orange-400/20' :
                         'text-green-400 bg-green-400/10 border border-green-400/20'
                     }`}>
                         Gravidade {ocorrencia.gravidade}
                     </span>
                </div>

                <div className="p-6 space-y-8">
                    <div className="bg-gray-900/30 p-4 rounded-lg border border-app-border">
                        <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Descrição</h3>
                        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{ocorrencia.descricao}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Localização</h3>
                            <div className="flex items-center gap-2 text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                <span>{ocorrencia.endereco}</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Categoria</h3>
                            <div className="flex items-center gap-2 text-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><path d="M3 3h18v18H3zM12 8v8M8 12h8"/></svg>
                                <span>{ocorrencia.categoria?.nome || 'Sem categoria'}</span>
                            </div>
                        </div>
                    </div>

                    {ocorrencia.imagens && ocorrencia.imagens.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Imagens</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {ocorrencia.imagens.map((img) => (
                                    <div key={img.id} className="group relative aspect-video rounded-lg overflow-hidden border border-app-border bg-gray-900">
                                        <img src={img.url} alt={`Imagem da ocorrência ${ocorrencia.protocolo}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="pt-6 border-t border-app-border text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
                         <span>Criado em {new Date(ocorrencia.createdAt).toLocaleString('pt-BR')}</span>
                         {ocorrencia.updatedAt !== ocorrencia.createdAt && (
                             <span>Atualizado em {new Date(ocorrencia.updatedAt).toLocaleString('pt-BR')}</span>
                         )}
                    </div>
                </div>
            </div>
        </div>
    )
}
