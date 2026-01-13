"use server";

import { apiClient } from "@/lib/api";
import { User, AuthResponse } from '@/lib/types'


import {setToken} from '@/lib/auth'

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
        await apiClient<User>("/users", {
            method: "POST",
            body: JSON.stringify(data),
        })

       

        return {success: true, error: "", redirectTo: "/login"}
    } catch (err: any) {
        return {success: false, error: err.message || "Erro desconhecido ao cadastrar"}
    }
}

export async function loginAction(
    prevState: {success: boolean; error: string; redirectTo?: string} | null,
    formData: FormData
){
  try{ 
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const data = { // Dados que serão enviados para o servidor
        email,
        password,
    };  
  
        const response = await apiClient<AuthResponse>("/login", {
            method: "POST",
            body: JSON.stringify(data),
        })

          await setToken(response.token);     //funcao setToken do auth.ts
        console.log(response.token);
       

        return {success: true, error: "", redirectTo: "/dashboard"}
    } catch (error) {
        console.log(error)

        if(error instanceof Error) {
        return {
            success: false,
             error: error.message || "Erro  ao  fazer o login",
    };
}

       return {success: false, error: "Erro ao fazer o login "};
    }
}
