import { requiredAdmin } from "@/lib/auth"

export default  async function DashboardPage() {

 
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-app-background text-white">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <div className="p-6 bg-app-card border border-app-border rounded-lg shadow-lg">
        <p className="text-xl">Bem-vindo ao sistema de Ocorrências Urbanas!</p>
        <p className="mt-2 text-gray-400">Você está logado com sucesso.</p>
      </div>
    </div>
  )
}
