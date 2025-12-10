# Dev Chef - Interface de Chat Estilo ChatGPT

## 🎨 Design Renovado

A interface foi completamente redesenhada para se parecer com o ChatGPT, incluindo:

### ✨ Principais Funcionalidades

- **Layout Similar ao ChatGPT**: Sidebar escura + área principal clara
- **Tema Escuro/Claro**: Toggle automático com preferência do sistema
- **Múltiplas Conversas**: Crie e alterne entre diferentes conversas
- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Animações Suaves**: Transições e efeitos visuais polidos

### 🛠️ Componentes Implementados

#### 1. **ChatReceitas** (Página Principal)

- Layout com sidebar + área principal
- Gerenciamento de múltiplas conversas
- Interface responsiva com toggle mobile

#### 2. **Sidebar Funcional**

- Lista de conversas dinâmica
- Botão para nova conversa
- Toggle de tema escuro/claro
- Navegação entre conversas

#### 3. **ChatBox Melhorado**

- Textarea com auto-resize
- Placeholder informativo
- Envio com Enter (Shift+Enter para nova linha)
- Botão de envio com ícone
- Design similar ao ChatGPT

#### 4. **Sistema de Mensagens**

- Layout de cards limpo
- Avatares diferenciados (Bot vs Usuário)
- Botões de ação funcionais (copiar, like, dislike)
- Indicador de "digitando..."

#### 5. **Componentes Adicionais**

- **ThemeToggle**: Alternância entre tema claro/escuro
- **MobileToggle**: Menu hambúrguer para mobile
- **Toast**: Notificações de feedback
- **Mensagem**: Cards de mensagem estilizados

### 🎯 Melhorias de UX/UI

#### Visual

- ✅ Paleta de cores similar ao ChatGPT
- ✅ Tipografia moderna e legível
- ✅ Espaçamentos consistentes
- ✅ Scrollbar customizada
- ✅ Animações suaves

#### Funcional

- ✅ Múltiplas conversas simultâneas
- ✅ Auto-resize do textarea
- ✅ Navegação por teclado
- ✅ Feedback visual (loading, toast)
- ✅ Responsividade completa

#### Acessibilidade

- ✅ Tooltips informativos
- ✅ Contraste adequado
- ✅ Navegação por teclado
- ✅ Texto alternativo para ícones

### 📱 Responsividade

#### Desktop (≥768px)

- Sidebar fixa visível
- Layout de duas colunas
- Hover effects completos

#### Mobile (<768px)

- Sidebar retrátil com overlay
- Menu hambúrguer
- Layout adaptável
- Touch-friendly

### 🚀 Como Usar

1. **Iniciar o servidor**:

   ```bash
   cd interfaces-receitas
   npm run dev
   ```

2. **Acessar a aplicação**:

   - Abra `http://localhost:5174` no navegador

3. **Funcionalidades principais**:
   - Digite perguntas sobre receitas no campo de input
   - Crie novas conversas com o botão "+"
   - Alterne entre conversas na sidebar
   - Use o toggle de tema no canto inferior da sidebar
   - Em mobile, use o botão hambúrguer para acessar a sidebar

### 🔧 Estrutura Técnica

```
src/
├── components/
│   ├── ChatBox.jsx          # Input de mensagens
│   ├── ListaMensagens.jsx   # Container de mensagens
│   ├── Mensagem.jsx         # Card individual de mensagem
│   ├── ThemeToggle.jsx      # Toggle tema claro/escuro
│   ├── MobileToggle.jsx     # Menu hambúrguer mobile
│   └── Toast.jsx            # Sistema de notificações
├── pages/
│   └── ChatReceitas.jsx     # Página principal
├── services/
│   └── Api.js               # Integração com backend
└── index.css                # Estilos globais customizados
```

### 🎨 Customizações CSS

- Scrollbar personalizada
- Animações de entrada
- Classes utilitárias customizadas
- Responsividade com breakpoints
- Suporte completo a tema escuro

### 🔄 Estado da Aplicação

A aplicação mantém estado para:

- Lista de conversas ativas
- Conversa atual selecionada
- Estado de loading
- Tema preferido do usuário
- Estado da sidebar mobile

---

**Resultado**: Interface moderna, funcional e profissional que replica a experiência do ChatGPT para o domínio de receitas culinárias. ✨
