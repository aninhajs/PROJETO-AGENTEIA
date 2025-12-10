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
  const [conversas, setConversas] = useState([]);

  const mensagens = conversas[conversaAtual]?.mensagens || [
    {
      id: 1,
      texto:
        "Olá! Eu sou o Dev Chef, seu assistente pessoal para receitas deliciosas. Como posso ajudar você hoje?",
      remetente: "bot",
    },
  ];
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
    // Verificar se a conversa atual tem mensagens do usuário
    const conversaAtualObj = conversas[conversaAtual];
    const temMensagemUsuario = conversaAtualObj?.mensagens.some(
      (m) => m.remetente === "usuario"
    );

    // Se não tem mensagem de usuário, criar nova conversa
    if (!temMensagemUsuario) {
      const novaConversa = {
        id: Date.now(),
        titulo: Mensagem.substring(0, 30) + (Mensagem.length > 30 ? "..." : ""),
        mensagens: [
          {
            id: Date.now() - 1,
            texto:
              "Olá! Eu sou o Dev Chef, seu assistente pessoal para receitas deliciosas. Como posso ajudar você hoje?",
            remetente: "bot",
          },
        ],
      };
      setConversas((prev) => [...prev, novaConversa]);
      setConversaAtual(conversas.length);

      // Aguardar um pouco para o estado ser atualizado
      setTimeout(() => {
        const novaMensagemUsuario = {
          id: Date.now(),
          texto: Mensagem,
          remetente: "usuario",
        };
        setConversas((prev) =>
          prev.map((conversa, index) =>
            index === prev.length - 1
              ? {
                  ...conversa,
                  mensagens: [...conversa.mensagens, novaMensagemUsuario],
                }
              : conversa
          )
        );
      }, 100);
    } else {
      const novaMensagemUsuario = {
        id: Date.now(),
        texto: Mensagem,
        remetente: "usuario",
      };
      setMensagens((prevMensagens) => [...prevMensagens, novaMensagemUsuario]);
    }

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800 mobile-container w-full">
      {/* Mobile Toggle ou Show Sidebar Button */}
      {!sidebarEnabled ? (
        <button
          onClick={() => setSidebarEnabled(true)}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg transition-colors"
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
        <div className="md:hidden">
          <MobileToggle
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
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
          className={`w-64 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white flex flex-col h-full transition-transform duration-300 md:static md:translate-x-0 mobile-sidebar border-r border-gray-200 dark:border-gray-600 ${
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

          {/* Lista de conversas anteriores */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto custom-scroll">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Conversas
            </div>
            <div className="space-y-1">
              {conversas.length === 0 ? (
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                  Suas conversas aparecerão aqui após enviar a primeira mensagem
                </div>
              ) : (
                conversas
                  .filter((conversa) =>
                    conversa.mensagens.some((m) => m.remetente === "usuario")
                  )
                  .map((conversa, index) => {
                    // Gerar título baseado na primeira mensagem do usuário
                    const primeiraMsg = conversa.mensagens.find(
                      (m) => m.remetente === "usuario"
                    );
                    const titulo = primeiraMsg
                      ? primeiraMsg.texto.substring(0, 30) +
                        (primeiraMsg.texto.length > 30 ? "..." : "")
                      : "Nova conversa";

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
                  })
              )}
            </div>
          </div>

          {/* Footer da Sidebar */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Powered by OpenAI
              </div>
              <button
                onClick={() => setSidebarEnabled(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
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
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dev Chef - Assistente de Receitas
            </h2>
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
