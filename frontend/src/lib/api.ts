const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function getApiUrl() {
  return API_URL;
}

interface FetchOptions extends RequestInit {
  token?: string;

  cache?: "force-cache" | "no-cache";

  next?: { // Next.js fetch options
    revalidate?:  false | 0 | number;
    tags?: string[];
  }
}

 // O "T" é um tipo generico do Typescript, que representa o tipo de dados que a função irá retornar.
export  async function apiClient<T>( 
    endpoint: string,
    options: FetchOptions = {}
):Promise<T> {

    const  {token, ...fetchOptions} = options;
       
    // Set default headers
    const headers: Record<string, string> = { 
      ...(fetchOptions.headers as Record<string, string>),
    }

    if(token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if(!(fetchOptions.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if(!response.ok) {
      const errorData = await response.json().catch(()=> ({
        error: `Error HTTP: ${response.status}`,
      }))
      throw new Error(errorData.error || "Erro na Requisição");
    }

    return response.json() 
}


