# Contexto do Projeto — Ocorrências Urbanas (Backend)

## 1) Visão Geral

API backend para autenticação de usuários e gestão de categorias (base inicial para o domínio de “ocorrências urbanas”). Implementada em Node.js + TypeScript com Express, Prisma ORM e PostgreSQL.

## 2) Stack e Versões

### Runtime e Linguagem

- Node.js: (não fixado no repositório)
- TypeScript: ^5.9.3
- Execução em dev: `tsx` ^4.21.0

### API / HTTP

- Express: ^5.2.1
- CORS: ^2.8.5
- dotenv: ^17.2.3

### Auth e Segurança

- jsonwebtoken: ^9.0.3
- bcryptjs: ^2.4.3

### Banco de Dados / ORM

- PostgreSQL driver: pg ^8.16.3
- Prisma CLI: ^6.19.1
- Prisma Client: ^6.19.1
- Adapter PostgreSQL: @prisma/adapter-pg ^7.2.0

### Validação

- Zod: ^4.2.1

Fonte: [package.json](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/package.json)

## 3) Arquitetura (Rotas → Controller → Service → Prisma → DB)

Padrão usado no backend:

1. **Rotas** (Router do Express) mapeiam o endpoint para middlewares e controller.
2. **Middlewares** fazem cross-cutting concerns (auth, autorização, validação de schema).
3. **Controller** recebe a requisição, extrai dados e chama o **Service**.
4. **Service** contém a regra de negócio e faz operações via **Prisma Client**.
5. **Controller** devolve a resposta (JSON) ao usuário.

Arquivos principais:

- Rotas: [routes.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/routes.ts)
- Server: [server.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/server.ts)
- Controllers: [src/controllers](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/controllers)
- Services: [src/serves](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/serves)
- Prisma client wrapper: [src/prisma/index.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/prisma/index.ts)

## 4) Organização de Pastas

Raiz do backend:

- `src/server.ts`: bootstrap do Express, JSON parser, CORS, router e handler de erros.
- `src/routes.ts`: definição dos endpoints.
- `src/controllers/`: camada de entrada (HTTP).
  - `user/`: controllers relacionados a usuário e auth.
  - `category/`: controllers de categoria.
  - `ocorrencia/`: controllers de ocorrências.
  - `ordemServico/`: controllers de ordem de serviço.
- `src/serves/`: camada de serviço (regras de negócio).
  - `user/`: serviços de usuário/auth/detalhe.
  - `category/`: serviços de categoria.
  - `ocorrencias/`: serviços de ocorrências.
  - `ordemServico/`: serviços de ordem de serviço.
- `src/middlewares/`: auth, autorização e validação.
- `src/schemas/`: schemas Zod para validar `req.body/query/params`.
- `src/prisma/`: inicialização do Prisma Client.
- `src/generated/prisma/`: Prisma Client gerado (saída customizada).
- `src/@types/express/`: extensão de tipos do Express (`req.user_id`).

## 5) Middlewares (Auth, Admin, Validação)

### 5.1) isAuthenticated (JWT)

Arquivo: [isAuthenticated.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/middlewares/isAuthenticated.ts)

- Lê `Authorization: Bearer <token>`.
- Faz `verify` usando `process.env.JWT_SECRET`.
- Extrai `sub` do token e converte para número.
- Define `req.user_id` para uso em controllers/autorizações.

### 5.2) isAdmin (Autorização por Role)

Arquivo: [isAdmin.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/middlewares/isAdmin.ts)

- Requer que `req.user_id` exista e seja `number`.
- Busca o usuário no banco (Prisma) e checa `role === "ADMIN"`.
- Retorna 401/403 quando o usuário não tem permissão.

### 5.3) validateSchema (Zod)

Arquivo: [validateSchema.ts](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/src/middlewares/validateSchema.ts)

- Executa `schema.parseAsync({ body, query, params })`.
- Se falhar com `ZodError`, responde `400` com `details`.

## 6) Funcionalidades e Rotas

Lista completa de funcionalidades mapeadas para Rotas, Controllers e Services.

### 6.1) Usuários e Autenticação
- **Criar Usuário**: `POST /users`
  - Controller: `CreateUserController`
  - Service: `CreateUserService`
- **Login**: `POST /login`
  - Controller: `AuthUserController`
  - Service: `AuthUserService`
- **Detalhes do Usuário**: `GET /detail`
  - Controller: `DetailUserController`
  - Service: `DetailUserService`

### 6.2) Categorias
- **Criar Categoria** (Admin): `POST /category`
  - Controller: `CreateCategoryController`
  - Service: `CreateCategoryService`
- **Listar Categorias**: `GET /category`
  - Controller: `ListCategoryController`
  - Service: `ListCategoryService`
- **Listar Ocorrências por Categoria**: `GET /category/ocorrencias`
  - Controller: `ListOcorrenciasByCategoryController`
  - Service: `ListOcorrenciasByCategoryService`

### 6.3) Ocorrências
- **Criar Ocorrência** (Admin, Upload): `POST /ocorrencias`
  - Controller: `CreateOcorrenciasController`
  - Service: `CreateOcorrenciasService`
- **Listar Ocorrências**: `GET /ocorrencias`
  - Controller: `ListOcorrenciaController`
  - Service: `ListOcorrenciaService`
- **Deletar Ocorrência** (Admin): `DELETE /ocorrencias/:id`
  - Controller: `DeleteOcorrenciasController`
  - Service: `DeleteOcorrenciasService`

### 6.4) Ordem de Serviço
- **Criar Ordem**: `POST /ordem-servico`
  - Controller: `CreateOrdemServicoController`
  - Service: `CreateOrdemServicoService`
- **Listar Ordens**: `GET /ordem-servico`
  - Controller: `ListOrdersController`
  - Service: `ListOrdersService`
- **Detalhar Ordem**: `GET /ordem-servico/detail`
  - Controller: `DetailOrdemServicoController`
  - Service: `DetailOrdemServicoService`
- **Enviar Ordem (Send)**: `PUT /ordem-servico`
  - Controller: `SendOrdemController`
  - Service: `SendOrdemService`
- **Finalizar Ordem**: `PUT /ordem-servico/finish`
  - Controller: `FinishOrdemServicoController`
  - Service: `FinishOrdemServicoService`
- **Remover Ocorrência da Ordem**: `DELETE /ordem-servico/remove`
  - Controller: `RemoveOcorrenciaFromOrdemController`
  - Service: `RemoveOcorrenciaFromOrdemService`
- **Deletar Ordem**: `DELETE /ordem-servico`
  - Controller: `DeleteOrdemServicoController`
  - Service: `DeleteOrdemService`

Para detalhes completos de payload e resposta, consulte [endpoints.md](./endpoints.md).

## 7) Modelagem do Banco de Dados (Prisma + PostgreSQL)

Arquivo: [schema.prisma](file:///c:/Users/Fatima/Desktop/Ocorrencias_Urbanas/backend/prisma/schema.prisma)

### Enums
- `Role`: `CIDADAO | STAFF | ADMIN`
- `Gravidade`: `BAIXA | MEDIA | ALTA`
- `StatusOcorrencia`: `PENDENTE | EM_ANALISE | ATRASADA | CONCLUIDA | CANCELADA`

### Entidades Principais
- **User**: Usuários do sistema (Cidadão, Staff, Admin).
- **Admin**: Extensão de User para privilégios administrativos.
- **Endereco**: Endereço das ocorrências.
- **Categoria**: Categorização das ocorrências (ex: Iluminação, Buraco).
- **Ocorrencia**: Registro principal do problema urbano.
- **ImagemOcorrencia**: Fotos anexadas à ocorrência.
- **OrdenServico**: Ordens de serviço geradas a partir de ocorrências.
- **Comentario, HistoricoStatus, Avaliacao**: Tabelas auxiliares de relacionamento.

## 8) Scripts NPM

- `npm run dev`: `tsx watch src/server.ts`
- `npm run typecheck`: `tsc --noEmit`
- `npm run build`: Compila para `dist/`
- `npm start`: Roda `dist/server.js`
