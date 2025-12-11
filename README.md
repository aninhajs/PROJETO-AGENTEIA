# Dev Chef - Assistente de Receitas com IA

> Um assistente culinário inteligente que usa OpenAI GPT para sugerir receitas personalizadas

## **Demonstração Online**

**[Acesse o Dev Chef](https://projeto-agenteia.onrender.com)** - Hospedado no Render

---

## **Índice**

- [Sobre o Projeto](#sobre-o-projeto)
- [Histórico de Desenvolvimento](#histórico-de-desenvolvimento)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Uso](#instalação-e-uso)
- [Deploy](#deploy)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)

---

## **Sobre o Projeto**

O **Dev Chef** é um assistente culinário inteligente que ajuda usuários a descobrir receitas deliciosas com base nos ingredientes que têm em casa. Utilizando a API da OpenAI, o sistema gera sugestões personalizadas com instruções claras e ingredientes acessíveis.

### **Características Principais:**

- **IA Integrada**: Powered by OpenAI GPT-4o-mini
- **Interface ChatGPT-style**: Design moderno e intuitivo
- **Responsivo**: Funciona em desktop e mobile
- **Tema Escuro/Claro**: Alternância automática
- **Múltiplas Conversas**: Histórico de chat organizados
- **Fast & Reliable**: Deploy otimizado no Render

---

## **Histórico de Desenvolvimento**

### **Fase 1: Estruturação Inicial**

- Criação da estrutura básica React + Vite
- Configuração do backend Node.js + Express
- Integração inicial com OpenAI API
- Sistema de roteamento e controllers

### **Fase 2: Interface de Usuario**

- Desenvolvimento de componentes React modulares
- Criação do sistema de chat interativo
- Implementação de ListaMensagens e ChatBox
- Estilização com TailwindCSS

### **Fase 3: Melhorias de UX/UI**

- Redesign completo no estilo ChatGPT
- Sistema de sidebar com múltiplas conversas
- Toggle de tema escuro/claro
- Responsividade total para mobile
- Componentes ThemeToggle, MobileToggle, Toast

### **Fase 4: Deploy e Produção**

- Configuração para deploy no Render
- Otimização do processo de build
- Configuração de variáveis de ambiente
- Sistema de fallback (modo DEMO sem OpenAI)
- Correção de URLs para produção

### **Fase 5: Limpeza e Documentação**

- Remoção de arquivos duplicados e desnecessários
- Organização da estrutura do projeto
- Documentação completa
- README detalhado com histórico

---

## **Tecnologias Utilizadas**

### **Frontend:**

- **React 19.1.1** - Library principal
- **Vite 7.1.7** - Build tool moderna
- **TailwindCSS 4.1.14** - Estilização utilitária
- **Axios 1.12.2** - Cliente HTTP

### **Backend:**

- **Node.js 18+** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **OpenAI 4.20.1** - API de IA generativa
- **CORS 2.8.5** - Cross-origin requests
- **dotenv 16.3.1** - Variáveis de ambiente

### **Deploy & Infraestrutura:**

- **Render.com** - Hospedagem cloud
- **GitHub** - Controle de versão
- **Git Actions** - Deploy automático

---

## **Estrutura do Projeto**

```
projeto-agenteIA/
├── README.md                    # Documentação principal
├── package.json                 # Dependências backend
├── server.js                    # Servidor Express principal
├── render.yaml                  # Configuração Render
├── .env.example                 # Template variáveis ambiente
├── .gitignore                   # Arquivos ignorados Git
├── DEPLOY.md                    # Guia de deploy
│
├── src/                         # Backend source
│   ├── services/
│   │   ├── openai.services.js   # Integração OpenAI + DEMO
│   │   ├── controllers/
│   │   │   └── receitas.controller.js
│   │   └── routes/
│   │       └── receitas.rotas.js
│
├── public/                      # Build estático React
│   ├── index.html              # HTML principal
│   └── assets/                 # CSS/JS compilados
│
├── interfaces-receitas/         # Frontend source
│   ├── package.json            # Dependências frontend
│   ├── vite.config.js          # Configuração Vite
│   ├── eslint.config.js        # Linting rules
│   │
│   └── src/
│       ├── main.jsx            # Entry point React
│       ├── App.jsx             # Componente root
│       ├── index.css           # Estilos globais
│       │
│       ├── pages/
│       │   └── ChatReceitas.jsx    # Página principal chat
│       │
│       ├── componentes/
│       │   ├── ChatBox.jsx         # Input mensagens
│       │   ├── ListaMensagens.jsx  # Container mensagens
│       │   ├── Mensagem.jsx        # Card mensagem individual
│       │   ├── ThemeToggle.jsx     # Toggle tema
│       │   ├── MobileToggle.jsx    # Menu mobile
│       │   └── Toast.jsx           # Notificações
│       │
│       └── services/
│           └── Api.js              # Cliente HTTP backend
```

---

## **Instalação e Uso**

### **Pré-requisitos:**

- Node.js 18+ instalado
- Conta OpenAI (opcional - tem modo DEMO)
- Git configurado

### **1. Clone do Repositório:**

```bash
git clone https://github.com/aninhajs/PROJETO-AGENTEIA.git
cd PROJETO-AGENTEIA
```

### **2. Configuração Backend:**

```bash
# Instalar dependências
npm install

# Configurar variáveis ambiente
cp .env.example .env

# Editar .env com sua chave OpenAI (opcional)
# OPENAI_API_KEY=sk-proj-xxxxxxxxxx
```

### **3. Configuração Frontend:**

```bash
cd interfaces-receitas
npm install
```

### **4. Desenvolvimento Local:**

**Terminal 1 - Backend:**

```bash
npm run dev
# Servidor rodando em http://localhost:3000
```

**Terminal 2 - Frontend:**

```bash
cd interfaces-receitas
npm run dev
# Interface em http://localhost:5174
```

### **5. Build para Produção:**

```bash
# Build frontend
cd interfaces-receitas
npm run build
cp -r dist/* ../public/

# Iniciar servidor produção
cd ..
npm start
```

---

## **Deploy**

### **Render.com (Recomendado):**

1. **Fork do repositório** no GitHub
2. **Conecte no Render:** https://render.com
3. **Configure o Web Service:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Adicione variáveis ambiente:**
   - `NODE_ENV=production`
   - `OPENAI_API_KEY=sua_chave` (opcional)
5. **Deploy automático** a cada push

### **Outras Plataformas:**

- **Vercel:** Configure build para Node.js
- **Heroku:** Adicione `Procfile`
- **Railway:** Deploy direto do GitHub

---

## **Funcionalidades**

### **Funcionalidades Principais:**

- **Chat Inteligente:** Conversa natural sobre receitas
- **Sugestões Personalizadas:** Baseadas nos ingredientes informados
- **Múltiplas Conversas:** Organize diferentes pesquisas
- **Histórico Persistente:** Navegue entre conversas antigas
- **Modo DEMO:** Funciona mesmo sem chave OpenAI

### **Interface & UX:**

- **Design ChatGPT-style:** Interface familiar e moderna
- **Tema Escuro/Claro:** Alternância automática baseada no sistema
- **Totalmente Responsivo:** Mobile-first design
- **Animações Suaves:** Transições e micro-interações
- **Acessibilidade:** Navegação por teclado e screen readers

### **Performance & Qualidade:**

- **Fast Loading:** Otimizado com Vite
- **Error Handling:** Tratamento robusto de erros
- **TypeScript Ready:** Estrutura preparada para TS
- **SEO Friendly:** Meta tags otimizadas
- **Progressive Enhancement:** Funciona sem JavaScript

---

## **O Que Mudamos Durante o Desenvolvimento**

### **Arquitetura:**

- **ANTES:** Estrutura monolítica simples
- **DEPOIS:** Arquitetura modular com separação clara frontend/backend

### **Interface:**

- **ANTES:** Interface básica com estilização simples
- **DEPOIS:** Design profissional no estilo ChatGPT com sidebar dinâmica

### **Funcionalidades:**

- **ANTES:** Chat simples de uma conversa
- **DEPOIS:** Sistema completo de múltiplas conversas com histórico

### **Deploy:**

- **ANTES:** Apenas desenvolvimento local
- **DEPOIS:** Deploy automatizado no Render com CI/CD

### **Qualidade:**

- **ANTES:** Código básico funcional
- **DEPOIS:** Código limpo, documentado e com tratamento de erros

---

## **Contribuição**

### **Como Contribuir:**

1. **Fork** o repositório
2. **Crie** uma branch para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. **Commit** suas mudanças
   ```bash
   git commit -m "feat: adicionar nova funcionalidade"
   ```
4. **Push** para a branch
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. **Abra** um Pull Request

### **Tipos de Contribuição:**

- **Bug Fixes:** Correção de problemas
- **Features:** Novas funcionalidades
- **Documentação:** Melhorias na docs
- **Estilo:** Melhorias de UI/UX
- **Performance:** Otimizações
- **Testes:** Adição de testes

---

## **Suporte & Contato**

- **Email:** [Deixe seu contato]
- **GitHub:** [@aninhajs](https://github.com/aninhajs)
- **LinkedIn:** [Seu LinkedIn]

---

## **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## **Agradecimentos**

- **OpenAI** pela excelente API GPT
- **Render** pela hospedagem gratuita e confiável
- **TailwindCSS** pelo sistema de design utilitário
- **Vite** pela experiência de desenvolvimento incrível

---

<div align="center">

**Feito com carinho por [Ana Julia]**

[![GitHub](https://img.shields.io/badge/GitHub-aninhajs-black?style=for-the-badge&logo=github)](https://github.com/aninhajs)
[![Deploy](https://img.shields.io/badge/Deploy-Render-brightgreen?style=for-the-badge&logo=render)](https://projeto-agenteia.onrender.com)
[![OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-blue?style=for-the-badge&logo=openai)](https://openai.com)

</div>
