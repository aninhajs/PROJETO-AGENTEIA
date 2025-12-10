# 🚀 Deploy no Render - Dev Chef

## 📋 Pré-requisitos

1. Conta no [Render.com](https://render.com)
2. Repositório no GitHub atualizado
3. Chave da API da OpenAI

## 🔧 Configuração no Render

### **Passo 1: Conectar Repositório**
1. Faça login no [Render.com](https://render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu GitHub e selecione o repositório `PROJETO-AGENTEIA`

### **Passo 2: Configurações do Deploy**
```
Name: dev-chef
Environment: Node
Region: Oregon (US West)
Branch: main
Build Command: npm install && npm run build:frontend
Start Command: npm start
```

### **Passo 3: Variáveis de Ambiente**
Adicione as seguintes variáveis em **Environment**:

```
NODE_ENV = production
OPENAI_API_KEY = sua_chave_openai_aqui
PORT = 3000
```

### **Passo 4: Deploy**
1. Clique em **"Create Web Service"**
2. Aguarde o build completar (5-10 minutos)
3. Acesse a URL gerada pelo Render

## 🔍 Verificação

Após o deploy, verifique:
- [ ] Interface carregando corretamente
- [ ] Chat funcionando
- [ ] Conexão com OpenAI API
- [ ] Responsividade mobile

## 🐛 Troubleshooting

### Build Failed:
- Verifique se todas as dependências estão no `package.json`
- Confirme se o Node.js está na versão 18+

### API não funciona:
- Verifique se `OPENAI_API_KEY` está configurada
- Teste a chave da API localmente primeiro

### Interface não carrega:
- Confirme se o build do React foi gerado
- Verifique se `express.static` está configurado

## 📱 URLs

- **Produção**: https://dev-chef.onrender.com
- **Dashboard**: https://dashboard.render.com

## 🔄 Updates Automáticos

O Render fará redeploy automático sempre que você fizer push para a branch `main`.