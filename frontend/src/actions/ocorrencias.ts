"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Ocorrencia } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createOcorrenciaAction(formData: FormData) {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, error: "Usuário não autenticado" };
    }

    const file = formData.get("file") as File | null;
    const titulo = formData.get("titulo") as string;
    const descricao = formData.get("descricao") as string;
    const endereco = formData.get("endereco") as string;
    const categoriaId = formData.get("categoriaId") as string;
    const protocolo = formData.get("protocolo") as string;
    const gravidade = formData.get("gravidade") as string | null;

    if (!file) {
      return { success: false, error: "Imagem é obrigatória" };
    }

    const multipart = new FormData();
    multipart.append("file", file);
    multipart.append("titulo", titulo);
    multipart.append("descricao", descricao);
    multipart.append("endereco", endereco);
    multipart.append("categoriaId", categoriaId);
    multipart.append("protocolo", protocolo);

    if (gravidade) {
      multipart.append("gravidade", gravidade);
    }

    await apiClient<Ocorrencia>("/ocorrencias", {
      method: "POST",
      body: multipart,
      token,
    });

    revalidatePath("/dashboard/ocorrencias");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Erro ao criar ocorrência" };
  }
}

