"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/actions/categories";
import { useRouter } from "next/navigation";

export function CategoryForm() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    const formData = new FormData (e.currentTarget)
    const result = await createCategoryAction(formData)

    if(result.success){
        setOpen(false);
        router.refresh();
        return;
    }else{
        console.log(result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white">
          <Plus className="h-5 w-5" />
          Nova categoria
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-app-card text-white border border-app-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar categoria
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Adicione uma nova categoria para organizar suas ocorrências.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 space-y-4" onSubmit={handleCreateCategory}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-gray-200">
              Nome da categoria
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Digite o nome da categoria..."
              className="border-app-border bg-app-background text-white placeholder:text-gray-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
          >
            Criar categoria
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
