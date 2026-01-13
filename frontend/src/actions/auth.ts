"use server";

import { apiClient } from "@/lib/api";

export async function registerAction(
    prevState: {success: boolean; error: string; redirectTo?: string} | null,
    formData: FormData
){ 
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const data = {
        name,
        email,
        password,
    }
  
    try {
        await apiClient("/users", {
            method: "POST",
            body: JSON.stringify(data),
        })
        return {success: true, error: "", redirectTo: "/login"}
    } catch (err: any) {
        return {success: false, error: err.message || "Erro desconhecido ao cadastrar"}
    }
}
