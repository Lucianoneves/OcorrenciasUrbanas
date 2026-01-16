
import { requiredUser } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { logoutAction } from "@/actions/auth";
import { MobileSidebar } from "./mobile-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requiredUser();

  return (
    <div className="min-h-screen bg-app-background text-white flex flex-col">
      <header className="hidden md:flex p-4 border-b border-app-border justify-between items-center">
        <h1 className="text-xl font-bold">Ocorrências Urbanas</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Olá, {user.name}</span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <MobileSidebar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar userName={user.name} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
