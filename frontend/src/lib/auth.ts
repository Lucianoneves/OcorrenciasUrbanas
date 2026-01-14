import { cookies } from 'next/headers'
import { apiClient } from '@/lib/api';
import { User } from '@/lib/types'
import { redirect } from 'next/navigation';

const COOKIE_NAME = "Token_ocorrenciasUrbanas";


// Get the token from the cookie
export async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value
}


// Set the token in a cookie
export async function setToken(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: true,
        secure: process.env.NODE_ENV === "production",

    })

}

// Remove the token from the cookie
export async function removeToken() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME)

}
// Get the user from the token
export async function getUser(): Promise<User | null> {

    try {
        const token = await getToken();

        if (!token) {
            return null;
        }
        const user = await apiClient<User>("/detail", {
            token: token,
        })
        return user;

    } catch (error) {
       //  console.log(error)
        return null;
    }
}

export async function  requiredAdmin (): Promise<User> {
    const user = await getUser();

    if( !user){
        redirect ("/login")
    }
    // if (user.role !== "ADMIN") {
    //     redirect ("/access-denied")
    // }

    return user;
    
}

export async function requiredUser(): Promise<User> {
    const user = await getUser();

    if (!user) {
        redirect("/login")
    }
    // if (user.role !== "CIDADAO") {
    //    redirect("/access-denied")
    // }

    return user;
}
