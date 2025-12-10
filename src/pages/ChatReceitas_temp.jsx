import { useState } from "react";
import ListaMenssagens from "../componentes/ListaMenssagens";
import ChatBox from "../componentes/ChatBox.jsx";
import ThemeToggle from "../componentes/ThemeToggle.jsx";
import MobileToggle from "../componentes/MobileToggle.jsx";
import { Api } from "../services/Api";

const ChatReceitas = () => {
  const [loading, setLoading] = useState(false);
  const [conversaAtual, setConversaAtual] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarEnabled, setSidebarEnabled] = useState(true);
  const [conversas, setConversas] = useState([
    {
      id: 0,
      titulo: "Nova conversa",
      mensagens: [
        {
          id: 1,
          texto:
            "Olá! Eu sou o Dev Chef, seu assistente pessoal para receitas deliciosas. Como posso ajudar você hoje?",
          remetente: "bot",
        },
      ],
    },
  ]);

  const mensagens = conversas[conversaAtual]?.mensagens || [];
  const setMensagens = (novasMensagens) => {
    setConversas((prev) =>
      prev.map((conversa, index) =>
        index === conversaAtual
          ? {
              ...conversa,
              mensagens:
                typeof novasMensagens === "function"
                  ? novasMensagens(conversa.mensagens)
                  : novasMensagens,
            }
          : conversa
      )
    );
  };

  // Aqui vamos fazer uma chamada API para enviar a mensagem do usuário e receber a resposta do bot
  const onEnviarMessagem = async (Mensagem) => {
    const novaMensagemUsuario = {
      id: Date.now(),
      texto: Mensagem,
      remetente: "usuario",
    };
    setMensagens((prevMensagens) => [...prevMensagens, novaMensagemUsuario]);
    setLoading(true);
    try {
      const resposta = await Api(Mensagem);

      const novaMensagemBot = {
        id: Date.now() + 1,
        texto: resposta,
        remetente: "bot",
      };
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagemBot]);
    } catch (error) {
      const novaMensagem = {
        id: Date.now(),
        texto: "Falha ao enviar, tente novamente.",
        remetente: "bot",
      };
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagem]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800 mobile-container">
      {/* Mobile Toggle ou Show Sidebar Button */}
      {!sidebarEnabled ? (
        <button
          onClick={() => setSidebarEnabled(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
          title="Mostrar sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      ) : (
        <MobileToggle
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {sidebarEnabled && (
        <div
          className={`w-64 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white flex flex-col h-full transition-transform duration-300 md:relative md:translate-x-0 mobile-sidebar border-r border-gray-200 dark:border-gray-600 ${
            sidebarOpen ? "open z-60" : "z-50"
          }`}
        >
          {/* Header da Sidebar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <h1 className="text-xl font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
              👨‍🍳 Dev Chef
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Assistente de Receitas
            </p>
          </div>

          {/* Nova Conversa */}
          <div className="p-4">
            <button
              onClick={() => {
                const novaConversa = {
                  id: conversas.length,
                  titulo: "Nova conversa",
                  mensagens: [
                    {
                      id: Date.now(),
                      texto:
                        "Olá! Eu sou o Dev Chef, seu assistente pessoal para receitas deliciosas. Como posso ajudar você hoje?",
                      remetente: "bot",
                    },
                  ],
                };
                setConversas([...conversas, novaConversa]);
                setConversaAtual(conversas.length);
              }}
              className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span>+</span>
              Nova conversa
            </button>
          </div>

          {/* Lista de conversas anteriores */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto custom-scroll">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Conversas
            </div>
            <div className="space-y-1">
              {conversas.map((conversa, index) => {
                // Gerar título baseado na primeira mensagem do usuário
                const primeiraMsg = conversa.mensagens.find(
                  (m) => m.remetente === "usuario"
                );
                const titulo = primeiraMsg
                  ? primeiraMsg.texto.substring(0, 30) +
                    (primeiraMsg.texto.length > 30 ? "..." : "")
                  : conversa.titulo;

                return (
                  <div
                    key={conversa.id}
                    onClick={() => setConversaAtual(index)}
                    className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
                      index === conversaAtual
                        ? "bg-blue-100 dark:bg-gray-600 text-blue-800 dark:text-white"
                        : "hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {titulo}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer da Sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Powered by OpenAI
              </div>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setSidebarEnabled(false)}
              className="w-full px-3 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-700 dark:text-red-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
              title="Ocultar sidebar"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Ocultar Menu
            </button>
          </div>
        </div>
      )}

      {/* Área Principal do Chat */}
      <div
        className={`flex flex-col h-screen mobile-chat ${
          sidebarEnabled ? "flex-1" : "w-full"
        }`}
      >
        {/* Header do Chat */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dev Chef - Assistente de Receitas
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-500">Online</span>
            </div>
          </div>
        </div>

        {/* Área das Mensagens */}
        <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden">
          <ListaMenssagens mensagens={mensagens} loading={loading} />
        </div>

        {/* Input do Chat */}
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <ChatBox onEnviarMessagem={onEnviarMessagem} desabilitado={loading} />
        </div>
      </div>
    </div>
  );
};

export default ChatReceitas;
