"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { createOcorrenciaAction } from "@/actions/ocorrencias";
import { Category } from "@/lib/types";
import { Upload } from "lucide-react";


interface OcorrenciasFormProps {
  categories: Category[];
}

export function OcorrenciasForm({ categories }: OcorrenciasFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string>("");

  async function handleCreateOcorrencia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    const result = await createOcorrenciaAction(formData);

    setIsSubmitting(false);

    if (result.success) {
      setOpen(false);
      router.refresh();
      return;
    }

    console.error(result.error);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if(file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      }
      reader.readAsDataURL(file);
      
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white">
          <Plus className="h-5 w-5" />
          Nova ocorrência
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-app-card text-white border border-app-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Criar ocorrência
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Registre uma nova ocorrência urbana com os detalhes abaixo.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 space-y-4" onSubmit={handleCreateOcorrencia}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo" className="text-sm text-gray-200">
                Título
              </Label>
              <Input
                id="titulo"
                name="titulo"
                required
                placeholder="Ex: Poste caído na rua X"
                className="border-app-border bg-app-background text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protocolo" className="text-sm text-gray-200">
                Protocolo
              </Label>
              <Input
                id="protocolo"
                name="protocolo"
                required
                placeholder="Ex: PROT-123"
                className="border-app-border bg-app-background text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-sm text-gray-200">
              Descrição
            </Label>
            <textarea
              id="descricao"
              name="descricao"
              required
              rows={4}
              placeholder="Descreva o problema com detalhes..."
              className="w-full rounded-md border border-app-border bg-app-background text-sm text-white placeholder:text-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-sm text-gray-200">
                Endereço
              </Label>
              <Input
                id="endereco"
                name="endereco"
                required
                placeholder="Rua, número, bairro..."
                className="border-app-border bg-app-background text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoriaId" className="text-sm text-gray-200">
                Categoria
              </Label>
              <select
                id="categoriaId"
                name="categoriaId"
                required
                className="w-full rounded-md border border-app-border bg-app-background text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gravidade" className="text-sm text-gray-200">
                Gravidade
              </Label>
              <select
                id="gravidade"
                name="gravidade"
                className="w-full rounded-md border border-app-border bg-app-background text-sm text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary/60"
                defaultValue="MEDIA"
              >
                <option value="BAIXA">Baixa</option>
                <option value="MEDIA">Média</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file" className="text-sm text-gray-200">
                Imagem
              </Label>
              {imagePreview ? (
                <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                  <img 
                  src={imagePreview}
                   alt="Preview da image"                   
                    className="w-full h-full z-10 object-cover"
                     />

                     <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setImagePreview("")}
                      className="absolute top-2 right-2 z-20"
                    >
                       Excluir                    
                     </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center">
                   <Upload className="w-8 h-8 text-white mx-auto" />
                   <Label htmlFor="file">
                    Clique para selecionar uma imagem 
                   </Label>
                   <Input
                   id="file"
                   name="file"
                   type="file"
                   accept="image/jpeg, image/png, image/jpg"
                   onChange={handleImageChange}
                   required
                   />
              </div>
              )}
              </div>
             
              
            

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
          >
            {isSubmitting ? "Criando..." : "Criar ocorrência"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
