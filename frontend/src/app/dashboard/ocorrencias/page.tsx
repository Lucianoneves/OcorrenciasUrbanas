import { apiClient } from "@/lib/api"; 
import { Ocorrencia } from "@/lib/types"; 
import { getToken } from "@/lib/auth"; 
import Link from "next/link"; 
import { Button } from "@/components/ui/button"; 

async function getOcorrencias() { 
  const token = await getToken(); 
  try { 
      console.log("Buscando ocorrências..."); 
      const response = await apiClient<Ocorrencia[]>("/ocorrencias", { 
        token, 
        next: { 
            tags: ['ocorrencias'] 
        } 
      }); 
      console.log("Ocorrências encontradas:", response.length); 
      return response; 
  } catch (error) { 
      console.error("Erro ao buscar ocorrências:", error); 
      return []; 
  } 
} 

export default async function OcorrenciasPage() { 
    const ocorrencias = await getOcorrencias(); 

    return ( 
        <div className="w-full max-w-7xl mx-auto p-6"> 
            <div className="flex justify-between items-center mb-6"> 
                <h1 className="text-3xl font-bold text-white">Minhas Ocorrências</h1> 
                <Link href="/dashboard/ocorrencias/new"> 
                    <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white"> 
                        Nova Ocorrência 
                    </Button> 
                </Link> 
            </div> 

            <div className="grid grid-cols-1 gap-4"> 
                {ocorrencias.length === 0 ? ( 
                    <div className="text-center py-10 text-gray-400 bg-app-card border border-app-border rounded-lg"> 
                        <p>Nenhuma ocorrência encontrada.</p> 
                    </div> 
                ) : ( 
                   <div className="bg-app-card rounded-lg border border-app-border overflow-hidden overflow-x-auto"> 
                       <table className="w-full text-left text-sm"> 
                           <thead className="bg-gray-900/50 text-gray-400 uppercase"> 
                               <tr> 
                                   <th className="p-4 font-medium">Protocolo</th> 
                                   <th className="p-4 font-medium">Título</th> 
                                   <th className="p-4 font-medium">Status</th> 
                                   <th className="p-4 font-medium">Gravidade</th> 
                                   <th className="p-4 font-medium">Data</th> 
                                   <th className="p-4 font-medium">Ações</th> 
                               </tr> 
                           </thead> 
                           <tbody className="text-gray-200 divide-y divide-app-border"> 
                               {ocorrencias.map((oc) => ( 
                                   <tr key={oc.id} className="hover:bg-gray-800/30 transition-colors"> 
                                       <td className="p-4 font-mono text-xs text-brand-primary">{oc.protocolo}</td> 
                                       <td className="p-4 font-medium">{oc.titulo}</td> 
                                       <td className="p-4"> 
                                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ 
                                               oc.status === 'CONCLUIDA' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                                               oc.status === 'PENDENTE' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                                               oc.status === 'CANCELADA' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 
                                               'bg-blue-500/10 text-blue-500 border border-blue-500/20' 
                                           }`}> 
                                               {oc.status.replace('_', ' ')} 
                                           </span> 
                                       </td> 
                                       <td className="p-4"> 
                                            <span className={`px-2 py-1 rounded text-xs ${ 
                                                oc.gravidade === 'ALTA' ? 'text-red-400' : 
                                                oc.gravidade === 'MEDIA' ? 'text-orange-400' : 
                                                'text-green-400' 
                                            }`}> 
                                                {oc.gravidade} 
                                            </span> 
                                       </td> 
                                       <td className="p-4 text-gray-400"> 
                                           {new Date(oc.createdAt).toLocaleDateString('pt-BR')} 
                                       </td> 
                                       <td className="p-4"> 
                                            <Link href={`/dashboard/ocorrencias/${oc.id}`} className="text-sm text-gray-400 hover:text-white underline decoration-gray-600 underline-offset-4"> 
                                                Detalhes 
                                            </Link> 
                                       </td> 
                                   </tr> 
                               ))} 
                           </tbody> 
                       </table> 
                   </div> 
                )} 
            </div> 
        </div> 
    ) 
}