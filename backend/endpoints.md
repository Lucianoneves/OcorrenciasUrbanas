# Endpoints da API - Ocorrências Urbanas

Documentação completa dos endpoints disponíveis na API, incluindo autenticação, parâmetros e exemplos.

## Visão Geral

- **Base URL**: `http://localhost:3333` (padrão)
- **Autenticação**: Bearer Token (JWT) enviado no header `Authorization`.
- **Formato**: JSON para a maioria dos endpoints; `multipart/form-data` para upload de imagens.

---

## 1. Usuários e Autenticação

### 1.1 Criar Usuário
Cria um novo usuário no sistema.

- **Método**: `POST`
- **URL**: `/users`
- **Auth**: Não requerida.
- **Body** (JSON):
  ```json
  {
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "password": "senha123"
  }
  ```
- **Validação**:
  - `name`: Min 3 chars.
  - `email`: Email válido.
  - `password`: Min 6 chars.

### 1.2 Login
Autentica um usuário e retorna o token JWT.

- **Método**: `POST`
- **URL**: `/login`
- **Auth**: Não requerida.
- **Body** (JSON):
  ```json
  {
    "email": "fulano@email.com",
    "password": "senha123"
  }
  ```
- **Resposta Sucesso (200)**:
  ```json
  {
    "id": 1,
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 1.3 Detalhes do Usuário
Retorna informações do usuário autenticado.

- **Método**: `GET`
- **URL**: `/detail`
- **Auth**: `Bearer Token`
- **Resposta Sucesso (200)**:
  ```json
  {
    "id": 1,
    "name": "Fulano de Tal",
    "email": "fulano@email.com",
    "role": "CIDADAO",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
  ```

---

## 2. Categorias

### 2.1 Criar Categoria
Cria uma nova categoria de ocorrência. Requer privilégios de Admin.

- **Método**: `POST`
- **URL**: `/category`
- **Auth**: `Bearer Token` (Admin)
- **Body** (JSON):
  ```json
  {
    "nome": "Iluminação Pública",
    "descricao": "Postes apagados ou danificados" // Opcional no schema, mas suportado
  }
  ```

### 2.2 Listar Categorias
Lista todas as categorias disponíveis.

- **Método**: `GET`
- **URL**: `/category`
- **Auth**: `Bearer Token`
- **Resposta Sucesso (200)**:
  ```json
  [
    {
      "id": 1,
      "nome": "Iluminação Pública"
    },
    {
      "id": 2,
      "nome": "Buracos"
    }
  ]
  ```

### 2.3 Listar Ocorrências por Categoria
Filtra ocorrências por uma categoria específica.

- **Método**: `GET`
- **URL**: `/category/ocorrencias`
- **Auth**: `Bearer Token`
- **Query Params**:
  - `categoryId`: ID da categoria (obrigatório).
- **Exemplo**: `/category/ocorrencias?categoryId=1`

---

## 3. Ocorrências

### 3.1 Criar Ocorrência
Registra uma nova ocorrência urbana com imagem.

- **Método**: `POST`
- **URL**: `/ocorrencias`
- **Auth**: `Bearer Token` (Admin)
- **Content-Type**: `multipart/form-data`
- **Body (FormData)**:
  - `file`: Arquivo de imagem (obrigatório).
  - `titulo`: "Poste caído" (texto).
  - `descricao`: "Poste caiu na rua X" (texto).
  - `endereco`: "Rua das Flores, 123" (texto).
  - `categoriaId`: "1" (texto/número).
  - `protocolo`: "PROT-123" (texto).
  - `gravidade`: "ALTA" (opcional).
  - `status`: "PENDENTE" (opcional).

### 3.2 Listar Ocorrências
Lista todas as ocorrências cadastradas.

- **Método**: `GET`
- **URL**: `/ocorrencias`
- **Auth**: `Bearer Token`
- **Query Params**:
  - `disable`: `true` ou `false` (opcional, default `false`).
- **Resposta Sucesso (200)**:
  ```json
  [
    {
      "id": 1,
      "titulo": "Poste caído",
      "descricao": "Poste caiu na rua X",
      "status": "PENDENTE",
      "imagens": [{ "url": "..." }]
    }
  ]
  ```

### 3.3 Deletar Ocorrência
Remove uma ocorrência do sistema.

- **Método**: `DELETE`
- **URL**: `/ocorrencias/:id`
- **Auth**: `Bearer Token` (Admin)
- **Params**:
  - `id`: ID da ocorrência na URL.

---

## 4. Ordem de Serviço

### 4.1 Criar Ordem de Serviço
Gera uma nova OS vinculada a uma ocorrência.

- **Método**: `POST`
- **URL**: `/ordem-servico`
- **Auth**: `Bearer Token`
- **Body** (JSON):
  ```json
  {
    "numero": 1001,
    "name": "Equipe Alpha",
    "ocorrenciaId": 1
  }
  ```

### 4.2 Listar Ordens de Serviço
Lista todas as ordens de serviço.

- **Método**: `GET`
- **URL**: `/ordem-servico`
- **Auth**: `Bearer Token`

### 4.3 Detalhar Ordem de Serviço
Obtém detalhes de uma OS específica.

- **Método**: `GET`
- **URL**: `/ordem-servico/detail`
- **Auth**: `Bearer Token`
- **Query Params**:
  - `ordenServicoId`: ID da ordem (obrigatório).
- **Exemplo**: `/ordem-servico/detail?ordenServicoId=5`

### 4.4 Enviar Ordem (Send)
Atualiza/Envia uma ordem de serviço (geralmente altera status ou atribuição).

- **Método**: `PUT`
- **URL**: `/ordem-servico`
- **Auth**: `Bearer Token`
- **Body** (JSON):
  ```json
  {
    "ordenServicoId": 5,
    "name": "Novo Responsável"
  }
  ```

### 4.5 Finalizar Ordem de Serviço
Marca uma OS como finalizada/concluída.

- **Método**: `PUT`
- **URL**: `/ordem-servico/finish`
- **Auth**: `Bearer Token`
- **Body** (JSON):
  ```json
  {
    "ordenServicoId": 5
  }
  ```

### 4.6 Remover Ocorrência da Ordem
Desvincula ou remove um item da ordem de serviço.

- **Método**: `DELETE`
- **URL**: `/ordem-servico/remove`
- **Auth**: `Bearer Token`
- **Body** (JSON):
  ```json
  {
    "numero": 1001,
    "ocorrenciaId": 1
  }
  ```
  *(Nota: Payload depende da implementação exata do `RemoveOcorrenciaFromOrdemService`)*

### 4.7 Deletar Ordem de Serviço
Exclui permanentemente uma ordem de serviço.

- **Método**: `DELETE`
- **URL**: `/ordem-servico`
- **Auth**: `Bearer Token`
- **Query Params**:
  - `ordenServicoId`: ID da ordem a ser deletada.
- **Exemplo**: `/ordem-servico?ordenServicoId=5`
