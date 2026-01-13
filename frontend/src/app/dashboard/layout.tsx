
import { requiredAdmin } from "@/lib/auth"


export default async function DashboardLayout({
    children, 
}: {
     children: React.ReactNode  
     }) {
        const user = await requiredAdmin();
        console.log("User Logado ",user);  
         
        
         
         return  <h1> Ocorrências Urbanas</h1>
        
}
