
import { requiredUser } from "@/lib/auth"


export default async function DashboardLayout({
    children, 
}: {
     children: React.ReactNode  
     }) {
        const user = await requiredUser();
        
         
         return (
            <div className="min-h-screen bg-app-background">
                <header className="p-4 border-b border-app-border flex justify-between items-center text-white">
                    <h1 className="text-xl font-bold">Ocorrências Urbanas</h1>
                    <div className="flex items-center gap-4">
                        <span>{user.name}</span>
                    </div>
                </header>
                <main>
                    {children}
                </main>
            </div>
         )
        
}
