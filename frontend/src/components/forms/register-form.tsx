"use client"

import { useActionState } from "react"; 

import Register from "@/app/register/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import * as input from "@/components/ui/input";
import * as button from "@/components/ui/button"; 
import Link from 'next/link'
import { registerAction } from "@/actions/auth";


export function RegisterForm() {

 const [state, formAction,isPending] = useActionState(registerAction, null)

 
 

  return (
   <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
        Ocorrências de infraestrutura Urbana<span className="text-brand-primary"> Register</span>
        </CardTitle>
    </CardHeader>
     <CardContent >


      <form className="space-y-4" action={formAction}>

        <div className=" space-y-2">
          <Label htmlFor="name" className="text-white">Name</Label>
          <input.Input
           id="name"
           type="text"
           name="name"
            placeholder="Digite seu nome"
            required
            minLength={3}
            className=" text-white bg-app-background border-app border-app-border"
          />
        </div>
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
          {isPending ? "Criando conta..." : "Criar Conta"}
        </button.Button>
        <p className="text-center text-sm text-gray-100">
          Ja tem uma conta? <Link href="/login" className= "text-brand-primary font-semibold">Faça o login</Link>
        </p>
      </form>
      </CardContent>
   </Card>

  );
}


