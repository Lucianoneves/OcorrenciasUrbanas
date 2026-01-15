import Link from "next/link";

const menuItems = [
  { label: "Categorias", href: "/dashboard/categories" },
  { label: "Ocorrências", href: "/dashboard/ocorrencias" },
];

interface SidebarProps {
  userName?: string;
}

export function Sidebar({ userName }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r border-app-border bg-app-card">
      <div className="p-4 border-b border-app-border">
        <h2 className="text-lg font-semibold text-white">
          Ocorrências Urbanas
        </h2>
        {userName && (
          <p className="text-xs text-gray-400 mt-1">Olá, {userName}</p>
        )}
      </div>
      <nav className="flex flex-col gap-1 p-2 text-sm text-gray-300">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 hover:bg-app-background/60 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

