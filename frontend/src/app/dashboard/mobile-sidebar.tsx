 "use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const menuItems = [
  { label: "Categorias", href: "/dashboard/categories" },
  { label: "Ocorrências", href: "/dashboard/ocorrencias" },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden border-b border-app-border bg-app-card">
      <header className="flex h-16 items-center justify-between px-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 p-0 bg-app-sidebar border-app-border"
          >
            <SheetHeader className="border-b border-app-border p-6">
              <SheetTitle className="text-xl text-white font-bold">
                Menu
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 p-4 text-sm text-gray-300">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-app-background text-white"
                        : "hover:bg-app-background/60"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <form action={logoutAction} className="border-t border-app-border">
              <button
                type="submit"
                className="w-full px-4 py-3 text-left text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Sair
              </button>
            </form>
          </SheetContent>
        </Sheet>

        <h1>
          <span className="text-xl font-bold text-white">
            Ocorrências Urbanas
          </span>
        </h1>
        <div className="w-10 h-10 bg-white rounded-full" />
      </header>
    </div>
  );
}


