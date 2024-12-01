# Vitrini Dev v1

[English](#english) | [Português](#português)

# Português

Uma aplicação vitrini digital que redireciona para o WhatsApp do vendedor construída com Next.js com gerenciamento de carrinho, fluxo de checkout e integração com WhatsApp.

## Funcionalidades

- Catálogo de produtos com exibição em cards
- Gerenciamento de carrinho de compras
- Busca de endereço via CEP
- Processo de checkout com validação de formulário
- Integração de pedidos via WhatsApp
- Design responsivo com suporte mobile

## Tecnologias Utilizadas

- Next.js
- TypeScript
- React Hooks
- Tailwind CSS
- Validação de formulários
- Integração com ViaCEP

## Iniciando o Projeto

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:
npm run dev

Copy

Execute

Acesse http://localhost:3000
Como Contribuir
Sinta-se à vontade para contribuir com este projeto enviando pull requests ou criando issues.

# English
An e-commerce application built with Next.js featuring cart management, checkout flow and WhatsApp integration.

## Features
Product catalog with cards display
Shopping cart management
Address lookup via CEP integration
Checkout process with form validation
WhatsApp order integration
Responsive design with mobile support

## Tech Stack
Next.js
TypeScript
React Hooks
Tailwind CSS
Form validation
ViaCEP API integration

## Project Structure
/app - Next.js app directory and routes
/components - Reusable UI components
/types - TypeScript interfaces and types
/utils - Utility functions
/hooks - Custom React hooks

## Core Components
Product Card - Display of individual products
Cart Sidebar - Shopping cart management
Checkout Modal - Order finalization flow
Custom Hooks:
useCart - Shopping cart state management
usePagination - Product listing pagination
Data Models
Products: Manages product information
Cart Items: Extends products with quantity
Checkout Form: Handles order and delivery information
ViaCEP Integration: Address lookup functionality

## Getting Started
Clone the repository
Install dependencies:
npm install

Copy

Execute

Run the development server:
npm run dev

Copy

Execute

Open http://localhost:3000
Contributing
Feel free to contribute to this project by submitting pull requests or creating issues.

License
MIT