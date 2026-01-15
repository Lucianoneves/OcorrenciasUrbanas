"use client"

import { useActionState, useEffect } from "react"; 
import Register from "@/app/register/page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import * as input from "../ui/input";
import * as button from "../ui/button"; 
import Link from 'next/link'
import { loginAction } from "@/actions/auth";
import {useRouter} from "next/navigation"


export function LoginForm() {
 const [state, formAction,isPending] = useActionState(loginAction, null)
 const router = useRouter();

 useEffect (() => {
  if( state?.success  && state?.redirectTo){
    router.replace(state.redirectTo);
  }

 }, [state, router]);

 
 

  return (
   <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
        Ocorrências de infraestrutura Urbana<span className="text-brand-primary"> Login</span>
        </CardTitle>      
    </CardHeader>
     <CardContent >
      {state?.error && (
        <div className="p-3 mb-4 text-sm text-red-500 border border-red-500 rounded bg-red-500/10">
          {state.error}
        </div>
      )}

      <form className="space-y-4" action={formAction}>   

        <div className=" space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <input.Input
           id="email"
           name="email"
           type="email"
            placeholder="Digite seu email"
            required          
            className=" text-white bg-app-background border-app border-app-border"
          />
        </div>

        <div className=" space-y-2">
          <Label 
          htmlFor="password" className="text-white">Senha</Label>
          <input.Input
           id="password"
           name="password"
           type="password"
            placeholder="Digite sua senha"
            required          
            className=" text-white bg-app-background border-app border-app-border"
          />
        </div>

        <button.Button
          type="submit"
          className="w-full bg-brand-primary text-white font-bold py-2 rounded-md hover:bg-brand-primary/90 transition-colors"
        >
          {isPending ? "Acessando conta..." : "Logar"}
        </button.Button>
        { state?.error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                {state.error}
                </div>
        )}
        <p className="text-center text-sm text-gray-100">
          Ainda não possui uma conta? <Link href="/register" className= "text-brand-primary font-semibold">Crie uma conta</Link>
        </p>
      </form>
      </CardContent>
   </Card>

  );
}


