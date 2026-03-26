# 🧠 Hypesoft Gestão de Produtos

Sistema fullstack de gerenciamento de produtos com controle de estoque, desenvolvido com arquitetura em camadas e containerização via Docker.

Projeto focado em boas práticas de desenvolvimento, organização de código e experiência do usuário.

## 🚀 Tecnologias

- **Frontend:** React 19 + Vite + TypeScript
- **Backend:** .NET 9 (C#)
- **Banco de dados:** MongoDB
- **Autenticação:** Keycloak (OpenID Connect)
- **Containerização:** Docker + Docker Compose
- **Proxy:** Nginx

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Docker Desktop 4.0+
- Node.js 18+ (caso queira rodar o frontend fora do container)
- .NET 9 SDK (caso queira rodar o backend fora do container)

## ⚙️ Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/Vyneelric/Hypesoft_Test.git
cd Hypesoft_Test
```

### 2. Copie as variáveis de ambiente

```bash
cp Front-End_Hypesoft/.env.example Front-End_Hypesoft/.env
```

### 3. Suba os containers com Docker

```bash
cd Back-end_Hypesoft
docker-compose up -d
```

Esse comando irá subir automaticamente:

- API (.NET)
- Banco de dados (MongoDB)
- Mongo Express (interface visual do banco)
- Keycloak (autenticação)
- Nginx (reverse proxy)

## 🌐 Acessos

Após subir o projeto, acesse:

| Serviço | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API (Swagger) | http://localhost:5000/swagger/index.html |
| Mongo Express | http://localhost:8081 |
| Keycloak | http://localhost:8080 |

## 🔐 Autenticação

O sistema utiliza o Keycloak para autenticação e autorização via OpenID Connect.

### 🔧 Acesso ao painel admin do Keycloak

- Usuário: `admin`
- Senha: `admin`

> Usado para acessar o painel administrativo do Keycloak e gerenciar usuários, roles e clients.

---

### ⚙️ Configuração do Keycloak

Após subir os containers, acesse `http://localhost:8080` e configure:

1. Crie o realm: `hypesoft`
2. Crie o client: `hypesoft-frontend` (OpenID Connect, público)
   - Valid redirect URIs: `http://localhost:3000/*`
   - Web origins: `+`
3. Crie as roles: `admin`, `user`
4. Crie um usuário, defina a senha (desative Temporary) e atribua uma role

## 📁 Estrutura do projeto

```
Hypesoft_Test/
├── Back-end_Hypesoft/
│   ├── Hypersoft.API/
│   │   ├── Controllers/
│   │   └── Middlewares/
│   ├── Hypersoft.Application/
│   │   ├── Commands/
│   │   ├── Queries/
│   │   ├── Handlers/
│   │   ├── DTOs/
│   │   └── Validators/
│   ├── Hypersoft.Domain/
│   │   ├── Entities/
│   │   └── Repositories/
│   ├── Hypersoft.Infrastructure/
│   │   ├── Data/
│   │   └── Repositories/
│   ├── nginx/
│   │   └── nginx.conf
│   ├── docker-compose.yml
│   └── Dockerfile
│
├── Front-End_Hypesoft/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       └── services/
│
└── README.md
```

## 🧠 Arquitetura

O backend foi estruturado seguindo princípios de **Clean Architecture**:

- **API:** Camada de entrada (controllers e middlewares)
- **Application:** Regras de negócio, comandos e queries (CQRS + MediatR)
- **Domain:** Entidades e contratos dos repositórios
- **Infrastructure:** Acesso ao MongoDB e implementação dos repositórios

O frontend segue uma arquitetura baseada em:

- Componentização com Shadcn/ui
- Separação por responsabilidade
- Consumo de API via services (axios)
- Gerenciamento de estado com TanStack Query

## ⚙️ Decisões técnicas

- **MongoDB** pela flexibilidade de schema e facilidade de evolução
- **Docker** para padronização de ambiente e facilidade de execução
- **Keycloak** para autenticação robusta e escalável via OAuth2/OpenID Connect
- **Clean Architecture + CQRS** para organização e manutenção do backend
- **Nginx** como reverse proxy para não expor a API diretamente
- **Vite** pela velocidade no desenvolvimento frontend

## 🔌 API

Documentação completa disponível no Swagger em `http://localhost:5000/swagger`.

### Endpoints principais

| Método | Endpoint | Descrição |
|---|---|---|
| GET | /api/products | Listar todos os produtos |
| POST | /api/products | Criar produto |
| GET | /api/products/{id} | Buscar por ID |
| PUT | /api/products/{id} | Atualizar produto |
| DELETE | /api/products/{id} | Excluir produto |
| GET | /api/products/search?name= | Buscar por nome |
| GET | /api/products/categories/{id} | Filtrar por categoria |
| GET | /api/products/total_value_stock | Valor total do estoque |
| GET | /api/categories | Listar categorias |
| POST | /api/categories | Criar categoria |
| DELETE | /api/categories/{id} | Excluir categoria |

## 🔒 Segurança

- Rate limiting por IP (60 req/min geral, 20 req/min para POST)
- Headers de segurança (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy)
- Sanitização de entradas via FluentValidation
- API não exposta diretamente, tráfego passa pelo Nginx

## 🧪 Testes

A validação da aplicação foi feita através de:

- Testes manuais via Swagger e Postman
- Testes de fluxo (CRUD + estoque)
- Testes de usabilidade

## Troubleshooting

### 🔸 Keycloak não carregou o realm

Verifique se você está no realm correto (não no `master`). O realm deve ser `hypesoft`. Caso necessário, reconfigure manualmente em `http://localhost:8080`.

> ⚠️ Não use `docker-compose down -v` pois isso apaga os volumes e você perderá os dados do banco.

### 🔸 Containers conflitando ao recriar

```bash
docker rm -f hypersoft-keycloak hypersoft-mongodb hypersoft-api hypersoft-mongo-express hypersoft-nginx hypersoft-frontend
docker-compose up -d --build
```

### 🔸 Erros no frontend (imports)

```bash
cd Front-End_Hypesoft
npm install
```

### 🔸 Porta em uso

Caso alguma porta esteja ocupada, altere no `docker-compose.yml`.

## 📈 Melhorias futuras

- Testes automatizados (unitários e integração)
- Paginação e filtros avançados
- Deploy em cloud (Azure / AWS)
- CI/CD pipeline
- Exportação de relatórios

## 👨‍💻 Autor

Desenvolvido por Vinícius José
Projeto criado como desafio técnico com foco em boas práticas e arquitetura escalável.

## 📄 Licença

Este projeto está sob a licença MIT.
