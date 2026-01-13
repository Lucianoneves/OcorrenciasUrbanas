export interface User{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    createedAt: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    token:string
}